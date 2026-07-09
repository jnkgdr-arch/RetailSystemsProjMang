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
function renderRoles(filter='all'){
  const chart = document.getElementById('costChart');
  const shown = roles.filter(r => filter === 'all' || r[3] === filter);
  const max = Math.max(...shown.map(r => r[1]));
  chart.innerHTML = shown.map((r,i)=>`<button class="cost-bar ${r[3]}" data-index="${roles.indexOf(r)}" style="--width:${(r[1]/max)*100}%"><span>${r[0]}</span><i>${money(r[1])}</i></button>`).join('');
  chart.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => showRole(+btn.dataset.index)));
  showRole(roles.indexOf(shown[0]));
}
function showRole(index){
  const [name,cost,responsibility,type] = roles[index];
  document.querySelectorAll('.cost-bar').forEach(b => b.classList.toggle('active', +b.dataset.index === index));
  document.getElementById('roleDetail').innerHTML = `<span class="pill">${type === 'people' ? 'Role' : 'Asset'}</span><h3>${name}</h3><div class="big-cost">${money(cost)}</div><p>${responsibility}</p>`;
}
function renderWbs(){
  document.getElementById('timeline').innerHTML = wbs.map((phase, index)=>`
    <article class="phase ${index < 2 ? 'open' : ''}">
      <button class="phase-head"><span>${phase[0]}</span><strong>${phase[1].length} tasks</strong></button>
      <div class="phase-body">
        ${phase[1].map(task=>`<div class="task"><b>${task[0]}</b><span>${task[1]}</span><em>${task[2]}</em><small>${task[3]}</small></div>`).join('')}
        <div class="milestone">◆ Milestone: ${phase[2]}</div>
      </div>
    </article>`).join('');
  document.querySelectorAll('.phase-head').forEach(btn => btn.addEventListener('click', () => btn.parentElement.classList.toggle('open')));
}

document.getElementById('roleFilter').addEventListener('change', e => renderRoles(e.target.value));
document.getElementById('expandAll').addEventListener('click', e => {
  const phases = [...document.querySelectorAll('.phase')];
  const allOpen = phases.every(p => p.classList.contains('open'));
  phases.forEach(p => p.classList.toggle('open', !allOpen));
  e.target.textContent = allOpen ? 'Expand all phases' : 'Collapse all phases';
});
renderRoles();
renderWbs();
