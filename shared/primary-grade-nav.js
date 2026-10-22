/* Chọn lớp tiểu học, không thay đổi dữ liệu học. */
(() => {
  if (customElements.get('primary-grade-nav')) return;
  customElements.define('primary-grade-nav', class extends HTMLElement {
    connectedCallback() {
      if (this.shadowRoot) return;
      const current = Number(this.getAttribute('grade'));
      const root = this.attachShadow({mode:'open'});
      root.innerHTML = `<style>
        :host{display:block;font-family:'Danh Nunito',Nunito,sans-serif;max-width:1180px;margin:0 auto;padding:12px 16px;box-sizing:border-box}
        nav{display:flex;align-items:center;gap:8px;flex-wrap:wrap}span{font-size:16px;font-weight:800;color:#365b4b;margin-right:6px}
        a{display:inline-flex;align-items:center;justify-content:center;min-height:44px;box-sizing:border-box;padding:8px 16px;border:2px solid #d6e5dc;border-radius:16px;background:#fff;color:#24513f;text-decoration:none;font-size:17px;font-weight:800}
        a:hover{background:#eef9f1}a[aria-current]{background:#216d55;border-color:#216d55;color:white}a:focus-visible{outline:3px solid #b46a17;outline-offset:3px}
      </style><nav aria-label="Chọn lớp tiểu học"><span>🌱 Chọn lớp</span>${[1,2,3,4,5].map(g=>`<a href="../lop${g}/lop${g}.html" ${g===current?'aria-current="page"':''}>Lớp ${g}</a>`).join('')}</nav>`;
    }
  });
})();
