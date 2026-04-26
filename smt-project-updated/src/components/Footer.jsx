import React from 'react'
import './Footer.css'

const LINKS = {
  Services: ['Web Development','Mobile Apps','Cloud Solutions','AI & Automation','Cybersecurity'],
  Company:  ['About Us','Portfolio','Technology','Careers','Blog'],
  Contact:  ['Get a Quote','Support','Partnerships','Email Us'],
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* Brand */}
        <div className="ft-brand">
          <a href="#" className="ft-logo">
            <div className="ft-logo-mark">S</div>
            <span>Soft Master <em>Technology</em></span>
          </a>
          <p>
            Engineering world-class digital products for startups and enterprises.
            Headquartered in Vijayawada, building for the world.
          </p>
          <div className="ft-socials">
            {['in','tw','gh','yt'].map(s => (
              <a key={s} href="#" className="ft-soc" aria-label={s}>{s}</a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([heading, items]) => (
          <div className="ft-col" key={heading}>
            <h4>{heading}</h4>
            <ul>
              {items.map(item => (
                <li key={item}>
                  <a href={heading === 'Services' ? '#services' : heading === 'Company' ? '#about' : '#contact'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* Bottom bar */}
      <div className="ft-bottom">
        <p>© 2025 Soft Master Technology. All rights reserved.</p>
        <p className="ft-bottom-right">Made with ❤️ in Vijayawada, India</p>
      </div>
    </footer>
  )
}
