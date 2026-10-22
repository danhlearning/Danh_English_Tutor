/* One contact footer for the home page and every topic page. */
(() => {
  const fonts = new URL('./learner-font.css', document.currentScript.src).href;
  if (![...document.querySelectorAll('link[rel="stylesheet"]')].some(link => link.href === fonts)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = fonts;
    document.head.append(link);
  }
  if (customElements.get('contact-danh')) return;

  class ContactDanh extends HTMLElement {
    connectedCallback() {
      if (this.shadowRoot) return;
      this.attachShadow({ mode: 'open' }).innerHTML = `
        <style>
          :host {
            display: block;
            width: 100%;
            min-width: 0;
            grid-column: 1 / -1;
            flex-shrink: 0;
            font-family: "Danh Nunito", Nunito, system-ui, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: var(--danh-contact-color, #1e293b);
          }
          * { box-sizing: border-box; }
          .contact-section {
            text-align: center;
            padding: 32px 20px;
            background: var(--danh-contact-background, white);
            margin-top: 30px;
            border-top: 1px solid var(--danh-contact-border, #e2e8f0);
          }
          .contact-inner { width: min(100%, 640px); margin-inline: auto; }
          h2 { margin: 0 0 20px; font-size: 24px; line-height: 1.35; font-weight: 800; }
          .social-buttons {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 240px));
            justify-content: center;
            gap: 12px;
          }
          .btn-social {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 48px;
            min-width: 0;
            gap: 8px;
            padding: 8px 18px;
            border-radius: var(--danh-contact-button-radius, 30px);
            background: var(--danh-contact-button-background, white);
            font-size: 16px;
            font-weight: 700;
            text-decoration: none;
            transition: background-color .2s ease, color .2s ease, box-shadow .2s ease;
          }
          .btn-social:focus-visible { outline: 3px solid var(--danh-contact-button-color, #2563eb); outline-offset: 4px; }
          .btn-zalo { color: var(--danh-contact-button-color, #0068ff); border: 1.5px solid var(--danh-contact-button-border, #0068ff); }
          .btn-zalo:hover { color: white; background: var(--danh-contact-button-color, #0068ff); box-shadow: 0 4px 10px var(--danh-contact-button-shadow, #0068ff40); }
          .zalo-logo { width: 20px; height: 20px; border-radius: 4px; }
          .btn-fb { color: var(--danh-contact-button-color, #1877f2); border: 1.5px solid var(--danh-contact-button-border, #1877f2); }
          .btn-fb:hover { color: white; background: var(--danh-contact-button-color, #1877f2); box-shadow: 0 4px 10px var(--danh-contact-button-shadow, #1877f240); }
          .fb-icon { width: 18px; height: 18px; fill: currentColor; }
          svg { flex-shrink: 0; }
          footer {
            text-align: center;
            padding: 18px 20px;
            background: var(--danh-footer-background, #1e293b);
            color: var(--danh-footer-color, white);
            font-size: 16px;
            line-height: 1.65;
            font-weight: 600;
          }
          footer p { max-width: 640px; margin: 0 auto; text-wrap: balance; }
          footer span { display: inline-block; }
          @media (max-width: 520px) {
            .social-buttons { grid-template-columns: minmax(0, 280px); }
          }
          @media (prefers-reduced-motion: reduce) {
            .btn-social { transition: none; }
          }
        </style>
        <section class="contact-section" aria-labelledby="contact-title">
          <div class="contact-inner">
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
          </div>
        </section>
        <footer><p><span>Học tiếng Anh cùng thầy Danh.</span> <span>Mã nguồn mở, học miễn phí.</span></p></footer>
      `;
    }
  }

  customElements.define('contact-danh', ContactDanh);
})();
