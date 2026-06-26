// ============================================================
//  departments.js – Department CRUD
// ============================================================

let deptEditId   = null;
let deptDeleteId = null;

window.addEventListener('DOMContentLoaded', renderDeptGrid);

function renderDeptGrid() {
  const grid = document.getElementById('dept-grid');
  if (!grid) return;

  const depts = getDepartments();
  if (!depts.length) {
    grid.innerHTML = '<p style="color:#888; padding:20px;">No departments found. Add one!</p>';
    return;
  }

  grid.innerHTML = depts.map(d => {
    const cnt = deptEmployeeCount(d.name);
    return `
    <div class="dept-card">
      <div class="dept-card-icon">${d.icon || '🏢'}</div>
      <div class="dept-card-name">${d.name}</div>
      <div class="dept-card-desc">${d.desc || ''}</div>
      <div class="dept-card-count">👤 ${cnt} employee${cnt !== 1 ? 's' : ''}</div>
      <div class="dept-card-actions">
        <a href="employees.html" class="btn btn-sm btn-secondary" onclick="localStorage.setItem('dept_filter','${d.name}')">View Staff</a>
        <button class="btn btn-sm btn-secondary" onclick="openEditDeptModal('${d.id}')">✏️ Edit</button>
        <button class="btn btn-sm btn-danger" onclick="openDelDeptModal('${d.id}', '${d.name}')">🗑️</button>
      </div>
    </div>`;
  }).join('');
}

// ── ADD / EDIT ────────────────────────────────────────────────────────────────
function openAddDeptModal() {
  deptEditId = null;
  document.getElementById('dept-modal-title').textContent = 'Add Department';
  document.getElementById('dept-name-input').value = '';
  document.getElementById('dept-icon-input').value = '';
  document.getElementById('dept-desc-input').value = '';
  document.getElementById('dept-modal').style.display = 'flex';
}

function openEditDeptModal(id) {
  const dept = getDepartments().find(d => d.id === id);
  if (!dept) return;
  deptEditId = id;
  document.getElementById('dept-modal-title').textContent = 'Edit Department';
  document.getElementById('dept-name-input').value = dept.name;
  document.getElementById('dept-icon-input').value = dept.icon || '';
  document.getElementById('dept-desc-input').value = dept.desc || '';
  document.getElementById('dept-modal').style.display = 'flex';
}

function closeDeptModal() {
  deptEditId = null;
  document.getElementById('dept-modal').style.display = 'none';
}

function saveDept() {
  const name = document.getElementById('dept-name-input').value.trim();
  const icon = document.getElementById('dept-icon-input').value.trim() || '🏢';
  const desc = document.getElementById('dept-desc-input').value.trim();

  if (!name) { alert('Department name is required.'); return; }

  if (deptEditId) {
    updateDepartment({ id: deptEditId, name, icon, desc });
    showToast('Department updated.');
  } else {
    addDepartment({ name, icon, desc });
    showToast('Department added.');
  }
  closeDeptModal();
  renderDeptGrid();
}

// ── DELETE ────────────────────────────────────────────────────────────────────
function openDelDeptModal(id, name) {
  deptDeleteId = id;
  document.getElementById('del-dept-name').textContent = name;
  document.getElementById('del-dept-modal').style.display = 'flex';
}

function closeDelDeptModal() {
  deptDeleteId = null;
  document.getElementById('del-dept-modal').style.display = 'none';
}

function confirmDelDept() {
  if (!deptDeleteId) return;
  deleteDepartment(deptDeleteId);
  closeDelDeptModal();
  renderDeptGrid();
  showToast('Department deleted.');
}

// Close modals on backdrop click
document.addEventListener('click', e => {
  const deptModal = document.getElementById('dept-modal');
  const delModal  = document.getElementById('del-dept-modal');
  if (e.target === deptModal)  closeDeptModal();
  if (e.target === delModal)   closeDelDeptModal();
});
