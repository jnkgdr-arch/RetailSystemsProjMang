const roles = [
  ['Executive Sponsor (Store Owner)',270000,'Approves budget, ensures strategic alignment, authorizes major decisions','people'],
  ['Project Manager',99440,'Oversees project planning, scheduling, resource allocation, and reporting','people'],
  ['Retail Manager',72000,'Provides operational insight and ensures the system fits daily store processes','people'],
  ['IT Department / IT Specialist',80000,'Handles software installation, device setup, system integration, and technical support','people'],
  ['Vendor Software Representative',70000,'Provides software installation assistance, troubleshooting, and training','people'],
  ['Marketing Manager',102000,'Ensures inventory data integrates with product promotions and website availability when applicable','people'],
  ['Chief of Financial Operations (& Purchasing Officer)',120000,'Oversees budget, approves purchases, ensures ROI, and manages hardware, devices, and licensing agreements','people'],
  ['Security Manager (Cyber & Physical)',100000,'Verifies data protection, user access control, and device security','people'],
  ['Operations Manager (Training Coordinator)',60000,'Coordinates store staff scheduling for training and weekly inventory updates','people'],
  ['Store Staff (End Users)',45760,'Use handheld devices for inventory updates and daily stock input','people'],
  ['Inventory Management Software',3000,'Main system for tracking stock, locations, and reorder levels','assets'],
  ['Handheld Devices (Scanners/Tablets)',600,'Used by staff for weekly inventory updates and item location input','assets'],
  ['Computers / Laptops',900,'Used by management and IT for system administration','assets'],
  ['Networking Equipment',1000,'Supports handheld device connectivity throughout the store','assets'],
  ['Training Materials',500,'Guides, manuals, and visual aids for onboarding users','assets'],
  ['Data Backup System or Cloud Backup Service',300,'Ensures inventory data is securely stored and recoverable','assets']
];

const wbs = [
  ['1. Project Initiation',[['1.1','Define project objectives and scope','Project Manager, Executive Sponsor','—'],['1.2','Identify key stakeholders','Project Manager','SS'],['1.3','Develop project charter and obtain approval','Project Manager, Executive Sponsor','FS'],['1.4','Assign team roles and responsibilities','Project Manager, HR/Operations Manager','SF']], 'Project Initiation Complete'],
  ['2. Project Planning',[['2.1','Develop project schedule and milestones','Project Manager','FS'],['2.2','Estimate resource requirements and costs','Project Manager, CFO','SS'],['2.3','Identify potential risks and mitigation strategies','Project Manager, Security Manager','SS'],['2.4','Conduct project kickoff meeting','Project Manager, All Department Heads','FS']], 'Project Planning Complete'],
  ['3. Software & Hardware Procurement',[['3.1','Evaluate and select inventory management software','IT Department, Vendor Representative','SS'],['3.2','Obtain vendor proposals and finalize contracts','Project Manager, Executive Sponsor','SF'],['3.3','Purchase handheld devices and computers','IT Department, CFO','SS'],['3.4','Acquire backup storage and network upgrades','IT Department, Security Manager','SS']], 'Procurement Process Complete'],
  ['4. System Setup & Configuration',[['4.1','Install and configure software','IT Department, Vendor Representative','FS'],['4.2','Connect handheld devices and ensure compatibility','IT Department','FS'],['4.3','Integrate system with POS','IT Department, Vendor Representative','SS'],['4.4','Establish backup storage and recovery settings','IT Department, Security Manager','SS']], 'Setup & Configuration Complete'],
  ['5. Data Entry & Migration',[['5.1','Gather and clean existing inventory data','Operations Staff, Retail Manager','FS'],['5.2','Upload data into new system','IT Department','SS'],['5.3','Assign item locations within store','Retail Manager, Store Staff','FF'],['5.4','Verify data accuracy and sync','IT Department, Operations Manager','SS']], 'Data Entry & Migration Complete'],
  ['6. Testing & Quality Management',[['6.1','Conduct pilot test in one department','IT Department, Retail Manager','FS'],['6.2','Identify and fix data/system errors','IT Department, Vendor Representative','SS'],['6.3','Perform full functionality testing','IT Department, Security Manager','FF'],['6.4','Obtain user acceptance sign-off','Project Manager, Executive Sponsor','FF']], 'Testing & Quality Management Complete'],
  ['7. Training & Change Management',[['7.1','Develop training materials and manuals','HR Department, IT Department','FS'],['7.2','Train managers on system administration','IT Department','FS'],['7.3','Conduct staff training on handheld devices','IT Department, Operations Manager','FS'],['7.4','Gather feedback from training sessions','HR Department, Project Manager','FS']], 'Training & Change Management Complete'],
  ['8. Implementation (Go-Live)',[['8.1','Deploy system storewide','IT Department, Project Manager','FS'],['8.2','Assign weekly inventory update schedule','Retail Manager, Operations Manager','SS'],['8.3','Provide on-site technical support','IT Department, Vendor Representative','SS'],['8.4','Monitor system performance and feedback','Project Manager, IT Department','SS']], 'Go-Live Complete; meets requirements'],
  ['9. Project Closure',[['9.1','Conduct post-implementation review','Project Manager, Executive Sponsor','FS'],['9.2','Document lessons learned and recommendations','Project Manager','FS'],['9.3','Release project resources','Project Manager','FF'],['9.4','Obtain final approval and close project','Executive Sponsor','FS']], 'Full Project Completion']
];

