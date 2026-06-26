// ============================================================
//  employees.js – Employee list, search, filter, delete
// ============================================================

let deleteTargetId = null;

window.addEventListener('DOMContentLoaded', () => {
  populateDeptFilter();
  renderTable();
});

function populateDeptFilter() {
  const sel = document.getElementById('dept-filter');
  if (!sel) return;
  getDepartments().forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.name;
    opt.textContent = d.name;
    sel.appendChild(opt);
  });
}

function filterEmployees() {
  renderTable();
}

function renderTable() {
  const search = (document.getElementById('search-input')?.value || '').toLowerCase();
  const dept   = document.getElementById('dept-filter')?.value || '';
  const status = document.getElementById('status-filter')?.value || '';

  let emps = getEmployees().filter(e => {
    const matchSearch = !search ||
      e.name.toLowerCase().includes(search) ||
      e.email.toLowerCase().includes(search) ||
      e.role.toLowerCase().includes(search) ||
      e.dept.toLowerCase().includes(search);
    const matchDept   = !dept   || e.dept   === dept;
    const matchStatus = !status || e.status === status;
    return matchSearch && matchDept && matchStatus;
  });

  const countEl = document.getElementById('result-count');
  if (countEl) countEl.textContent = `${emps.length} result${emps.length !== 1 ? 's' : ''}`;

  const tbody   = document.getElementById('emp-tbody');
  const noRes   = document.getElementById('no-results');

  if (!emps.length) {
    if (tbody)  tbody.innerHTML = '';
    if (noRes)  noRes.style.display = 'block';
    return;
  }
  if (noRes) noRes.style.display = 'none';

  tbody.innerHTML = emps.map(e => {
    const ac = getAvatarColor(e.name);
    const statusBadge = e.status === 'active'
      ? '<span class="badge badge-active">Active</span>'
      : '<span class="badge badge-inactive">Inactive</span>';
    return `<tr>
      <td style="color:#999;font-size:12px;">#${e.id}</td>
      <td>
        <div class="emp-cell">
          <div class="emp-avatar" style="background:${ac.bg};color:${ac.color};">${getInitials(e.name)}</div>
          <div>
            <div class="emp-name">${e.name}</div>
            <div class="emp-email">${e.email}</div>
          </div>
        </div>
      </td>
      <td><span class="badge badge-dept">${e.dept}</span></td>
      <td>${e.role}</td>
      <td style="font-weight:500;">${formatSalary(e.salary)}</td>
      <td style="color:#888;font-size:12px;">${e.joined}</td>
      <td>${statusBadge}</td>
      <td>
        <div class="action-btns">
          <a href="add-employee.html?id=${e.id}" class="btn btn-sm btn-secondary" title="Edit">✏️ Edit</a>
          <button class="btn btn-sm btn-danger" onclick="openDeleteModal(${e.id}, '${e.name.replace(/'/g,"\\'")}')">🗑️ Delete</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function openDeleteModal(id, name) {
  deleteTargetId = id;
  const nameEl = document.getElementById('del-emp-name');
  if (nameEl) nameEl.textContent = name;
  document.getElementById('delete-modal').style.display = 'flex';
}

function closeDeleteModal() {
  deleteTargetId = null;
  document.getElementById('delete-modal').style.display = 'none';
}

function confirmDelete() {
  if (deleteTargetId == null) return;
  deleteEmployee(deleteTargetId);
  closeDeleteModal();
  renderTable();
  showToast('Employee deleted successfully.');
}

// Close modal on backdrop click
document.addEventListener('click', e => {
  const modal = document.getElementById('delete-modal');
  if (e.target === modal) closeDeleteModal();
});
