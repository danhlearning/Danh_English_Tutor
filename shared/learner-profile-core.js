(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.DanhLearnerCore = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const INFO = 'danh-learner-info:', DATA = 'danh-learner-data:', META = 'danh-learners-meta-v1';
  const avatars = ['🐱', '🐰', '🐼', '🦊', '🐸', '🐧', '🦁', '🌻'];
  const parse = (s, fallback = null) => { try { return JSON.parse(s) ?? fallback; } catch { return fallback; } };
  const validKey = key => typeof key === 'string' && /^(danh[-:.]|[crl]_(words|list)_g$)/.test(key) && !key.startsWith('danh-learner') && key.length < 200;
  function keys(storage) { const result = []; for (let i = 0; i < storage.length; i++) { const k = storage.key(i); if (k !== null) result.push(k); } return result; }
  function name(value) { const n = String(value || '').normalize('NFC').replace(/\s+/g, ' ').trim(); if (!n || [...n].length > 40 || /[\x00-\x1f\x7f]/.test(n)) throw Error('Em hãy nhập tên từ 1 đến 40 ký tự nhé.'); return n; }
  function createStore(raw, idFactory) {
    const id = idFactory || (() => globalThis.crypto?.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2));
    function get(profileId) { const p = parse(raw.getItem(INFO + profileId)); return p && p.id === profileId && typeof p.name === 'string' && avatars.includes(p.avatar) ? p : null; }
    function list() { return keys(raw).filter(k => k.startsWith(INFO)).map(k => get(k.slice(INFO.length))).filter(Boolean).sort((a,b) => a.created - b.created); }
    function scope(profileId, onError = () => {}, owner = '') {
      const prefix = DATA + profileId + ':';
      let locked = false;
      const read = new Map();
      const marker = k => 'danh-learner-write:' + profileId + ':' + k;
      function mark(k) { if(owner)raw.setItem(marker(k),owner); }
      function write(action) { if (locked || !get(profileId)) { onError('unavailable'); return; } try { action(); } catch (error) { onError('quota'); throw error; } }
      return {
        prefix, read, writer(k) { return raw.getItem(marker(k)); }, lock() { locked = true; },
        get length() { return keys(raw).filter(k => k.startsWith(prefix)).length; },
        key(i) { return keys(raw).filter(k => k.startsWith(prefix))[i]?.slice(prefix.length) ?? null; },
        getItem(k) { const v=get(profileId) ? raw.getItem(prefix + k) : null; read.set(String(k),v);return v; },
        setItem(k,v) { if (!validKey(String(k))) throw Error('Unsupported learning key'); write(() => {mark(k);raw.setItem(prefix + k, String(v));read.set(String(k),String(v));}); },
        removeItem(k) { write(() => {mark(k);raw.removeItem(prefix + k);read.set(String(k),null);}); },
        clear() { write(() => keys(raw).filter(k => k.startsWith(prefix)).forEach(k => {mark(k.slice(prefix.length));raw.removeItem(k);read.set(k.slice(prefix.length),null);})); }
      };
    }
    function legacy() {
      const data = Object.create(null);
      keys(raw).filter(validKey).forEach(k => { data[k] = raw.getItem(k); });
      const old = parse(raw.getItem('f_users'), {}), logged = raw.getItem('f_logged');
      if (logged && old[logged]) {
        for (const [from,to] of [['customWords','c_words_g'],['reviewList','r_list_g'],['learnedList','l_list_g']]) {
          if (Array.isArray(old[logged][from])) data[to] = JSON.stringify(old[logged][from]);
        }
      }
      return data;
    }
    function create(value, avatar = avatars[0], migrate = false, imported = null) {
      const profile = {version:1, id:id(), name:name(value), avatar:avatars.includes(avatar) ? avatar : avatars[0], created:Date.now()};
      const prefix = DATA + profile.id + ':';
      const migrated = migrate && !parse(raw.getItem(META), {}).migrationDone;
      const data = imported || (migrated ? legacy() : {});
      try {
        for (const [k,v] of Object.entries(data)) { if (!validKey(k) || typeof v !== 'string') throw Error('Dữ liệu học không hợp lệ.'); raw.setItem(prefix+k, v); }
        raw.setItem(INFO + profile.id, JSON.stringify(profile));
        if (!list().some(p => p.id !== profile.id)) raw.setItem(META, JSON.stringify({...parse(raw.getItem(META), {}), migrationDone:true}));
      } catch (error) {
        keys(raw).filter(k => k.startsWith(prefix)).forEach(k => raw.removeItem(k)); raw.removeItem(INFO+profile.id); throw error;
      }
      return profile;
    }
    function rename(profileId, value, avatar) { const p = get(profileId); if (!p) throw Error('Hồ sơ không còn trên máy này.'); p.name = name(value); if (avatars.includes(avatar)) p.avatar = avatar; raw.setItem(INFO+profileId, JSON.stringify(p)); return p; }
    function remove(profileId) { raw.removeItem(INFO+profileId); const prefix = DATA+profileId+':', writer='danh-learner-write:'+profileId+':'; keys(raw).filter(k => k.startsWith(prefix) || k.startsWith(writer)).forEach(k => raw.removeItem(k)); }
    function recommend() { return get(parse(raw.getItem(META), {}).lastId) || list()[0] || null; }
    function remember(profileId) { raw.setItem(META, JSON.stringify({...parse(raw.getItem(META), {}), lastId:profileId})); }
    function backup(profileId) { const p = get(profileId); if (!p) throw Error('Hồ sơ không còn trên máy này.'); const s = scope(profileId), data = {}; for (let i=0; i<s.length; i++) { const k=s.key(i); if (validKey(k)) data[k]=s.getItem(k); } return {format:'danh-learner-backup',version:1,exportedAt:new Date().toISOString(),learner:{name:p.name,avatar:p.avatar},data}; }
    function restore(text) { if (typeof text !== 'string' || text.length>5000000) throw Error('Tệp sao lưu quá lớn.'); const b=parse(text); if (b?.format!=='danh-learner-backup' || b.version!==1 || !b.data || typeof b.data !== 'object' || Array.isArray(b.data)) throw Error('Hãy chọn tệp sao lưu hồ sơ của Danh English Tutor.'); const entries=Object.entries(b.data); if (entries.length>1000 || entries.some(([k,v])=>!validKey(k)||typeof v!=='string')) throw Error('Tệp chứa dữ liệu học không hợp lệ.'); return create(b.learner?.name, b.learner?.avatar, false, b.data); }
    return {get,list,scope,legacy,create,rename,remove,recommend,remember,backup,restore};
  }
  return {createStore,avatars,parse,name,validKey,INFO,DATA,META};
});
