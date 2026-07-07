'use client'

export default function Footer({ dict, lang }) {
  return (
    <footer className="footer-wrap" id="contact">
      <div className="footer-inner">
        {/* Giant display brand logo */}
        <div className="footer-logo-row">
          <div className="footer-logo-text">
            Lumina<br />Ceramiche
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="footer-nav-col">
          <div>
            <a className="footer-nav-link" href="#">{dict.footer.b2b_area}</a>
            <a className="footer-nav-link" href="#">{dict.footer.private_clients}</a>
            <a className="footer-nav-link" href="mailto:ing.davide.moretti@gmail.com">ing.davide.moretti@gmail.com</a>
          </div>
          <div>
            <a className="footer-nav-link" href="#">{dict.footer.bim_library}</a>
            <a className="footer-nav-link" href="#">{dict.footer.epd_docs}</a>
          </div>
          <div>
            <a className="footer-nav-link" href="#">{dict.footer.env_policy}</a>
            <a className="footer-nav-link" href="#">{dict.footer.terms}</a>
          </div>
        </div>

        {/* Technical copyright block */}
        <div className="footer-info-col">
          <p>
            {dict.footer.copyright}<br />
            {dict.footer.certification}
          </p>
        </div>
      </div>
    </footer>
  )
}
