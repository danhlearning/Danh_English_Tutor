/* Present exercise placeholders as one solid line without changing their text/data. */
(() => {
  'use strict';
  if (window.DanhExerciseGaps) return;
  const marker = /_{2,}|(?<![\p{L}\p{N}/:._-])-{3,}(?![\p{L}\p{N}/:._-])/gu;
  const ignored = 'script,style,noscript,template,pre,code,kbd,samp,textarea,input,select,option,svg,math,[contenteditable]:not([contenteditable="false"]),.danh-exercise-gap';
  const protectedURL = (text, offset) => [...text.matchAll(/(?:https?:\/\/|www\.)\S+/g)].some(m => offset >= m.index && offset < m.index + m[0].length);
  function formatText(node) {
    const parent = node.parentElement;
    if (!parent || parent.closest(ignored)) return;
    const text = node.nodeValue;
    if (!text || (!text.includes('__') && !text.includes('---'))) return;
    marker.lastIndex = 0;
    const matches = [...text.matchAll(marker)].filter(m => !protectedURL(text, m.index));
    if (!matches.length) return;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    for (const match of matches) {
      fragment.append(document.createTextNode(text.slice(cursor, match.index)));
      const gap = document.createElement('span');
      gap.className = 'danh-exercise-gap';
      gap.setAttribute('role', 'img');
      gap.setAttribute('aria-label', 'chỗ trống');
      gap.style.setProperty('--danh-gap-width', `${Math.min(8, Math.max(3, match[0].length * .6))}em`);
      const source = document.createElement('span');
      source.className = 'danh-exercise-gap-source';
      source.setAttribute('aria-hidden', 'true');
      source.textContent = match[0];
      gap.append(source);fragment.append(gap);
      cursor = match.index + match[0].length;
    }
    fragment.append(document.createTextNode(text.slice(cursor)));
    node.replaceWith(fragment);
  }
  function format(root) {
    if (root.nodeType === Node.TEXT_NODE) { formatText(root); return; }
    if (![Node.ELEMENT_NODE, Node.DOCUMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE].includes(root.nodeType)) return;
    if (root.nodeType === Node.ELEMENT_NODE && root.closest(ignored)) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const texts = [];
    while (walker.nextNode()) texts.push(walker.currentNode);
    texts.forEach(formatText);
  }
  const observer = new MutationObserver(records => {
    const roots = new Set();
    for (const record of records) {
      if (record.type === 'characterData') roots.add(record.target);
      else for (const node of record.addedNodes) roots.add(node);
    }
    for (const node of roots) {
      if (!node.isConnected) continue;
      let parent=node.parentNode, nested=false;
      while(parent){if(roots.has(parent)){nested=true;break;}parent=parent.parentNode;}
      if(!nested)format(node);
    }
  });
  observer.observe(document.documentElement, {subtree:true, childList:true, characterData:true});
  window.DanhExerciseGaps = Object.freeze({format});
  format(document.documentElement);
})();
