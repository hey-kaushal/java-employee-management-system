// ============================================================
//  auth.js – Login / Logout / Session Guard
// ============================================================

const ADMIN_CREDENTIALS = { username: 'admin', password: 'admin123' };

function doLogin() {
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  const errEl = document.getElementById('login-error');

  if (!user || !pass) {
    showLoginError('Please enter both username and password.');
    return;
  }

  if (user === ADMIN_CREDENTIALS.username && pass === ADMIN_CREDENTIALS.password) {
    localStorage.setItem('ems_logged_in', 'true');
    localStorage.setItem('ems_admin', user);
    window.location.href = '/pages/dashboard.html';
  } else {
    showLoginError('Invalid credentials. Use admin / admin123');
  }
}

function showLoginError(msg) {
  const el = document.getElementById('login-error');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}

function logout() {
  localStorage.removeItem('ems_logged_in');
  localStorage.removeItem('ems_admin');
  window.location.href = '/index.html';
}

function requireAuth() {
  if (!localStorage.getItem('ems_logged_in')) {
    window.location.href = '/index.html';
  }
}

// Allow Enter key on login
window.addEventListener('DOMContentLoaded', () => {
  const passInput = document.getElementById('password');
  if (passInput) {
    passInput.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
  }
});
