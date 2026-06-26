// ============================================================
//  app.js – Shared utilities: toast, auth guard, admin name (API backed)
// ============================================================

function showToast(msg, duration = 2800) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), duration);
}

// Set admin name in sidebar / topbar & perform backend authentication check
window.addEventListener('DOMContentLoaded', async () => {
  const adminName = localStorage.getItem('ems_admin') || 'Admin';
  ['admin-name', 'topbar-user'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = adminName.charAt(0).toUpperCase() + adminName.slice(1);
  });

  // Auth guard
  const pathname = window.location.pathname;
  const isLoginPage = pathname === '/' || pathname.endsWith('/index.html') || pathname.endsWith('/ems/');

  try {
    const res = await fetch('/api/auth/status');
    const data = await res.json();
    if (data.authenticated) {
      localStorage.setItem('ems_logged_in', 'true');
      localStorage.setItem('ems_admin', data.username);
      if (isLoginPage) {
        window.location.href = '/pages/dashboard.html';
      }
    } else {
      localStorage.removeItem('ems_logged_in');
      localStorage.removeItem('ems_admin');
      if (!isLoginPage) {
        window.location.href = '/index.html';
      }
    }
  } catch (err) {
    console.error("Auth status check failed", err);
    // Fallback to local check if api is unreachable
    if (!isLoginPage && !localStorage.getItem('ems_logged_in')) {
      window.location.href = '/index.html';
    }
  }
});
