import { footerGroups } from "@/app/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" aria-label="NEPS home">
              NEPS <span aria-hidden="true">✳</span>
            </a>
            <p>Navigating Educational Pressures and Stressors</p>
            <p>Ghana · Sierra Leone · Tanzania</p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.label}>
              <h2>{group.label}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <div>
            <p>Funder acknowledgement and approved wording to be confirmed.</p>
            <p>
              Institutional disclaimer to be confirmed. This website describes research and is not a
              clinical service.
            </p>
          </div>
          <div>
            <a href="/contact/">Get in touch</a>
            <p>Social channels: to be confirmed</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
