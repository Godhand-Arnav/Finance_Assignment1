// Utility to get values safely
const getVal = (id) => {
  const v = document.getElementById(id).value.trim();
  if (v === '') return NaN;
  const parsed = Number(v);
  return isNaN(parsed) ? NaN : parsed;
};
const setVal = (id, val) => document.getElementById(id).value = val;
const setHtml = (id, html) => document.getElementById(id).innerHTML = html;
const setText = (id, text) => document.getElementById(id).textContent = text;
const showError = (id, msg) => { const el = document.getElementById(id); el.style.display = msg ? 'block' : 'none'; el.textContent = msg; };
const hideErrors = () => document.querySelectorAll('.error').forEach(el => el.style.display = 'none');
const fc = FinSightEngine.formatCurrency;

// History
const HISTORY_KEY = 'finsight_history';
function saveHistory(type, summary) {
  let h = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  h.unshift({ type, summary, time: new Date().toLocaleTimeString() });
  if (h.length > 5) h = h.slice(0, 5);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
  renderHistory();
}
function renderHistory() {
  const h = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  const list = document.getElementById('historyList');
  if (!h.length) { list.innerHTML = '<div class="history-item" style="color:var(--muted)">No recent calculations.</div>'; return; }
  list.innerHTML = h.map(i => `<div class="history-item"><span>${i.type}</span><span>${i.summary}</span></div>`).join('');
}

// Navigation & Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderHistory();
  
  // Theme Handling
  const savedTheme = localStorage.getItem('finsight_theme') || 'light';
  if (savedTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  document.getElementById('themeToggle').addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    if (newTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('finsight_theme', newTheme);
  });

  // Intro bypass
  const bypassIntro = () => {
    const intro = document.getElementById('introScreen');
    if (intro && intro.style.display !== 'none') {
      intro.style.display = 'none';
      document.getElementById('mainPage').style.display = 'block';
      document.getElementById('footerBar').style.display = 'flex';
      window.scrollTo(0,0);
    }
  };

  window.addEventListener('scroll', bypassIntro);
  window.addEventListener('wheel', bypassIntro);
  window.addEventListener('touchmove', bypassIntro);
  const introEl = document.getElementById('introScreen');
  if (introEl) introEl.addEventListener('click', bypassIntro);

  // Dropdown nav
  document.getElementById('calcSelector').addEventListener('change', (e) => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    if (e.target.value) {
      document.getElementById(e.target.value).classList.add('active');
      // trigger calc to prepopulate charts
      const fname = 'calc' + e.target.value.toUpperCase();
      if(window[fname]) window[fname]();
      else if (e.target.value === 'scenario') calcScenario();
      else if (e.target.value === 'amort') calcAmort();
      else if (e.target.value === 'emi') calcEMI();
    }
  });
});

// Presets
function applyPreset(screen, values) {
  if (screen === 'fv') { setVal('fvP', values.p); setVal('fvR', values.r); setVal('fvT', values.t); calcFV(); }
  if (screen === 'emi') { setVal('eP', values.p); setVal('eR', values.r); setVal('eT', values.t); calcEMI(); }
}

// Live update (what-if)
function liveUpdate(screen) {
  const map = { 'fv': calcFV, 'pv': calcPV, 'si': calcSI, 'ci': calcCI, 'emi': calcEMI, 'amort': calcAmort, 'scenario': calcScenario };
  if(map[screen]) map[screen](true); // true means silent, don't save history on every keystroke
}

function resetForm(screen) {
  if (screen === 'fv') { setVal('fvP', 100000); setVal('fvR', 10); setVal('fvT', 5); calcFV(true); }
}

// Global Error Handler
window.addEventListener('error', (event) => {
  showGlobalError(event.error ? event.error.message : event.message);
});
window.addEventListener('unhandledrejection', (event) => {
  showGlobalError(event.reason ? event.reason.message : 'Unknown Promise Rejection');
});

