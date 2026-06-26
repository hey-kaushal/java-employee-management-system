// ============================================================
//  dashboard.js – Dashboard metrics, chart, recent table
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  renderMetrics();
  renderDeptChart();
  renderRecentTable();
});

function renderMetrics() {
  const emps = getEmployees();
  const total  = emps.length;
  const active = emps.filter(e => e.status === 'active').length;
  const depts  = getDepartments().length;
  const avgSal = total ? Math.round(emps.reduce((s, e) => s + (Number(e.salary) || 0), 0) / total) : 0;

  const grid = document.getElementById('metrics-grid');
  if (!grid) return;

  grid.innerHTML = [
    { icon: '👥', label: 'Total Employees', value: total, sub: 'All time' },
    { icon: '✅', label: 'Active',           value: active, sub: `${total - active} inactive` },
    { icon: '🏗️', label: 'Departments',     value: depts,  sub: 'Across company' },
    { icon: '💰', label: 'Avg Salary',       value: formatSalary(avgSal), sub: 'Per annum' },
  ].map(m => `
    <div class="metric-card">
      <div class="metric-icon">${m.icon}</div>
      <div class="metric-label">${m.label}</div>
      <div class="metric-value">${m.value}</div>
      <div class="metric-sub">${m.sub}</div>
    </div>
  `).join('');
}

function renderDeptChart() {
  const emps  = getEmployees();
  const depts = getDepartments();
  const total = emps.length || 1;
  const el = document.getElementById('dept-chart');
  if (!el) return;

  el.innerHTML = depts.map(d => {
    const cnt = deptEmployeeCount(d.name);
    const pct = Math.round((cnt / total) * 100);
    return `
      <div class="dept-bar-row">
        <div class="dept-bar-label">
          <span>${d.icon} ${d.name}</span>
          <span style="color:#666;">${cnt}</span>
        </div>
        <div class="dept-bar-track">
          <div class="dept-bar-fill" style="width:${pct}%;"></div>
        </div>
      </div>`;
  }).join('');
}

function renderRecentTable() {
  const tbody = document.getElementById('recent-tbody');
  if (!tbody) return;

  const recent = [...getEmployees()]
    .sort((a, b) => (b.joined > a.joined ? 1 : -1))
    .slice(0, 6);

  tbody.innerHTML = recent.map(e => {
    const ac = getAvatarColor(e.name);
    const statusBadge = e.status === 'active'
      ? '<span class="badge badge-active">Active</span>'
      : '<span class="badge badge-inactive">Inactive</span>';
    return `<tr>
      <td>
        <div class="emp-cell">
          <div class="emp-avatar" style="background:${ac.bg};color:${ac.color};">${getInitials(e.name)}</div>
          <div>
            <div class="emp-name">${e.name}</div>
            <div class="emp-email">${e.dept}</div>
          </div>
        </div>
      </td>
      <td><span class="badge badge-dept">${e.dept}</span></td>
      <td>${statusBadge}</td>
    </tr>`;
  }).join('');
}
