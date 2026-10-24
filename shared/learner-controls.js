/* Nhãn loa gọn, giữ tên truy cập và phạm vi thao tác nghe chủ động. */
(() => {
  'use strict';
  let manual = false, reset;
  const speaker = /[🔊🔉🔈📢]/u;
  function prepare(button) {
    if(button.matches('.word-picture,[data-word-audio]'))return false;
    const text = button.textContent.trim();
    if (!speaker.test(text) && !/^Nghe(?: lại| mẫu| từ| câu mẫu| chậm)?$/u.test(text) && !button.matches('.btn-speaker,[data-speak],[data-unit4-say]')) return false;
    if (!button.hasAttribute('aria-label')) button.setAttribute('aria-label', text.replace(speaker,'').trim() || 'Nghe tiếng Anh');
    button.dataset.danhListen = 'true';
    if (text && text !== '🔊') {
      const svg = button.querySelector('svg');
      if (svg) button.replaceChildren(svg); else button.textContent = '🔊';
    }
    return true;
  }
  function tidy(root) {
    if (root.nodeType !== 1 && root.nodeType !== 9) return;
    if (root.matches?.('button')) prepare(root);
    root.querySelectorAll('button').forEach(prepare);
    root.querySelectorAll('.btn-study,.g6-cover-cta,.g4-unit-card > span,.g6-unit-card > span').forEach(node => {
      if (/^Vào học(?:\s*[→↗➔])?$/u.test(node.textContent.trim())) node.remove();
    });
    const cards='.g6-unit-card,.lesson-card,.g4-unit-card,.g6-quick-paths a,.vg-review-card,.shared-topic-card,.card,.topic-card a,.g6-hero-link,.g2-review-entry a';
    const targets=[...root.querySelectorAll(cards)];if(root.matches?.(cards))targets.unshift(root);
    targets.forEach(card => {
      const walker=document.createTreeWalker(card,NodeFilter.SHOW_TEXT);
      const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
      for(const node of nodes){const text=node.textContent.replace(/[→↗➔➜]/gu,'');if(text!==node.textContent)node.textContent=text;}
    });
  }
  window.DanhListenControls = {isManualRequest: () => manual};
  document.addEventListener('click', event => {
    const button = event.target.closest?.('button');
    if (!button || button.disabled || !prepare(button)) return;
    manual = true;
    clearTimeout(reset);reset = setTimeout(() => {manual = false;},0);
  },true);
  const start = () => {
    tidy(document);
    new MutationObserver(records => {
      for (const record of records) for (const node of record.addedNodes) {
        if (node.nodeType === 1) tidy(node);
        else if (node.parentElement?.matches('button')) prepare(node.parentElement);
      }
    }).observe(document.body,{childList:true,subtree:true});
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
})();
