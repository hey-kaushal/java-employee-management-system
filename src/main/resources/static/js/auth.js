// ============================================================
//  auth.js – Login / Logout / Session Guard (API backed)
// ============================================================

async function doLogin() {
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();

  if (!user || !pass) {
    showLoginError('Please enter both username and password.');
    return;
  }

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass })
    });
    if (res.ok) {
      localStorage.setItem('ems_logged_in', 'true');
      localStorage.setItem('ems_admin', user);
      window.location.href = '/pages/dashboard.html';
    } else {
      showLoginError('Invalid credentials. Use admin / admin123');
    }
  } catch (err) {
    showLoginError('Error connecting to authentication server.');
  }
}

function showLoginError(msg) {
  const el = document.getElementById('login-error');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}

async function logout() {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } catch (err) {
    console.error("Logout request failed", err);
  }
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
