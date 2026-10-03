/* One contact footer for the home page and every topic page. */
(() => {
  if (customElements.get('contact-danh')) return;

  class ContactDanh extends HTMLElement {
    connectedCallback() {
      if (this.shadowRoot) return;
      const year = new Date().getFullYear();
      this.attachShadow({ mode: 'open' }).innerHTML = `
        <style>
          :host {
            display: block;
            width: 100%;
            flex-shrink: 0;
            font-family: Nunito, sans-serif;
            line-height: 1.5;
            color: #1e293b;
          }
          * { box-sizing: border-box; }
          .contact-section {
            text-align: center;
            padding: 30px 15px;
            background: white;
            margin-top: 30px;
            border-top: 1px solid #e2e8f0;
          }
          h2 { margin: 0 0 18px; font-size: 1.5rem; font-weight: 800; }
          .social-buttons {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 12px;
          }
          .btn-social {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 18px;
            border-radius: 30px;
            background: white;
            font-size: .95rem;
            font-weight: 700;
            text-decoration: none;
            transition: background-color .2s ease, color .2s ease, box-shadow .2s ease;
          }
          .btn-social:focus-visible { outline: 3px solid #2563eb; outline-offset: 4px; }
          .btn-zalo { color: #0068ff; border: 1.5px solid #0068ff; }
          .btn-zalo:hover { color: white; background: #0068ff; box-shadow: 0 4px 10px #0068ff40; }
          .zalo-logo { width: 20px; height: 20px; border-radius: 4px; }
          .btn-fb { color: #1877f2; border: 1.5px solid #1877f2; }
          .btn-fb:hover { color: white; background: #1877f2; box-shadow: 0 4px 10px #1877f240; }
          .fb-icon { width: 18px; height: 18px; fill: currentColor; }
          footer {
            text-align: center;
            padding: 15px;
            background: #1e293b;
            color: white;
            font-size: .85rem;
            font-weight: 600;
          }
          footer p { margin: 0; }
          @media (max-width: 380px) {
            h2 { font-size: 1.3rem; }
            .btn-social { justify-content: center; width: min(100%, 240px); }
          }
        </style>
        <section class="contact-section" aria-labelledby="contact-title">
          <h2 id="contact-title">Kết nối với thầy Danh</h2>
          <div class="social-buttons">
            <a class="btn-social btn-zalo" href="https://zalo.me/0911594794" target="_blank" rel="noopener noreferrer">
              <svg class="zalo-logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M4 3h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H9l-5 3v-3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path fill="white" d="M7 7h10v2l-7 6h7v2H7v-2l7-6H7z"/></svg>
              Zalo: 0911594794
            </a>
            <a class="btn-social btn-fb" href="https://www.facebook.com/cong.danh.0210" target="_blank" rel="noopener noreferrer">
              <svg class="fb-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
              Facebook
            </a>
          </div>
        </section>
        <footer><p>&copy; ${year} Học tiếng Anh cùng thầy Danh. All rights reserved.</p></footer>
      `;
    }
  }

  customElements.define('contact-danh', ContactDanh);
})();