function money(value){ return value.toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}); }
function renderRoles(){
  renderCostGraph('peopleCostChart', roles.filter(r => r[3] === 'people'));
  renderCostGraph('assetCostChart', roles.filter(r => r[3] === 'assets'));
  showRole(0);
}
function renderCostGraph(targetId, dataset){
  const chart = document.getElementById(targetId);
  const max = Math.max(...dataset.map(r => r[1]));
  const ticks = [1, .75, .5, .25, 0];
  chart.innerHTML = `
    <div class="bar-chart" style="--bar-count:${dataset.length}">
      <div class="bar-y-axis">${ticks.map(t => `<span>${money(max * t)}</span>`).join('')}</div>
      <div class="bar-plot">
        <div class="bar-grid">${ticks.map(() => '<i></i>').join('')}</div>
        <div class="chart-bars">
          ${dataset.map(r=>`
            <button class="chart-bar ${r[3]}" data-index="${roles.indexOf(r)}" title="${r[0]}: ${money(r[1])}" style="--height:${Math.max((r[1]/max)*100, 10)}%">
              <span class="bar-value">${money(r[1])}</span>
              <i></i>
            </button>`).join('')}
        </div>
      </div>
      <div class="bar-x-spacer"></div>
      <div class="bar-x-labels">
        ${dataset.map(r=>`<span title="${r[0]}">${r[0]}</span>`).join('')}
      </div>
    </div>`;
  chart.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => showRole(+btn.dataset.index)));
}
function showRole(index){
  const [name,cost,responsibility,type] = roles[index];
  document.querySelectorAll('.chart-bar').forEach(b => b.classList.toggle('active', +b.dataset.index === index));
  document.getElementById('roleDetail').innerHTML = `<span class="pill">${type === 'people' ? 'Role' : 'Asset'}</span><h3>${name}</h3><div class="big-cost">${money(cost)}</div><p>${responsibility}</p>`;
}
function renderWbs(){
  const diagram = document.getElementById('timeline');
  const deliverables = wbs.map((phase, index)=>{
    const levelNumber = phase[0].split('.')[0];
    return `
      <article class="tree-deliverable open">
        <button class="deliverable-box" aria-expanded="true">
          <span class="level-badge">Level 2.${levelNumber}</span>
          <span class="level-title">${phase[0]}</span>
          <strong>${phase[1].length} work packages</strong>
        </button>
        <div class="package-branch">
          ${phase[1].map(task=>`
            <div class="package-box">
              <b>${task[0]}</b>
              <span>${task[1]}</span>
              <em>${task[2]}</em>
              <small>${task[3]}</small>
            </div>`).join('')}
          <div class="milestone package-milestone">◆ Milestone: ${phase[2]}</div>
        </div>
      </article>`;
  }).join('');

  const scheduleRows = wbs.map((phase, index)=>{
    const start = (index * 4) + 1;
    const duration = 4;
    return `
      <div class="gantt-row">
        <div class="gantt-label">${phase[0]}</div>
        <div class="gantt-track">
          <div class="gantt-bar" style="--start:${start};--duration:${duration}">
            <span>${phase[1].map(task => task[0]).join(', ')}</span>
          </div>
          <div class="gantt-milestone" style="--point:${start + duration - 1}" title="${phase[2]}">◆</div>
        </div>
      </div>`;
  }).join('');

  diagram.innerHTML = `
    <div class="wbs-two-column">
      <section class="tree-panel" aria-label="Connected WBS tree">
        <div class="program-box">
          <span class="level-badge">Level 1</span>
          <strong>Retail Inventory Management System Implementation</strong>
          <small>Main project / program</small>
        </div>
        <div class="tree-connector" aria-hidden="true"></div>
        <div class="deliverable-grid">${deliverables}</div>
      </section>
      <section class="schedule-panel" aria-label="Project timeline mini Gantt chart">
      <div class="section-heading">
        <p class="eyebrow">Project Timeline / Schedule</p>
        <h3>Mini Gantt view by WBS phase</h3>
      </div>
      <div class="gantt-calendar">
        <div class="gantt-label heading">WBS Phase</div>
        ${Array.from({length: 36}, (_, i) => `<div class="week-cell">W${i + 1}</div>`).join('')}
        ${scheduleRows}
      </div>
      <div class="schedule-legend">
        <span><i class="legend-bar"></i> Activity window</span>
        <span><i class="legend-mile">◆</i> Milestone checkpoint</span>
      </div>
      </section>
    </div>`;

  document.querySelectorAll('.deliverable-box').forEach(btn => btn.addEventListener('click', () => {
    const level = btn.parentElement;
    level.classList.toggle('open');
    btn.setAttribute('aria-expanded', level.classList.contains('open'));
  }));
}

document.getElementById('expandAll').addEventListener('click', e => {
  const levels = [...document.querySelectorAll('.tree-deliverable')];
  const allOpen = levels.every(p => p.classList.contains('open'));
  levels.forEach(p => {
    p.classList.toggle('open', !allOpen);
    p.querySelector('.deliverable-box').setAttribute('aria-expanded', String(!allOpen));
  });
  e.target.textContent = allOpen ? 'Expand all levels' : 'Collapse all levels';
});
renderRoles();
renderWbs();