function showGlobalError(msg) {
  const errScreen = document.getElementById('globalErrorScreen');
  if(errScreen) {
    errScreen.style.display = 'flex';
    document.getElementById('globalErrorMsg').textContent = msg || 'An unexpected runtime error occurred.';
    document.getElementById('globalErrorRef').textContent = 'ERR_' + Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}

// Compact Currency Formatter for Axis Ticks
function formatCompactCurrency(val) {
  if (isNaN(val)) return '₹0';
  const abs = Math.abs(val);
  if (abs >= 10000000) return (val < 0 ? '-' : '') + '₹' + (abs / 10000000).toFixed(1) + 'Cr';
  if (abs >= 100000) return (val < 0 ? '-' : '') + '₹' + (abs / 100000).toFixed(1) + 'L';
  if (abs >= 1000) return (val < 0 ? '-' : '') + '₹' + (abs / 1000).toFixed(0) + 'K';
  return (val < 0 ? '-' : '') + '₹' + Math.round(abs);
}

// SVG Line Chart Renderer with X/Y Axes and Labels
function renderLineChart(containerId, { pointsData, xLabels }) {
  const container = document.getElementById(containerId);
  if (!container || !pointsData || !pointsData.length) return;

  const width = 600;
  const height = 240;
  const padLeft = 70;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 40;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const rawMin = Math.min(...pointsData);
  const rawMax = Math.max(...pointsData);

  let minY = 0;
  let maxY = rawMax === 0 ? 100 : rawMax * 1.08;
  if (rawMin < 0) minY = rawMin * 1.1;

  if (minY === maxY) {
    maxY = minY + 100;
  }

  // 5 horizontal gridlines & Y ticks
  let yTicksHtml = '';
  const numTicks = 5;
  for (let i = 0; i < numTicks; i++) {
    const ratio = i / (numTicks - 1);
    const val = minY + (maxY - minY) * ratio;
    const yPos = padTop + plotH - ratio * plotH;
    const label = formatCompactCurrency(val);

    yTicksHtml += `<line x1="${padLeft}" y1="${yPos.toFixed(1)}" x2="${width - padRight}" y2="${yPos.toFixed(1)}" stroke="var(--rule)" stroke-width="1" stroke-dasharray="3,3" />`;
    yTicksHtml += `<text x="${padLeft - 8}" y="${(yPos + 4).toFixed(1)}" fill="var(--muted)" font-family="IBM Plex Mono" font-size="10" text-anchor="end">${label}</text>`;
  }

  // X ticks & labels
  let xTicksHtml = '';
  const numPoints = pointsData.length;
  const pts = [];

  for (let i = 0; i < numPoints; i++) {
    const ratio = numPoints > 1 ? i / (numPoints - 1) : 0.5;
    const xPos = padLeft + ratio * plotW;
    const val = pointsData[i];
    const yRatio = (val - minY) / (maxY - minY);
    const yPos = padTop + plotH - yRatio * plotH;

    pts.push({ x: xPos, y: yPos, val, label: xLabels[i] || '' });

    const showXLabel = numPoints <= 8 || i % Math.ceil(numPoints / 6) === 0 || i === numPoints - 1;
    if (showXLabel && xLabels[i]) {
      xTicksHtml += `<line x1="${xPos.toFixed(1)}" y1="${padTop + plotH}" x2="${xPos.toFixed(1)}" y2="${padTop + plotH + 4}" stroke="var(--rule)" stroke-width="1" />`;
      xTicksHtml += `<text x="${xPos.toFixed(1)}" y="${padTop + plotH + 18}" fill="var(--muted)" font-family="IBM Plex Mono" font-size="10" text-anchor="middle">${xLabels[i]}</text>`;
    }
  }

  const pathD = 'M ' + pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ');
  const areaD = pathD + ` L ${pts[pts.length - 1].x.toFixed(1)},${padTop + plotH} L ${pts[0].x.toFixed(1)},${padTop + plotH} Z`;

  let circlesHtml = '';
  pts.forEach(p => {
    circlesHtml += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.5" fill="var(--paper)" stroke="var(--accent)" stroke-width="2">
      <title>${p.label ? p.label + ': ' : ''}${FinSightEngine.formatCurrency(p.val)}</title>
    </circle>`;
  });

  const svg = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;">
    ${yTicksHtml}
    ${xTicksHtml}
    <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + plotH}" stroke="var(--ink)" stroke-width="1.5" />
    <line x1="${padLeft}" y1="${padTop + plotH}" x2="${width - padRight}" y2="${padTop + plotH}" stroke="var(--ink)" stroke-width="1.5" />
    <path d="${areaD}" fill="var(--accent)" opacity="0.1" />
    <path d="${pathD}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
    ${circlesHtml}
  </svg>`;

  container.innerHTML = svg;
}

// SVG Scenario Bar Chart Renderer with X/Y Axes and Labels
function renderScenarioChart(containerId, scenarioData) {
  const container = document.getElementById(containerId);
  if (!container || !scenarioData || !scenarioData.length) return;

  const width = 600;
  const barHeight = 24;
  const gap = 16;
  const padLeft = 60;
  const padRight = 110;
  const padTop = 15;
  const padBottom = 35;

  const plotW = width - padLeft - padRight;
  const plotH = scenarioData.length * (barHeight + gap);
  const totalH = padTop + plotH + padBottom;

  const maxVal = Math.max(...scenarioData.map(d => d.totalInterest)) * 1.1 || 100;

  let xTicksHtml = '';
  for (let i = 0; i < 4; i++) {
    const ratio = i / 3;
    const val = maxVal * ratio;
    const xPos = padLeft + ratio * plotW;
    const label = formatCompactCurrency(val);

    xTicksHtml += `<line x1="${xPos.toFixed(1)}" y1="${padTop}" x2="${xPos.toFixed(1)}" y2="${padTop + plotH}" stroke="var(--rule)" stroke-width="1" stroke-dasharray="3,3" />`;
    xTicksHtml += `<line x1="${xPos.toFixed(1)}" y1="${padTop + plotH}" x2="${xPos.toFixed(1)}" y2="${padTop + plotH + 4}" stroke="var(--rule)" stroke-width="1" />`;
    xTicksHtml += `<text x="${xPos.toFixed(1)}" y="${padTop + plotH + 18}" fill="var(--muted)" font-family="IBM Plex Mono" font-size="10" text-anchor="middle">${label}</text>`;
  }

  let barsHtml = '';
  scenarioData.forEach((d, i) => {
    const yPos = padTop + i * (barHeight + gap);
    const barW = (d.totalInterest / maxVal) * plotW;

    barsHtml += `<text x="${padLeft - 10}" y="${(yPos + barHeight / 2 + 4).toFixed(1)}" fill="var(--ink)" font-family="IBM Plex Mono" font-size="12" font-weight="600" text-anchor="end">${d.rate}%</text>`;
    barsHtml += `<rect x="${padLeft}" y="${yPos}" width="${plotW}" height="${barHeight}" fill="var(--paper-2)" rx="2" />`;
    barsHtml += `<rect x="${padLeft}" y="${yPos}" width="${barW.toFixed(1)}" height="${barHeight}" fill="var(--accent)" rx="2"><title>${d.rate}%: ${FinSightEngine.formatCurrency(d.totalInterest)} Total Interest</title></rect>`;
    barsHtml += `<text x="${(padLeft + barW + 8).toFixed(1)}" y="${(yPos + barHeight / 2 + 4).toFixed(1)}" fill="var(--ink)" font-family="IBM Plex Mono" font-size="11" font-weight="500">${FinSightEngine.formatCurrency(d.totalInterest)}</text>`;
  });

  const svg = `<svg viewBox="0 0 ${width} ${totalH}" preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto;display:block;">
    ${xTicksHtml}
    <line x1="${padLeft}" y1="${padTop + plotH}" x2="${padLeft + plotW}" y2="${padTop + plotH}" stroke="var(--ink)" stroke-width="1.5" />
    <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + plotH}" stroke="var(--ink)" stroke-width="1.5" />
    ${barsHtml}
  </svg>`;

  container.innerHTML = svg;
}

// Calculators
function calcFV(silent=false) {
  hideErrors();
  try {
    const P = getVal('fvP');
    const R = getVal('fvR');
    const T = getVal('fvT');
    const r = FinSightEngine.calculateFutureValue({ principal: P, rate: R, years: T });
    setText('fvOut', fc(r.value));
    setHtml('fvWork', r.working.replace(/\n/g, '<br>'));
    
    const steps = 5;
    const pointsData = [];
    const xLabels = [];
    for (let i = 0; i <= steps; i++) {
      const yr = (T * (i / steps));
      const val = FinSightEngine.calculateFutureValue({ principal: P, rate: R, years: yr }).value;
      pointsData.push(val);
      xLabels.push(yr.toFixed(yr % 1 === 0 ? 0 : 1) + 'Y');
    }
    renderLineChart('fvChart', { pointsData, xLabels });

    if(!silent) saveHistory('Future Value', fc(r.value));
  } catch(e) { showError('fvErr', e.message); }
}

function calcPV(silent=false) {
  hideErrors();
  try {
    const F = getVal('pvF');
    const R = getVal('pvR');
    const T = getVal('pvT');
    const r = FinSightEngine.calculatePresentValue({ futureValue: F, rate: R, years: T });
    setText('pvOut', fc(r.value));
    setHtml('pvWork', r.working.replace(/\n/g, '<br>'));
    
    const steps = 5;
    const pointsData = [];
    const xLabels = [];
    for (let i = 0; i <= steps; i++) {
      const yr = (T * (i / steps));
      const val = FinSightEngine.calculatePresentValue({ futureValue: F, rate: R, years: yr }).value;
      pointsData.push(val);
      xLabels.push(yr.toFixed(yr % 1 === 0 ? 0 : 1) + 'Y');
    }
    renderLineChart('pvChart', { pointsData, xLabels });

    if(!silent) saveHistory('Present Value', fc(r.value));
  } catch(e) { showError('pvErr', e.message); }
}

function calcSI(silent=false) {
  hideErrors();
  try {
    const P = getVal('siP');
    const R = getVal('siR');
    const T = getVal('siT');
    const r = FinSightEngine.calculateSimpleInterest({ principal: P, rate: R, years: T });
    setText('siI', fc(r.value));
    setText('siM', fc(r.maturityValue));
    setHtml('siWork', r.working.replace(/\n/g, '<br>'));
    
    const steps = 5;
    const pointsData = [];
    const xLabels = [];
    for (let i = 0; i <= steps; i++) {
      const yr = (T * (i / steps));
      const res = FinSightEngine.calculateSimpleInterest({ principal: P, rate: R, years: yr });
      pointsData.push(res.maturityValue);
      xLabels.push(yr.toFixed(yr % 1 === 0 ? 0 : 1) + 'Y');
    }
    renderLineChart('siChart', { pointsData, xLabels });

    if(!silent) saveHistory('Simple Interest', fc(r.value));
  } catch(e) { showError('siErr', e.message); }
}

function calcCI(silent=false) {
  hideErrors();
  try {
    const P = getVal('ciP');
    const R = getVal('ciR');
    const T = getVal('ciT');
    const N = getVal('ciN');
    const r = FinSightEngine.calculateCompoundInterest({ principal: P, rate: R, years: T, compoundingFrequency: N });
    setText('ciI', fc(r.value));
    setText('ciM', fc(r.maturityValue));
    setHtml('ciWork', r.working.replace(/\n/g, '<br>'));
    
    const steps = 5;
    const pointsData = [];
    const xLabels = [];
    for (let i = 0; i <= steps; i++) {
      const yr = (T * (i / steps));
      const res = FinSightEngine.calculateCompoundInterest({ principal: P, rate: R, years: yr, compoundingFrequency: N });
      pointsData.push(res.maturityValue);
      xLabels.push(yr.toFixed(yr % 1 === 0 ? 0 : 1) + 'Y');
    }
    renderLineChart('ciChart', { pointsData, xLabels });

    if(!silent) saveHistory('Compound Interest', fc(r.value));
  } catch(e) { showError('ciErr', e.message); }
}

// INR Currency Formatter with 2 Fraction Digits for EMI Calculator
function fcEMI(val) {
  if (val === null || val === undefined || isNaN(val)) return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(val);
}

// EMI Payment Composition Graph across Tenure
function renderEMIPaymentGraph(containerId, { loanAmount, rate, tenureMonths, emi }) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const width = 600;
  const height = 250;
  const padLeft = 75;
  const padRight = 20;
  const padTop = 35;
  const padBottom = 40;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  let schedule = [];
  try {
    const amort = FinSightEngine.calculateAmortization({ loanAmount, rate, tenureMonths });
    schedule = amort.schedule;
  } catch(e) { return; }

  if (!schedule || !schedule.length) return;

  const maxVal = emi * 1.08 || 100;

  let yTicksHtml = '';
  const numYTicks = 5;
  for (let i = 0; i < numYTicks; i++) {
    const ratio = i / (numYTicks - 1);
    const val = maxVal * ratio;
    const yPos = padTop + plotH - ratio * plotH;
    const label = formatCompactCurrency(val);

    yTicksHtml += `<line x1="${padLeft}" y1="${yPos.toFixed(1)}" x2="${width - padRight}" y2="${yPos.toFixed(1)}" stroke="var(--rule)" stroke-width="1" stroke-dasharray="3,3" />`;
    yTicksHtml += `<text x="${padLeft - 8}" y="${(yPos + 4).toFixed(1)}" fill="var(--muted)" font-family="IBM Plex Mono" font-size="10" text-anchor="end">${label}</text>`;
  }

  const totalMonths = schedule.length;
  const numSamples = Math.min(10, totalMonths);
  const step = Math.max(1, Math.floor((totalMonths - 1) / (numSamples - 1)));

  const sampled = [];
  for (let i = 0; i < totalMonths; i += step) {
    sampled.push(schedule[i]);
  }
  if (sampled[sampled.length - 1].month !== schedule[totalMonths - 1].month) {
    sampled.push(schedule[totalMonths - 1]);
  }

  const pPoints = [];
  const iPoints = [];
  let xTicksHtml = '';

  sampled.forEach((row, idx) => {
    const ratio = idx / (sampled.length - 1);
    const xPos = padLeft + ratio * plotW;

    const pYRatio = Math.min(1, Math.max(0, row.principal / maxVal));
    const pYPos = padTop + plotH - pYRatio * plotH;
    pPoints.push({ x: xPos, y: pYPos, val: row.principal, month: row.month });

    const iYRatio = Math.min(1, Math.max(0, row.interest / maxVal));
    const iYPos = padTop + plotH - iYRatio * plotH;
    iPoints.push({ x: xPos, y: iYPos, val: row.interest, month: row.month });

    const yrLabel = tenureMonths > 24 ? (row.month / 12).toFixed(1) + 'Y' : 'M' + row.month;
    xTicksHtml += `<line x1="${xPos.toFixed(1)}" y1="${padTop + plotH}" x2="${xPos.toFixed(1)}" y2="${padTop + plotH + 4}" stroke="var(--rule)" stroke-width="1" />`;
    xTicksHtml += `<text x="${xPos.toFixed(1)}" y="${padTop + plotH + 18}" fill="var(--muted)" font-family="IBM Plex Mono" font-size="10" text-anchor="middle">${yrLabel}</text>`;
  });

  const pPathD = 'M ' + pPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ');
  const pAreaD = pPathD + ` L ${pPoints[pPoints.length - 1].x.toFixed(1)},${padTop + plotH} L ${pPoints[0].x.toFixed(1)},${padTop + plotH} Z`;

  const iPathD = 'M ' + iPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ');
  const iAreaD = iPathD + ` L ${iPoints[iPoints.length - 1].x.toFixed(1)},${padTop + plotH} L ${iPoints[0].x.toFixed(1)},${padTop + plotH} Z`;

  let nodesHtml = '';
  pPoints.forEach((p, idx) => {
    const ip = iPoints[idx];
    nodesHtml += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="var(--paper)" stroke="var(--accent)" stroke-width="2">
      <title>Month ${p.month} - Principal Component: ${fcEMI(p.val)}</title>
    </circle>`;
    nodesHtml += `<circle cx="${ip.x.toFixed(1)}" cy="${ip.y.toFixed(1)}" r="3" fill="var(--paper)" stroke="var(--muted)" stroke-width="2">
      <title>Month ${ip.month} - Interest Component: ${fcEMI(ip.val)}</title>
    </circle>`;
  });

  const legendHtml = `
    <g transform="translate(${padLeft}, 14)">
      <rect x="0" y="0" width="10" height="10" fill="var(--accent)" rx="2" />
      <text x="16" y="9" fill="var(--ink)" font-family="IBM Plex Sans" font-size="11" font-weight="600">Principal Component</text>
      
      <rect x="170" y="0" width="10" height="10" fill="var(--muted)" rx="2" opacity="0.6" />
      <text x="186" y="9" fill="var(--ink)" font-family="IBM Plex Sans" font-size="11" font-weight="600">Interest Component</text>
    </g>
  `;

  const svg = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;">
    ${legendHtml}
    ${yTicksHtml}
    ${xTicksHtml}
    
    <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + plotH}" stroke="var(--ink)" stroke-width="1.5" />
    <line x1="${padLeft}" y1="${padTop + plotH}" x2="${width - padRight}" y2="${padTop + plotH}" stroke="var(--ink)" stroke-width="1.5" />

    <path d="${iAreaD}" fill="var(--muted)" opacity="0.08" />
    <path d="${iPathD}" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="4,3" stroke-linejoin="round" />

    <path d="${pAreaD}" fill="var(--accent)" opacity="0.12" />
    <path d="${pPathD}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round" />

    ${nodesHtml}
  </svg>`;

  container.innerHTML = svg;
}

function calcEMI(silent=false) {
  hideErrors();
  try {
    const P = getVal('eP');
    const R = getVal('eR');
    const T = getVal('eT');
    const tenureMonths = T * 12;
    const r = FinSightEngine.calculateEMI({ loanAmount: P, rate: R, tenureMonths });
    
    setText('emiResMonthly', fcEMI(r.emi));
    setText('emiResLoan', fcEMI(P));
    setText('emiResInterest', fcEMI(r.totalInterest));
    setText('emiResTotal', fcEMI(r.totalPayment));

    setHtml('emiWork', r.working.replace(/\n/g, '<br>'));
    
    renderEMIPaymentGraph('emiPaymentChart', { loanAmount: P, rate: R, tenureMonths, emi: r.emi });

    if(!silent) saveHistory('EMI', fcEMI(r.emi));
  } catch(e) { showError('emiErr', e.message); }
}

function goToAmortization() {
  setVal('aP', getVal('eP'));
  setVal('aR', getVal('eR'));
  setVal('aT', getVal('eT'));
  document.getElementById('calcSelector').value = 'amort';
  document.getElementById('calcSelector').dispatchEvent(new Event('change'));
}

function calcAmort(silent=false) {
  hideErrors();
  try {
    const P = getVal('aP');
    const R = getVal('aR');
    const T = getVal('aT');
    const r = FinSightEngine.calculateAmortization({ loanAmount: P, rate: R, tenureMonths: T * 12 });
    
    let html = '';
    r.schedule.forEach(row => {
      html += `<tr>
        <td style="padding:8px">${row.month}</td>
        <td style="padding:8px;text-align:right">${fc(row.openingBalance)}</td>
        <td style="padding:8px;text-align:right">${fc(row.interest)}</td>
        <td style="padding:8px;text-align:right">${fc(row.principal)}</td>
        <td style="padding:8px;text-align:right">${fc(row.emi)}</td>
        <td style="padding:8px;text-align:right">${fc(row.closingBalance)}</td>
      </tr>`;
    });
    document.querySelector('#amortTable tbody').innerHTML = html;
    
    setText('aEmi', fc(r.schedule.length ? r.schedule[0].emi : 0));
    setText('aInt', fc(r.summary.totalInterest));
    setText('aMonths', r.schedule.length);
    
    const pointsData = [P];
    const xLabels = ['M0'];
    const totalMonths = r.schedule.length;
    const step = Math.max(1, Math.floor(totalMonths / 5));
    
    r.schedule.forEach((row, idx) => {
      if ((idx + 1) % step === 0 || idx === totalMonths - 1) {
        pointsData.push(row.closingBalance);
        xLabels.push('M' + row.month);
      }
    });
    
    renderLineChart('amortChart', { pointsData, xLabels });
    
    if(!silent) saveHistory('Amortization', `${r.schedule.length} months`);
  } catch(e) { showError('amortErr', e.message); }
}

function calcScenario(silent=false) {
  hideErrors();
  try {
    const P = getVal('sP');
    const T = getVal('sT');
    const r = FinSightEngine.calculateScenario({ loanAmount: P, tenureMonths: T * 12 });
    
    let html = '<div class="summary">';
    r.forEach(res => {
      html += `<div><small>${res.rate}% Rate</small><strong>${fc(res.emi)}</strong><small style="margin-top:5px">Interest ${fc(res.totalInterest)}</small></div>`;
    });
    html += '</div>';
    setHtml('scenarioOut', html);
    
    renderScenarioChart('scenarioChart', r);
    if(!silent) saveHistory('Scenario Analysis', fc(P));
  } catch(e) { showError('scenarioErr', e.message); }
}
