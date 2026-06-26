// ============================================================
//  data.js – Employee & Department Data Layer (localStorage)
// ============================================================

const EMS_EMP_KEY  = 'ems_employees';
const EMS_DEPT_KEY = 'ems_departments';
const EMS_ID_KEY   = 'ems_next_id';

// ── DEFAULT DATA ─────────────────────────────────────────────────────────────
const DEFAULT_DEPARTMENTS = [
  { id: 'd1', name: 'Engineering',  icon: '💻', desc: 'Software development & QA' },
  { id: 'd2', name: 'Marketing',    icon: '📣', desc: 'Brand, content & campaigns' },
  { id: 'd3', name: 'HR',           icon: '🤝', desc: 'Talent & people operations' },
  { id: 'd4', name: 'Finance',      icon: '💰', desc: 'Accounts & financial planning' },
  { id: 'd5', name: 'Operations',   icon: '⚙️', desc: 'Logistics & process management' },
  { id: 'd6', name: 'Design',       icon: '🎨', desc: 'UI/UX & brand identity' },
];

const DEFAULT_EMPLOYEES = [
  { id: 1, name: 'Priya Sharma',  email: 'priya@company.com',  phone: '9876543210', gender: 'Female', dept: 'Engineering',  role: 'Senior Developer',   salary: 95000, type: 'Full-Time', status: 'active',   joined: '2021-03-15' },
  { id: 2, name: 'Rahul Gupta',   email: 'rahul@company.com',  phone: '9123456789', gender: 'Male',   dept: 'Marketing',    role: 'Marketing Lead',      salary: 72000, type: 'Full-Time', status: 'active',   joined: '2020-07-01' },
  { id: 3, name: 'Anita Desai',   email: 'anita@company.com',  phone: '9988776655', gender: 'Female', dept: 'HR',           role: 'HR Manager',          salary: 68000, type: 'Full-Time', status: 'active',   joined: '2019-11-20' },
  { id: 4, name: 'Vikram Mehta',  email: 'vikram@company.com', phone: '9871234567', gender: 'Male',   dept: 'Finance',      role: 'Finance Analyst',     salary: 78000, type: 'Full-Time', status: 'inactive', joined: '2022-01-10' },
  { id: 5, name: 'Sunita Patel',  email: 'sunita@company.com', phone: '9765432109', gender: 'Female', dept: 'Design',       role: 'UI/UX Designer',      salary: 82000, type: 'Full-Time', status: 'active',   joined: '2021-08-25' },
  { id: 6, name: 'Arjun Singh',   email: 'arjun@company.com',  phone: '9654321098', gender: 'Male',   dept: 'Operations',   role: 'Ops Manager',         salary: 89000, type: 'Full-Time', status: 'active',   joined: '2020-03-11' },
  { id: 7, name: 'Meera Joshi',   email: 'meera@company.com',  phone: '9543210987', gender: 'Female', dept: 'Engineering',  role: 'QA Engineer',         salary: 74000, type: 'Full-Time', status: 'active',   joined: '2022-06-01' },
  { id: 8, name: 'Kiran Kumar',   email: 'kiran@company.com',  phone: '9432109876', gender: 'Male',   dept: 'Marketing',    role: 'Content Writer',      salary: 55000, type: 'Part-Time', status: 'inactive', joined: '2023-01-15' },
  { id: 9, name: 'Deepa Nair',    email: 'deepa@company.com',  phone: '9321098765', gender: 'Female', dept: 'Engineering',  role: 'DevOps Engineer',     salary: 91000, type: 'Full-Time', status: 'active',   joined: '2021-11-08' },
  { id:10, name: 'Rohit Verma',   email: 'rohit@company.com',  phone: '9210987654', gender: 'Male',   dept: 'Finance',      role: 'Accountant',          salary: 61000, type: 'Full-Time', status: 'active',   joined: '2023-04-20' },
];

// ── SEED ─────────────────────────────────────────────────────────────────────
function seedData() {
  if (!localStorage.getItem(EMS_EMP_KEY))  localStorage.setItem(EMS_EMP_KEY,  JSON.stringify(DEFAULT_EMPLOYEES));
  if (!localStorage.getItem(EMS_DEPT_KEY)) localStorage.setItem(EMS_DEPT_KEY, JSON.stringify(DEFAULT_DEPARTMENTS));
  if (!localStorage.getItem(EMS_ID_KEY))   localStorage.setItem(EMS_ID_KEY, '11');
}

// ── EMPLOYEES ─────────────────────────────────────────────────────────────────
function getEmployees() {
  seedData();
  return JSON.parse(localStorage.getItem(EMS_EMP_KEY)) || [];
}

function saveEmployees(list) {
  localStorage.setItem(EMS_EMP_KEY, JSON.stringify(list));
}

function getEmployee(id) {
  return getEmployees().find(e => e.id === Number(id));
}

function addEmployee(emp) {
  const list = getEmployees();
  const id = Number(localStorage.getItem(EMS_ID_KEY)) || 11;
  emp.id = id;
  list.push(emp);
  saveEmployees(list);
  localStorage.setItem(EMS_ID_KEY, String(id + 1));
  return emp;
}

function updateEmployee(updated) {
  const list = getEmployees().map(e => e.id === Number(updated.id) ? { ...e, ...updated } : e);
  saveEmployees(list);
}

function deleteEmployee(id) {
  saveEmployees(getEmployees().filter(e => e.id !== Number(id)));
}

// ── DEPARTMENTS ───────────────────────────────────────────────────────────────
function getDepartments() {
  seedData();
  return JSON.parse(localStorage.getItem(EMS_DEPT_KEY)) || [];
}

function saveDepartments(list) {
  localStorage.setItem(EMS_DEPT_KEY, JSON.stringify(list));
}

function addDepartment(dept) {
  const list = getDepartments();
  dept.id = 'd' + Date.now();
  list.push(dept);
  saveDepartments(list);
}

function updateDepartment(updated) {
  saveDepartments(getDepartments().map(d => d.id === updated.id ? { ...d, ...updated } : d));
}

function deleteDepartment(id) {
  saveDepartments(getDepartments().filter(d => d.id !== id));
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

// Seed immediately on load
seedData();
