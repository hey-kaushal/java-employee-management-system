// ============================================================
//  data.js – Employee & Department Data Layer (API Backed)
// ============================================================

let cacheEmployees = [];
let cacheDepartments = [];

// Fetch data from backend APIs and cache them locally
async function loadAllData() {
  try {
    const empRes = await fetch('/api/employees');
    if (empRes.ok) {
      cacheEmployees = await empRes.json();
    }
    const deptRes = await fetch('/api/departments');
    if (deptRes.ok) {
      cacheDepartments = await deptRes.json();
    }
  } catch (err) {
    console.error("Error loading data from APIs", err);
  }
}

// ── EMPLOYEES ─────────────────────────────────────────────────────────────────
function getEmployees() {
  return cacheEmployees;
}

function getEmployee(id) {
  return getEmployees().find(e => e.id === Number(id));
}

async function addEmployee(emp) {
  try {
    const res = await fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emp)
    });
    if (res.ok) {
      const saved = await res.json();
      cacheEmployees.push(saved);
      return saved;
    }
  } catch (err) {
    console.error("Error adding employee", err);
  }
}

async function updateEmployee(updated) {
  try {
    const res = await fetch(`/api/employees/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    if (res.ok) {
      const saved = await res.json();
      cacheEmployees = cacheEmployees.map(e => e.id === Number(saved.id) ? saved : e);
      return saved;
    }
  } catch (err) {
    console.error("Error updating employee", err);
  }
}

async function deleteEmployee(id) {
  try {
    const res = await fetch(`/api/employees/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      cacheEmployees = cacheEmployees.filter(e => e.id !== Number(id));
    }
  } catch (err) {
    console.error("Error deleting employee", err);
  }
}

// ── DEPARTMENTS ───────────────────────────────────────────────────────────────
function getDepartments() {
  return cacheDepartments;
}

async function addDepartment(dept) {
  try {
    const res = await fetch('/api/departments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dept)
    });
    if (res.ok) {
      const saved = await res.json();
      cacheDepartments.push(saved);
      return saved;
    }
  } catch (err) {
    console.error("Error adding department", err);
  }
}

async function updateDepartment(updated) {
  try {
    const res = await fetch(`/api/departments/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    if (res.ok) {
      const saved = await res.json();
      cacheDepartments = cacheDepartments.map(d => d.id === saved.id ? saved : d);
      return saved;
    }
  } catch (err) {
    console.error("Error updating department", err);
  }
}

async function deleteDepartment(id) {
  try {
    const res = await fetch(`/api/departments/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      cacheDepartments = cacheDepartments.filter(d => d.id !== id);
    }
  } catch (err) {
    console.error("Error deleting department", err);
  }
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function formatSalary(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}

function getInitials(name) {
  return (name || '').split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);
}

const AVATAR_COLORS = [
  { bg: '#E6F1FB', color: '#0C447C' },
  { bg: '#EEEDFE', color: '#3C3489' },
  { bg: '#E1F5EE', color: '#085041' },
  { bg: '#FAEEDA', color: '#633806' },
  { bg: '#FAECE7', color: '#712B13' },
  { bg: '#EAF3DE', color: '#27500A' },
];

function getAvatarColor(name) {
  const i = ((name || '').charCodeAt(0) || 0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[i];
}

function deptEmployeeCount(deptName) {
  return getEmployees().filter(e => e.dept === deptName).length;
}
