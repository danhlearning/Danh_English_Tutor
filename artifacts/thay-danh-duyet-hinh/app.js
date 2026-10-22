(() => {
  'use strict';
  const catalog = window.thayDanhCatalog;
  const candidates = window.thayDanhCandidates;
  const rollout = window.thayDanhRollout || {};
  const storageKey = 'thay-danh-duyet-hinh:v1';
  const byId = new Map(catalog.words.map(word => [word.id, word]));
  const groups = new Map(catalog.groups.map(group => [group.id, group]));
  const state = { group: 'all', filter: 'photo', search: '', limit: 36, activeId: null, selectedCandidate: null, decisions: {} };
  const el = id => document.getElementById(id);
  const normalize = text => String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const validDecision = (id, value) => {
    if (!byId.has(id) || !value || !['approved', 'revision'].includes(value.status)) return false;
    if (value.status === 'approved' && !(candidates[id] || []).some(candidate => candidate.id === value.candidateId)) return false;
    return true;
  };
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (saved && typeof saved === 'object') {
      for (const [id, value] of Object.entries(saved)) if (validDecision(id, value)) state.decisions[id] = value;
    }
  } catch (error) { /* The artifact still works without browser storage. */ }
  const photoArt = word => (candidates[word.id] || []).find(art => art.kind === 'photo');
  const countCandidates = () => catalog.words.filter(word => photoArt(word)).length;
  const statusOf = word => {
    const decision = state.decisions[word.id];
    if (state.filter === 'photo' && photoArt(word)) {
      if (decision?.status === 'revision' && decision.candidateId === photoArt(word).id) return 'revision';
      if (rollout[word.id] === photoArt(word).id) return 'published';
      if (decision?.candidateId === photoArt(word).id) return decision.status;
      return 'candidate';
    }
    if (decision?.status === 'revision') return 'revision';
    if (rollout[word.id] && (!decision || decision.candidateId === rollout[word.id])) return 'published';
    return decision?.status || ((candidates[word.id] || []).length ? 'candidate' : 'pending');
  };
  const statusLabel = status => ({ approved: 'Đã duyệt', published: 'Đã lên web', revision: 'Cần sửa', candidate: 'Chờ duyệt', pending: 'Chờ vẽ' })[status];
  const groupLabel = group => group.kind === 'Global Success' ? `Global Success · ${group.title}` : group.title;
  function renderGroups() {
    const nav = el('groupNav');
    nav.replaceChildren();
    const mobile = el('mobileGroup');
    mobile.replaceChildren();
    const addOption = (id, label) => { const option = document.createElement('option'); option.value = id; option.textContent = label; mobile.append(option); };
    function button(id, label, count) {
      const item = document.createElement('button'); item.type = 'button'; item.className = state.group === id ? 'active' : '';
      const name = document.createElement('span'); name.textContent = label;
      const num = document.createElement('span'); num.className = 'count'; num.textContent = count;
      item.append(name, num);
      item.addEventListener('click', () => setGroup(id));
      nav.append(item);
      addOption(id, label);
    }
    button('all', 'Tất cả từ vựng', `${countCandidates()}/${catalog.words.length}`);
    let lastKind = '';
    for (const group of catalog.groups) {
      if (group.kind !== lastKind) { const heading = document.createElement('div'); heading.className = 'nav-divider'; heading.textContent = group.kind.toUpperCase(); nav.append(heading); lastKind = group.kind; }
      const ready = catalog.words.filter(word => word.group === group.id && photoArt(word)).length;
      button(group.id, group.title, `${ready}/${group.count}`);
    }
    el('groupCount').textContent = `${countCandidates()}/${catalog.words.length}`;
    mobile.value = state.group;
  }
  function setGroup(group) { state.group = group; state.limit = 36; renderGroups(); renderCards(); }
  function visualNode(visual, className) {
    const box = document.createElement('div'); box.className = className;
    if (!visual || visual.value === '—') { box.classList.add('no-art'); const span = document.createElement('span'); span.textContent = 'Chưa có hình'; box.append(span); return box; }
    if (visual.type === 'image') { const img = document.createElement('img'); img.src = visual.value; img.alt = ''; img.loading = 'lazy'; box.append(img); }
    else if (visual.type === 'svg') box.innerHTML = visual.value;
    else { const span = document.createElement('span'); span.className = 'text-art'; span.textContent = visual.value; box.append(span); }
    return box;
  }
  function filteredWords() {
    return catalog.words.filter(word => {
      if (state.group !== 'all' && word.group !== state.group) return false;
      const hasCandidate = (candidates[word.id] || []).length > 0;
      const decision = state.decisions[word.id]?.status;
      if (state.filter === 'photo' && !photoArt(word)) return false;
      if (state.filter === 'candidates' && !hasCandidate) return false;
      if (state.filter === 'approved' && decision !== 'approved' && statusOf(word) !== 'published') return false;
      if (state.filter === 'revision' && decision !== 'revision') return false;
      if (state.filter === 'pending' && (hasCandidate || decision)) return false;
      if (state.search && !normalize(`${word.name} ${word.meaning} ${groups.get(word.group).title}`).includes(normalize(state.search))) return false;
      return true;
    });
  }
  function renderStats() {
    el('totalCount').textContent = catalog.words.length;
    el('candidateCount').textContent = countCandidates();
    const photoDecisions = Object.entries(state.decisions).filter(([id, value]) =>
      (candidates[id] || []).some(art => art.kind === 'photo' && art.id === value.candidateId));
    el('approvedCount').textContent = catalog.words.filter(word => {
      const photo = photoArt(word);
      return photo && (rollout[word.id] === photo.id || (state.decisions[word.id]?.status === 'approved' && state.decisions[word.id]?.candidateId === photo.id));
    }).length;
    el('revisionCount').textContent = photoDecisions.filter(([, value]) => value.status === 'revision').length;
  }
  function renderCards() {
    renderStats();
    const list = filteredWords();
    el('resultLine').textContent = `Hiển thị ${Math.min(state.limit, list.length)} / ${list.length} từ${state.group === 'all' ? '' : ' · ' + groups.get(state.group).title}`;
    const container = el('cards'); container.replaceChildren();
    if (!list.length) {
      const empty = document.createElement('div'); empty.className = 'empty';
      const title = document.createElement('strong'); title.textContent = 'Chưa có từ nào ở mục này.';
      const copy = document.createElement('span'); copy.textContent = ['candidates', 'photo'].includes(state.filter) ? 'Nhóm này chưa có ảnh ứng viên. Hãy chọn nhóm khác hoặc xem tất cả từ vựng.' : 'Thử đổi bộ lọc hoặc từ khóa tìm kiếm.';
      empty.append(title, copy); container.append(empty);
    }
    for (const word of list.slice(0, state.limit)) {
      const art = photoArt(word) || candidates[word.id]?.[0];
      const card = document.createElement('button'); card.type = 'button'; card.className = 'card'; card.setAttribute('aria-label', `Xem hình ${word.name}, ${word.meaning}`);
      card.append(visualNode(art ? { type: 'image', value: art.src } : word.current, 'card-image'));
      const content = document.createElement('div'); content.className = 'card-content';
      const row = document.createElement('div'); row.className = 'card-row';
      const title = document.createElement('h4'); title.textContent = word.name;
      const status = statusOf(word); const badge = document.createElement('span'); badge.className = `badge ${status}`; badge.textContent = statusLabel(status);
      row.append(title, badge);
      const meaning = document.createElement('p'); meaning.textContent = word.meaning;
      const bottom = document.createElement('div'); bottom.className = 'card-bottom';
      const topic = document.createElement('span'); topic.textContent = groups.get(word.group).title;
      const action = document.createElement('b'); action.textContent = status === 'published' ? 'Xem ảnh →' : art ? 'Xem & duyệt →' : 'Xem từ →';
      bottom.append(topic, action); content.append(row, meaning, bottom); card.append(content);
      card.addEventListener('click', () => openReview(word.id)); container.append(card);
    }
    el('loadMore').hidden = list.length <= state.limit;
  }
  function selectedArt() { return (candidates[state.activeId] || []).find(art => art.id === state.selectedCandidate); }
  function showCandidate() {
    const box = el('candidateVisual'); box.replaceChildren();
    const art = selectedArt();
    if (art) { const img = document.createElement('img'); img.src = art.src; img.alt = `${byId.get(state.activeId).name}: ${art.note}`; box.append(img); }
    else { const note = document.createElement('span'); note.className = 'none'; note.textContent = 'Chưa có tranh mới cho từ này. Bạn có thể để lại yêu cầu vẽ.'; box.append(note); }
    el('approveButton').disabled = !art;
  }
  function updateReviewStatus() {
    const saved = state.decisions[state.activeId];
    const selectedSaved = saved?.candidateId === state.selectedCandidate;
    const choice = selectedSaved ? `Ảnh đang chọn: ${statusLabel(saved.status)}.` : 'Ảnh đang chọn: Chờ duyệt.';
    const published = rollout[state.activeId] ? ` Bản ${rollout[state.activeId]} đã được đưa vào website.` : '';
    el('saveMessage').textContent = choice + published;
    el('clearButton').hidden = !selectedSaved;
  }
  function openReview(id) {
    const word = byId.get(id); if (!word) return;
    state.activeId = id;
    const entries = candidates[id] || [];
    const saved = state.decisions[id];
    state.selectedCandidate = state.filter === 'photo' && photoArt(word)
      ? photoArt(word).id
      : entries.some(art => art.id === saved?.candidateId) ? saved.candidateId : entries[0]?.id || null;
    el('dialogGroup').textContent = groupLabel(groups.get(word.group));
    el('reviewTitle').textContent = word.name;
    el('reviewMeaning').textContent = `${word.meaning}${word.ipa ? ' · ' + word.ipa : ''}`;
    el('currentVisual').replaceChildren(visualNode(word.current, 'large-visual-inner'));
    el('reviewNote').value = saved?.candidateId === state.selectedCandidate ? saved.note || '' : '';
    updateReviewStatus();
    const choices = el('candidateChoices'); choices.replaceChildren();
    if (entries.length) for (const art of entries) {
      const label = document.createElement('label'); const radio = document.createElement('input'); radio.type = 'radio'; radio.name = 'candidate'; radio.value = art.id; radio.checked = art.id === state.selectedCandidate;
      radio.addEventListener('change', () => { state.selectedCandidate = art.id; el('reviewNote').value = saved?.candidateId === art.id ? saved.note || '' : ''; showCandidate(); updateReviewStatus(); });
      const text = document.createElement('span'); text.textContent = `${art.label} · ${art.note}`;
      label.append(radio, text); choices.append(label);
    }
    else { const p = document.createElement('p'); p.textContent = 'Chưa có ứng viên. Hãy ghi ý tưởng trong ô nhận xét.'; choices.append(p); }
    showCandidate(); el('reviewDialog').showModal();
  }
  function saveDecision(status) {
    const id = state.activeId; if (!id || (status === 'approved' && !selectedArt())) return;
    state.decisions[id] = { status, candidateId: selectedArt()?.id || null, note: el('reviewNote').value.trim().slice(0, 2000), updatedAt: new Date().toISOString() };
    try { localStorage.setItem(storageKey, JSON.stringify(state.decisions)); el('saveMessage').textContent = `Đã lưu: ${statusLabel(status)}. Dùng “Xuất bản duyệt” để giữ một bản sao.`; }
    catch (error) { el('saveMessage').textContent = 'Trình duyệt không lưu được. Hãy xuất bản duyệt ngay.'; }
    el('clearButton').hidden = false;
    renderCards();
  }
  function clearDecision() {
    if (!state.activeId || !state.decisions[state.activeId]) return;
    delete state.decisions[state.activeId];
    try { localStorage.setItem(storageKey, JSON.stringify(state.decisions)); } catch (error) { /* Browser storage may be unavailable. */ }
    el('clearButton').hidden = true;
    el('saveMessage').textContent = 'Đã bỏ lựa chọn trên trang duyệt.' + (rollout[state.activeId] ? ' Bản đã đưa vào website vẫn đang được sử dụng.' : '');
    renderCards();
  }
  function exportDecisions() {
    const payload = { artifact: 'Thầy Danh duyệt hình', version: 1, exportedAt: new Date().toISOString(), catalogSize: catalog.words.length, decisions: state.decisions };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = `thay-danh-duyet-hinh-${new Date().toISOString().slice(0, 10)}.json`; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function importDecisions(file) {
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (data.artifact !== 'Thầy Danh duyệt hình' || data.version !== 1 || !data.decisions || typeof data.decisions !== 'object') throw new Error('Đây chưa phải bản duyệt hợp lệ.');
      const incoming = Object.entries(data.decisions).filter(([id, decision]) => validDecision(id, decision));
      if (!incoming.length) throw new Error('Tệp không có quyết định hợp lệ cho danh mục hiện tại.');
      if (!confirm(`Nhập ${incoming.length} lựa chọn? Những từ trùng sẽ dùng dữ liệu trong tệp.`)) return;
      for (const [id, value] of incoming) state.decisions[id] = value;
      localStorage.setItem(storageKey, JSON.stringify(state.decisions)); renderCards(); alert(`Đã nhập ${incoming.length} lựa chọn.`);
    } catch (error) { alert(error.message || 'Không đọc được tệp bản duyệt.'); }
    finally { el('importFile').value = ''; }
  }
  el('searchInput').addEventListener('input', event => { state.search = event.target.value; state.limit = 36; renderCards(); });
  el('statusFilter').addEventListener('change', event => { state.filter = event.target.value; state.limit = 36; renderCards(); });
  el('mobileGroup').addEventListener('change', event => setGroup(event.target.value));
  el('loadMore').addEventListener('click', () => { state.limit += 36; renderCards(); });
  el('closeDialog').addEventListener('click', () => el('reviewDialog').close());
  el('reviewDialog').addEventListener('click', event => { if (event.target === el('reviewDialog')) el('reviewDialog').close(); });
  el('approveButton').addEventListener('click', () => saveDecision('approved'));
  el('clearButton').addEventListener('click', clearDecision);
  el('revisionButton').addEventListener('click', () => saveDecision('revision'));
  el('exportButton').addEventListener('click', exportDecisions);
  el('importButton').addEventListener('click', () => el('importFile').click());
  el('importFile').addEventListener('change', event => importDecisions(event.target.files[0]));
  renderGroups(); renderCards();
})();
