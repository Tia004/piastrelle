'use client'

export default function Footer({ dict, lang }) {
  return (
    <footer className="footer site-container" id="contact">
      {/* Giant background logo */}
      <div className="footer-logo" aria-hidden="true">
        Lumina<br />Ceramiche
      </div>

      {/* Footer grid */}
      <div className="footer-grid">
        <div>
          <div className="footer-col-title">B2B</div>
          <a href="#" className="footer-link">{dict.footer.b2b_area}</a>
          <a href="#" className="footer-link">{dict.footer.private_clients}</a>
          <a href="#" className="footer-link">ing.davide.moretti@gmail.com</a>
        </div>
        <div>
          <div className="footer-col-title">Risorse</div>
          <a href="#" className="footer-link">{dict.footer.bim_library}</a>
          <a href="#" className="footer-link">{dict.footer.epd_docs}</a>
        </div>
        <div>
          <div className="footer-col-title">Legal</div>
          <a href="#" className="footer-link">{dict.footer.env_policy}</a>
          <a href="#" className="footer-link">{dict.footer.terms}</a>
        </div>
        <div>
          <div className="footer-col-title">Social</div>
          <a href="#" className="footer-link">Instagram</a>
          <a href="#" className="footer-link">LinkedIn</a>
          <a href="#" className="footer-link">Pinterest</a>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <span className="footer-copyright">{dict.footer.copyright}</span>
        <span className="footer-copyright">{dict.footer.certification}</span>
      </div>
    </footer>
  )
}
