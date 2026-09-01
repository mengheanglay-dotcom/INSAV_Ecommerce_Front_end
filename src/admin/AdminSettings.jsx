export default function AdminSettings() {
  return (
    <section className="admin-content">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">CONFIGURATION</span>
          <h1>Settings</h1>
          <p>
            Security and store configuration for your development environment.
          </p>
        </div>
      </div>
      <div className="settings-grid">
        <div className="admin-panel">
          <span className="eyebrow">SECURITY</span>
          <h3>Browser protections</h3>
          <div className="setting-row">
            <div>
              <strong>CSRF tokens</strong>
              <span>Required on state-changing API requests.</span>
            </div>
            <b>ON</b>
          </div>
          <div className="setting-row">
            <div>
              <strong>Secure session cookies</strong>
              <span>HttpOnly + SameSite; Secure enabled in production.</span>
            </div>
            <b>ON</b>
          </div>
          <div className="setting-row">
            <div>
              <strong>CSP</strong>
              <span>
                Frontend policy is documented; Laravel sends security headers.
              </span>
            </div>
            <b>ON</b>
          </div>
        </div>
        <div className="admin-panel">
          <span className="eyebrow">STORE</span>
          <h3>Current integration</h3>
          <div className="setting-row">
            <div>
              <strong>Catalog source</strong>
              <span>Fake Store API via Laravel service.</span>
            </div>
            <b>API</b>
          </div>
          <div className="setting-row">
            <div>
              <strong>Frontend</strong>
              <span>React + Vite.</span>
            </div>
            <b>REACT</b>
          </div>
          <div className="setting-row">
            <div>
              <strong>Backend</strong>
              <span>Laravel REST API.</span>
            </div>
            <b>PHP</b>
          </div>
        </div>
      </div>
    </section>
  );
}
