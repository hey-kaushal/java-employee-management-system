// ============================================================
//  employee-form.js – Add & Edit employee (shared form page)
// ============================================================

let editingId = null;

window.addEventListener('DOMContentLoaded', () => {
  populateDeptDropdown();
  setDefaultJoinDate();

  // Check if editing (URL: ?id=5)
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id) {
    editingId = Number(id);
    loadEmployeeForEdit(editingId);
  }
});

function populateDeptDropdown() {
  const sel = document.getElementById('f-dept');
  if (!sel) return;
  getDepartments().forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.name;
    opt.textContent = `${d.icon} ${d.name}`;
    sel.appendChild(opt);
  });
}

function setDefaultJoinDate() {
  const dateInput = document.getElementById('f-joined');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }
}

function loadEmployeeForEdit(id) {
  const emp = getEmployee(id);
  if (!emp) { alert('Employee not found.'); window.location.href = 'employees.html'; return; }

  // Update page title & button label
  const titleEl = document.getElementById('form-page-title');
  if (titleEl) titleEl.textContent = 'Edit Employee';
  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) saveBtn.textContent = '💾 Update Employee';

  // Fill fields
  setValue('f-name',   emp.name);
  setValue('f-email',  emp.email);
  setValue('f-phone',  emp.phone);
  setValue('f-gender', emp.gender);
  setValue('f-dept',   emp.dept);
  setValue('f-role',   emp.role);
  setValue('f-salary', emp.salary);
  setValue('f-joined', emp.joined);
  setValue('f-type',   emp.type);
  setValue('f-status', emp.status);
}

function setValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

function saveEmployee() {
  // Collect values
  const name   = document.getElementById('f-name').value.trim();
  const email  = document.getElementById('f-email').value.trim();
  const phone  = document.getElementById('f-phone').value.trim();
  const gender = document.getElementById('f-gender').value;
  const dept   = document.getElementById('f-dept').value;
  const role   = document.getElementById('f-role').value.trim();
  const salary = document.getElementById('f-salary').value;
  const joined = document.getElementById('f-joined').value;
  const type   = document.getElementById('f-type').value;
  const status = document.getElementById('f-status').value;

  // Validate
  const errEl = document.getElementById('form-error');
  if (!name || !email || !dept || !role) {
    errEl.textContent = 'Please fill in all required fields (Name, Email, Department, Role).';
    errEl.style.display = 'block';
    errEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errEl.textContent = 'Please enter a valid email address.';
    errEl.style.display = 'block';
    return;
  }
  errEl.style.display = 'none';

  const empData = { name, email, phone, gender, dept, role, salary: Number(salary) || 0, joined, type, status };

  if (editingId) {
    empData.id = editingId;
    updateEmployee(empData);
    showToast('Employee updated successfully!');
  } else {
    addEmployee(empData);
    showToast('Employee added successfully!');
    // Reset form
    ['f-name','f-email','f-phone','f-role','f-salary'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    document.getElementById('f-gender').value = '';
    document.getElementById('f-dept').value = '';
    document.getElementById('f-type').value = 'Full-Time';
    document.getElementById('f-status').value = 'active';
    setDefaultJoinDate();
  }

  // Redirect after short delay
  setTimeout(() => { window.location.href = 'employees.html'; }, 1000);
}
