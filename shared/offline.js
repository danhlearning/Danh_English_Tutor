(async function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const ui = Object.fromEntries(['status','progress','counts','download','pause','verify','update','storage','package-size','install-state'].map(id => [id, $(id)]));
  const size = bytes => (bytes / 1024 / 1024).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + ' MB';
  let worker, registration, info, running = false, stopped = false;
  let saved = new Set();
  const standalone = navigator.standalone || matchMedia('(display-mode: standalone)').matches;
  ui['install-state'].textContent = standalone ? 'Bạn đang mở ứng dụng từ màn hình chính. Hãy tải kho học tại đây.' : 'Sau khi thêm vào màn hình chính, hãy mở biểu tượng ứng dụng để tải kho học tại đó.';
  function rpc(type, extra = {}, target = worker) {
    return new Promise((resolve, reject) => {
      const channel = new MessageChannel();
      const timer = setTimeout(() => {channel.port1.close(); reject(Error('TIMEOUT'));}, 65000);
      channel.port1.onmessage = event => {
        clearTimeout(timer); channel.port1.close();
        event.data.ok ? resolve(event.data.data) : reject(Error(event.data.error));
      };
      target.postMessage({type, ...extra}, [channel.port2]);
    });
  }
  function controls() {
    ui.download.disabled = running || !worker;
    ui.verify.disabled = running || !worker;
    ui.pause.hidden = !running;
    ui.update.disabled = running;
    ui.download.textContent = saved.size ? 'Tải tiếp / bổ sung' : 'Tải toàn bộ';
    if (saved.size === info?.files) ui.download.textContent = 'Bắt đầu học';
  }
  function render() {
    ui.progress.max = info.files; ui.progress.value = saved.size;
    ui.counts.textContent = `${saved.size.toLocaleString('vi-VN')} / ${info.files.toLocaleString('vi-VN')} tệp đã lưu`;
    controls();
  }
  async function refresh() {
    info = await rpc('STATUS'); saved = new Set(info.saved);
    ui['package-size'].textContent = `Toàn bộ lớp 1–12, kỹ năng và bài cũ: ${size(info.bytes)} · ${info.files.toLocaleString('vi-VN')} tệp.`;
    render();
    ui.status.textContent = saved.size === info.files ? 'Đã đủ kho học của phiên bản này. Bạn có thể học offline.' : saved.size ? 'Kho học chưa đủ. Bấm “Tải tiếp” để bổ sung phần còn thiếu.' : 'Sẵn sàng tải kho học. Nên dùng Wi-Fi và giữ ứng dụng mở.';
  }
  async function storage() {
    try {
      const estimate = await navigator.storage?.estimate?.();
      const persistent = await navigator.storage?.persisted?.();
      ui.storage.textContent = (estimate?.quota ? `Dung lượng web còn khoảng ${size(Math.max(0, estimate.quota - (estimate.usage || 0)))}. ` : '') +
        (persistent ? 'Thiết bị đã cho phép lưu bền vững.' : 'Thiết bị tự quản lý việc giữ bản tải; hãy sao lưu tiến độ định kỳ.');
    } catch { ui.storage.textContent = 'Hãy bảo đảm iPad còn đủ dung lượng trống cho kho học.'; }
  }
  function stop() {
    if (!running) return;
    stopped = true;
    ui.status.textContent = 'Đang tạm dừng, phần đã tải được giữ lại…';
    rpc('PAUSE').catch(() => {});
  }
  ui.pause.addEventListener('click', stop);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  window.addEventListener('offline', stop);
  window.addEventListener('pagehide', stop);
  async function run(verify = false) {
    if (running || !worker) return;
    running = true; stopped = false; controls();
    let failure;
    try {
      if (!verify && navigator.onLine === false) throw Error('OFFLINE');
      if (!verify) {
        try { await navigator.storage?.persist?.(); } catch { /* Best effort on iPad. */ }
      }
      await refresh();
      const indexes = Array.from({length: info.files}, (_, i) => i).filter(i => verify || !saved.has(i));
      let checked = 0;
      for (let offset = 0; offset < indexes.length && !stopped; offset += 4) {
        ui.status.textContent = verify ? 'Đang kiểm tra các tệp đã lưu…' : 'Đang tải kho học. Bạn có thể tạm dừng và tải tiếp.';
        const result = await rpc('BATCH', {indexes: indexes.slice(offset, offset + 4), verify});
        for (const index of result.saved) saved.add(index);
        for (const item of result.failed) saved.delete(item.index);
        checked += result.saved.length + result.failed.length;
        render();
        if (verify) ui.counts.textContent = `Đã kiểm tra ${checked.toLocaleString('vi-VN')} / ${info.files.toLocaleString('vi-VN')} tệp`;
        if (result.failed.length && !verify && !stopped) { failure = result.failed[0].code; break; }
      }
      await refresh();
      if (!stopped && !failure && saved.size === info.files) {
        await rpc('CLEANUP');
        ui.status.textContent = verify ? 'Kiểm tra xong: đủ bài học, hình và âm thanh. Sẵn sàng học offline.' : 'Đã tải đủ kho học! Bạn có thể bật chế độ máy bay và mở thử bài.';
      } else if (stopped) ui.status.textContent = 'Đã tạm dừng. Phần đã tải được giữ lại; bấm “Tải tiếp” khi sẵn sàng.';
      else if (verify) ui.status.textContent = 'Bản tải còn thiếu hoặc có tệp cần tải lại. Kết nối Wi-Fi và bấm “Tải tiếp”.';
      else if (failure) throw Error(failure);
    } catch (error) {
      const messages = {
        STORAGE_FULL: 'iPad chưa đủ chỗ trống. Giải phóng dung lượng rồi bấm “Tải tiếp”; phần đã tải vẫn được giữ.',
        FILE_CHANGED: 'Website vừa thay đổi. Kết nối mạng và bấm “Cập nhật ứng dụng” khi nút xuất hiện, rồi tải tiếp.',
        OFFLINE: 'Bạn đang mất mạng. Kết nối Wi-Fi rồi bấm “Tải tiếp”.',
        BUSY: 'Một cửa sổ khác đang tải. Hãy tiếp tục ở cửa sổ đó hoặc thử lại sau.'
      };
      ui.status.textContent = messages[error.message] || 'Tải hoặc kiểm tra bị gián đoạn. Phần đã lưu được giữ lại; hãy thử lại khi kết nối ổn định.';
    } finally { running = false; controls(); await storage(); }
  }
  ui.download.addEventListener('click', () => {
    if (saved.size === info?.files) location.href = new URL('index.html', window.DanhPWA.root).href;
    else run(false);
  });
  ui.verify.addEventListener('click', () => run(true));
  ui.update.addEventListener('click', async () => {
    if (running || !registration.waiting) return;
    ui.update.disabled = true;
    navigator.serviceWorker.addEventListener('controllerchange', () => location.reload(), {once: true});
    try { await rpc('ACTIVATE', {}, registration.waiting); }
    catch { ui.status.textContent = 'Chưa cập nhật được. Hãy mở lại trang khi có mạng.'; ui.update.disabled = false; }
  });
  try {
    if (!window.DanhPWA?.supported) throw Error('UNSUPPORTED');
    registration = await window.DanhPWA.ready;
    const ready = await Promise.race([navigator.serviceWorker.ready, new Promise((_, reject) => setTimeout(() => reject(Error('INSTALL')), 30000))]);
    worker = ready.active;
    function updates() {
      ui.update.hidden = !registration.waiting;
      if (registration.waiting) ui['install-state'].textContent += ' Có bản mới: bấm “Cập nhật ứng dụng”, sau đó bổ sung kho học trước khi dùng offline.';
    }
    updates(); registration.addEventListener('updatefound', () => registration.installing?.addEventListener('statechange', updates));
    await refresh(); await storage();
  } catch {
    ui.status.textContent = location.protocol === 'file:' ? 'Hãy mở website qua địa chỉ HTTPS trong Safari để cài và tải kho học.' : 'Chưa chuẩn bị được kho offline. Hãy mở website qua HTTPS, bật kết nối mạng và thử lại.';
    ui['package-size'].textContent = 'Cần mở website trong Safari hoặc ứng dụng đã thêm vào màn hình chính.';
  }
})();
