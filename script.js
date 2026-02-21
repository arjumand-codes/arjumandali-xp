/**
 * ============================================
 * WINDOWS XP PORTFOLIO - JAVASCRIPT
 * Arjumand Ali - Frontend Developer
 * ============================================
 */

// ── GLOBAL STATE ──
const AppState = {
    windows: {},
    windowZIndex: 100,
    activeWindow: null,
    startMenuOpen: false,
    easterEggSequence: '',
    isMobile: window.innerWidth <= 768,
    calendarOpen: false,
    calendarDate: new Date(),
    projCurrentFilter: 'all',
    projCurrentView: 'icons',
    projSelectedId: null,
    projSearchActive: false,
    projFoldersVisible: true
};

// ── WINDOW CONFIG ──
const WindowConfig = {
    mycomputer:  { title: 'My Computer',        icon: 'assets/icon-mycomputer.png', width: 720, height: 500, x: 80,  y: 40  },
    about:       { title: 'System Properties',  icon: 'assets/icon-mycomputer.png', width: 540, height: 560, x: 100, y: 50  },
    projects:    { title: 'My Documents — Projects', icon: 'assets/icon-folder.png', width: 780, height: 520, x: 120, y: 60  },
    projdetail:  { title: 'Project Properties', icon: 'assets/icon-folder.png',     width: 560, height: 420, x: 200, y: 100 },
    skills:      { title: 'Control Panel',      icon: 'assets/icon-settings.png',   width: 500, height: 550, x: 200, y: 100 },
    experience:  { title: 'Experience',         icon: 'assets/icon-briefcase.png',  width: 500, height: 450, x: 120, y: 60  },
    contact:     { title: 'Outlook Express',    icon: 'assets/icon-email.png',      width: 550, height: 450, x: 180, y: 90  },
    resume:      { title: 'Resume',             icon: 'assets/icon-pdf.png',        width: 400, height: 400, x: 250, y: 120 },
    devconsole:  { title: 'Developer Console',  icon: 'assets/icon-settings.png',   width: 500, height: 400, x: 300, y: 150 }
};

// ── PROJECT DATA ──
const ProjectData = {
    parrotsec: {
        name: 'ParrotSec Website',
        fullName: 'ParrotSec Website Recreation',
        icon: '🌐',
        description: 'A pixel-perfect recreation of the Parrot Security OS website using modern web technologies. Features fully responsive design, smooth GSAP animations, cybersecurity-themed aesthetics, and attention to every detail of the original design.',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
        category: 'frontend',
        type: 'File Folder',
        status: 'Completed',
        year: '2024',
        live: '#', github: '#'
    },
    optimus: {
        name: 'Optimus Prime Portfolio',
        fullName: 'Optimus Prime Themed Portfolio',
        icon: '🤖',
        description: 'A Transformers-inspired portfolio website featuring the iconic Optimus Prime theme. Includes 3D CSS transforms, metallic gradients, Autobot-inspired UI elements, and immersive animation sequences.',
        tech: ['HTML5', 'CSS3', 'Three.js', 'GSAP'],
        category: 'frontend',
        type: 'File Folder',
        status: 'Completed',
        year: '2024',
        live: '#', github: '#'
    },
    cyberpunk: {
        name: 'Cyberpunk Cursor',
        fullName: 'Cyberpunk Cursor System',
        icon: '⚡',
        description: 'A custom cursor system with cyberpunk aesthetics. Features neon trails, dynamic hover effects, and fully customizable cursor states for immersive, branded web experiences.',
        tech: ['JavaScript', 'CSS3', 'Canvas API'],
        category: 'experimental',
        type: 'File Folder',
        status: 'Completed',
        year: '2023',
        live: '#', github: '#'
    },
    darkmode: {
        name: 'Dark Mode Engine',
        fullName: 'Dark Mode Tailwind Engine',
        icon: '🌙',
        description: 'A comprehensive theming engine for Tailwind CSS that enables seamless dark/light mode transitions. Includes custom color palettes, CSS variable management, and automatic theme detection from system preferences.',
        tech: ['Tailwind CSS', 'JavaScript', 'CSS Variables'],
        category: 'theming',
        type: 'File Folder',
        status: 'Active',
        year: '2024',
        live: '#', github: '#'
    },
    xptheme: {
        name: 'XP Theme Framework',
        fullName: 'XP Theme CSS Framework',
        icon: '🖥️',
        description: 'A CSS framework that recreates the Windows XP aesthetic for modern web applications. Includes authentic gradients, raised/sunken borders, interactive components, and the classic Luna theme color system.',
        tech: ['CSS3', 'SASS', 'JavaScript'],
        category: 'theming',
        type: 'File Folder',
        status: 'Active',
        year: '2026',
        live: '#', github: '#'
    },
    uikit: {
        name: 'Structured UI Kit',
        fullName: 'Structured UI Component Kit',
        icon: '🧱',
        description: 'A disciplined, architecture-first UI component library focused on clean structure and maintainable code. Emphasizes structural thinking in design, zero-chaos philosophy, and systematic component patterns.',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Web Components'],
        category: 'frontend',
        type: 'File Folder',
        status: 'In Progress',
        year: '2025',
        live: '#', github: '#'
    }
};

// ── RUN COMMANDS ──
const RunCommands = {
    mycomputer: 'mycomputer', about: 'about', projects: 'projects',
    skills: 'skills', experience: 'experience', contact: 'contact',
    resume: 'resume', devconsole: 'devconsole', cmd: 'devconsole',
    explorer: 'mycomputer', outlook: 'contact',
};

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(hideBootScreen, 3000);
    setTimeout(() => {
        const b = document.getElementById('boot-screen');
        if (b && !b.classList.contains('hidden') && b.style.display !== 'none') {
            b.style.display = 'none';
            initializeComponents();
        }
    }, 6000);
});

function hideBootScreen() {
    const b = document.getElementById('boot-screen');
    if (!b) { initializeComponents(); return; }
    b.classList.add('hidden');
    setTimeout(() => { b.style.display = 'none'; initializeComponents(); }, 520);
}

function initializeComponents() {
    if (AppState._initialized) return;
    AppState._initialized = true;
    initializeClock();
    initializeDesktopIcons();
    initializeWindows();
    initializeStartMenu();
    initializeEasterEgg();
    initializeContactForm();
    initializeShutdown();
    initializeMyComputerIcons();
    initializeAboutTabs();
    initializeCalendar();
    initializeVolumeControl();
    initializeRunDialog();
    initializeTrayIcons();
    initializeProjectsWindow();
    showWelcomeBalloon();
}

// ── CLOCK ──
function initializeClock() { updateClock(); setInterval(updateClock, 1000); }
function updateClock() {
    const el = document.getElementById('clock'), dateEl = document.getElementById('clock-date');
    if (!el) return;
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, '0');
    const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    el.textContent = `${h}:${m} ${ap}`;
    if (dateEl) {
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        dateEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
    }
}

// ── CALENDAR ──
function initializeCalendar() {
    const btn = document.getElementById('clock-btn'), popup = document.getElementById('calendar-popup');
    const prevBtn = document.getElementById('cal-prev'), nextBtn = document.getElementById('cal-next');
    if (!btn || !popup) return;
    btn.addEventListener('click', e => {
        e.stopPropagation();
        AppState.calendarOpen = !AppState.calendarOpen;
        popup.classList.toggle('open', AppState.calendarOpen);
        btn.setAttribute('aria-expanded', AppState.calendarOpen);
        if (AppState.calendarOpen) renderCalendar();
    });
    prevBtn?.addEventListener('click', e => { e.stopPropagation(); AppState.calendarDate.setMonth(AppState.calendarDate.getMonth() - 1); renderCalendar(); });
    nextBtn?.addEventListener('click', e => { e.stopPropagation(); AppState.calendarDate.setMonth(AppState.calendarDate.getMonth() + 1); renderCalendar(); });
    document.addEventListener('click', e => {
        if (!popup.contains(e.target) && !btn.contains(e.target)) {
            AppState.calendarOpen = false; popup.classList.remove('open'); btn.setAttribute('aria-expanded', 'false');
        }
    });
    renderCalendar();
}

function renderCalendar() {
    const grid = document.getElementById('cal-grid'), monthYearEl = document.getElementById('cal-month-year'), todayLabel = document.getElementById('cal-today-label');
    if (!grid) return;
    const now = new Date(), d = AppState.calendarDate, year = d.getFullYear(), month = d.getMonth();
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    if (monthYearEl) monthYearEl.textContent = `${months[month]} ${year}`;
    if (todayLabel) todayLabel.textContent = `Today: ${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    const firstDay = new Date(year, month, 1).getDay(), daysInMonth = new Date(year, month + 1, 0).getDate(), daysInPrev = new Date(year, month, 0).getDate();
    grid.innerHTML = '';
    for (let i = firstDay - 1; i >= 0; i--) { const d2 = document.createElement('div'); d2.className = 'cal-day other-month'; d2.textContent = daysInPrev - i; grid.appendChild(d2); }
    for (let i = 1; i <= daysInMonth; i++) {
        const d2 = document.createElement('div');
        const isToday = i === now.getDate() && month === now.getMonth() && year === now.getFullYear();
        const dow = new Date(year, month, i).getDay();
        d2.className = 'cal-day' + (isToday ? ' today' : '') + (dow === 0 ? ' sunday' : '');
        d2.textContent = i; grid.appendChild(d2);
    }
    const remaining = 42 - grid.children.length;
    for (let i = 1; i <= remaining; i++) { const d2 = document.createElement('div'); d2.className = 'cal-day other-month'; d2.textContent = i; grid.appendChild(d2); }
}

// ── VOLUME ──
function initializeVolumeControl() {
    const slider = document.getElementById('vol-slider'), pct = document.getElementById('vol-pct');
    const muteCheck = document.getElementById('vol-mute'), volIcon = document.getElementById('vol-icon');
    if (!slider) return;
    slider.addEventListener('input', () => {
        const val = slider.value;
        if (pct) pct.textContent = `${val}%`;
        if (volIcon) { if (val == 0) volIcon.textContent = '🔇'; else if (val < 40) volIcon.textContent = '🔈'; else if (val < 70) volIcon.textContent = '🔉'; else volIcon.textContent = '🔊'; }
    });
    muteCheck?.addEventListener('change', () => { if (volIcon) volIcon.textContent = muteCheck.checked ? '🔇' : '🔊'; slider.disabled = muteCheck.checked; });
}

// ── RUN DIALOG ──
function initializeRunDialog() {
    const dialog = document.getElementById('run-dialog'), input = document.getElementById('run-input');
    const okBtn = document.getElementById('run-ok-btn'), cancelBtn = document.getElementById('run-cancel-btn');
    document.getElementById('start-run-btn')?.addEventListener('click', () => { closeStartMenu(); openRunDialog(); });
    okBtn?.addEventListener('click', () => {
        const cmd = input?.value.trim().toLowerCase(), target = RunCommands[cmd] || cmd;
        if (WindowConfig[target]) { closeRunDialog(); openWindow(target); }
        else { input.style.borderColor = '#cc0000'; setTimeout(() => { input.style.borderColor = ''; }, 1200); }
    });
    cancelBtn?.addEventListener('click', closeRunDialog);
    input?.addEventListener('keydown', e => { if (e.key === 'Enter') okBtn.click(); if (e.key === 'Escape') closeRunDialog(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && dialog?.classList.contains('active')) closeRunDialog(); });
}
function openRunDialog() { const d = document.getElementById('run-dialog'), i = document.getElementById('run-input'); if (!d) return; d.classList.add('active'); d.setAttribute('aria-hidden', 'false'); setTimeout(() => i?.focus(), 50); }
function closeRunDialog() { const d = document.getElementById('run-dialog'), i = document.getElementById('run-input'); if (!d) return; d.classList.remove('active'); d.setAttribute('aria-hidden', 'true'); if (i) i.value = ''; }

// ── TRAY ICONS ──
function initializeTrayIcons() {
    document.querySelectorAll('.tray-icon-wrap').forEach(w => w.addEventListener('click', e => e.stopPropagation()));
    document.getElementById('tray-hide-btn')?.addEventListener('click', e => { e.stopPropagation(); showBalloon('💡 All icons are visible', 'No hidden notification icons.'); });
}

// ── BALLOON ──
function showWelcomeBalloon() {
    setTimeout(() => { showBalloon('👋 Welcome to Portfolio XP!', 'Double-click desktop icons to open windows.\nType "xpdev" to unlock a secret!'); }, 1200);
}
function showBalloon(title, message) {
    document.getElementById('taskbar-balloon')?.remove();
    const balloon = document.createElement('div');
    balloon.id = 'taskbar-balloon';
    balloon.style.cssText = `position:fixed;bottom:calc(var(--taskbar-height) + 8px);right:12px;background:#ffffe1;border:1px solid #808080;box-shadow:2px 2px 6px rgba(0,0,0,0.35);padding:8px 28px 8px 10px;min-width:200px;max-width:280px;z-index:9998;font-family:Tahoma,sans-serif;font-size:11px;border-radius:4px;animation:balloonIn 0.25s ease-out;`;
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `position:absolute;top:3px;right:5px;background:none;border:none;font-size:14px;cursor:pointer;color:#555;line-height:1;padding:0;font-family:inherit;`;
    closeBtn.addEventListener('click', () => balloon.remove());
    const titleEl = document.createElement('div'); titleEl.style.cssText = 'font-weight:bold;margin-bottom:4px;color:#000;'; titleEl.textContent = title;
    const msgEl = document.createElement('div'); msgEl.style.cssText = 'color:#333;white-space:pre-line;'; msgEl.textContent = message;
    balloon.appendChild(closeBtn); balloon.appendChild(titleEl); balloon.appendChild(msgEl);
    document.body.appendChild(balloon);
    if (!document.getElementById('balloon-style')) {
        const s = document.createElement('style'); s.id = 'balloon-style';
        s.textContent = `@keyframes balloonIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`;
        document.head.appendChild(s);
    }
    setTimeout(() => balloon.remove(), 5000);
}

// ── DESKTOP ICONS ──
function initializeDesktopIcons() {
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.addEventListener('click', e => { e.stopPropagation(); selectIcon(icon); });
        icon.addEventListener('dblclick', e => { e.stopPropagation(); const w = icon.dataset.window; if (w) openWindow(w); });
        icon.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); const w = icon.dataset.window; if (w) openWindow(w); } });
        if (!AppState.isMobile) makeDraggable(icon);
    });
    document.getElementById('desktop')?.addEventListener('click', e => { if (e.target.id === 'desktop') deselectAllIcons(); });
}
function selectIcon(icon) { deselectAllIcons(); icon.classList.add('selected'); }
function deselectAllIcons() { document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected')); }
function makeDraggable(el) {
    let dragging = false, sx, sy, ix, iy;
    el.addEventListener('mousedown', e => {
        if (e.button !== 0) return;
        dragging = true; sx = e.clientX; sy = e.clientY; ix = el.offsetLeft; iy = el.offsetTop;
        el.classList.add('dragging');
        const mm = e2 => { if (!dragging) return; el.style.position = 'absolute'; el.style.left = `${ix + e2.clientX - sx}px`; el.style.top = `${iy + e2.clientY - sy}px`; };
        const mu = () => { dragging = false; el.classList.remove('dragging'); document.removeEventListener('mousemove', mm); document.removeEventListener('mouseup', mu); };
        document.addEventListener('mousemove', mm); document.addEventListener('mouseup', mu);
    });
}

// ── WINDOW MANAGEMENT ──
function initializeWindows() {
    document.querySelectorAll('.xp-window').forEach(win => {
        const id = win.dataset.windowId; if (!id) return;
        AppState.windows[id] = { element: win, minimized: false, maximized: false, closed: true };
        const bar = win.querySelector('.window-titlebar');
        if (bar && !AppState.isMobile) makeWindowDraggable(win, bar);
        win.querySelector('.window-btn.minimize')?.addEventListener('click', () => minimizeWindow(id));
        if (!AppState.isMobile) win.querySelector('.window-btn.maximize')?.addEventListener('click', () => toggleMaximizeWindow(id));
        win.querySelector('.window-btn.close')?.addEventListener('click', () => closeWindow(id));
        win.addEventListener('mousedown', () => focusWindow(id));
    });
}

function openWindow(id) {
    const el = document.getElementById(`window-${id}`), cfg = WindowConfig[id];
    if (!el || !cfg) return;
    const st = AppState.windows[id];
    if (st && !st.closed && !st.minimized) { focusWindow(id); return; }
    if (!AppState.isMobile) { el.style.width = `${cfg.width}px`; el.style.height = `${cfg.height}px`; el.style.left = `${cfg.x}px`; el.style.top = `${cfg.y}px`; }
    el.classList.add('active'); el.setAttribute('aria-hidden', 'false');
    if (st) { st.closed = false; st.minimized = false; }
    gsap.fromTo(el, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.2)' });
    focusWindow(id);
    addTaskbarTab(id, cfg);
    if (id === 'skills') setTimeout(animateSkillBars, 300);
    if (id === 'about') setTimeout(animateAboutPerfBars, 400);
}

function closeWindow(id) {
    const el = document.getElementById(`window-${id}`); if (!el) return;
    gsap.to(el, { scale: 0.9, opacity: 0, duration: 0.2, ease: 'power2.in', onComplete: () => {
        el.classList.remove('active', 'focused'); el.setAttribute('aria-hidden', 'true');
        if (AppState.windows[id]) { AppState.windows[id].closed = true; AppState.windows[id].minimized = false; }
    }});
    removeTaskbarTab(id);
}

function minimizeWindow(id) {
    const el = document.getElementById(`window-${id}`); if (!el) return;
    const tab = document.querySelector(`.taskbar-tab[data-window="${id}"]`);
    if (tab) {
        const tr = tab.getBoundingClientRect(), wr = el.getBoundingClientRect();
        gsap.to(el, { x: tr.left - wr.left + tr.width/2 - wr.width/2, y: window.innerHeight - wr.top - 30, scale: 0.1, opacity: 0, duration: 0.3, ease: 'power2.in',
            onComplete: () => { el.classList.add('minimized'); el.classList.remove('focused'); el.style.transform = ''; if (AppState.windows[id]) AppState.windows[id].minimized = true; updateTaskbarTab(id, false); }
        });
    }
}

function toggleMaximizeWindow(id) {
    const el = document.getElementById(`window-${id}`); if (!el || AppState.isMobile) return;
    const st = AppState.windows[id], cfg = WindowConfig[id];
    if (st && st.maximized) {
        gsap.to(el, { width: cfg.width, height: cfg.height, left: cfg.x, top: cfg.y, duration: 0.3, ease: 'power2.out' });
        el.classList.remove('maximized'); if (st) st.maximized = false;
    } else {
        gsap.to(el, { width: '100%', height: 'calc(100% - 34px)', left: 0, top: 0, duration: 0.3, ease: 'power2.out' });
        el.classList.add('maximized'); if (st) st.maximized = true;
    }
}

function focusWindow(id) {
    document.querySelectorAll('.xp-window').forEach(w => w.classList.remove('focused'));
    const el = document.getElementById(`window-${id}`); if (!el) return;
    el.classList.add('focused'); AppState.activeWindow = id;
    AppState.windowZIndex++; el.style.zIndex = AppState.windowZIndex;
    updateTaskbarTab(id, true);
}

function makeWindowDraggable(win, handle) {
    let drag = false, sx, sy, ix, iy;
    handle.addEventListener('mousedown', e => {
        if (e.target.closest('.window-controls') || win.classList.contains('maximized')) return;
        drag = true; sx = e.clientX; sy = e.clientY; ix = win.offsetLeft; iy = win.offsetTop;
        const mm = e2 => { if (!drag) return; win.style.left = `${ix + e2.clientX - sx}px`; win.style.top = `${iy + e2.clientY - sy}px`; };
        const mu = () => { drag = false; document.removeEventListener('mousemove', mm); document.removeEventListener('mouseup', mu); };
        document.addEventListener('mousemove', mm); document.addEventListener('mouseup', mu);
    });
}

// ── TASKBAR TABS ──
function addTaskbarTab(id, cfg) {
    removeTaskbarTab(id);
    const c = document.getElementById('taskbar-windows'); if (!c) return;
    const tab = document.createElement('button');
    tab.className = 'taskbar-tab'; tab.dataset.window = id;
    tab.innerHTML = `<img src="${cfg.icon}" alt=""><span>${cfg.title}</span>`;
    tab.addEventListener('click', () => {
        const st = AppState.windows[id]; if (!st) return;
        if (st.minimized || st.closed) restoreWindow(id);
        else if (AppState.activeWindow === id) minimizeWindow(id);
        else focusWindow(id);
    });
    c.appendChild(tab); updateTaskbarTab(id, true);
}
function removeTaskbarTab(id) { document.querySelector(`.taskbar-tab[data-window="${id}"]`)?.remove(); }
function updateTaskbarTab(id, active) { const tab = document.querySelector(`.taskbar-tab[data-window="${id}"]`); if (tab) tab.classList.toggle('active', active); }
function restoreWindow(id) {
    const el = document.getElementById(`window-${id}`); if (!el) return;
    if (AppState.windows[id]?.closed) { openWindow(id); return; }
    el.classList.remove('minimized'); if (AppState.windows[id]) AppState.windows[id].minimized = false;
    gsap.fromTo(el, { scale: 0.8, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.2)' });
    focusWindow(id);
}

// ── START MENU ──
function initializeStartMenu() {
    const btn = document.getElementById('start-button'), menu = document.getElementById('start-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', e => { e.stopPropagation(); toggleStartMenu(); });
    menu.querySelectorAll('.start-item[data-window]').forEach(item => { item.addEventListener('click', () => { openWindow(item.dataset.window); closeStartMenu(); }); });
    menu.querySelectorAll('.start-item-right[data-window]').forEach(item => { item.addEventListener('click', () => { openWindow(item.dataset.window); closeStartMenu(); }); });
    document.getElementById('start-logoff-btn')?.addEventListener('click', () => { closeStartMenu(); showBalloon('🔒 Log Off', 'Saving your session...\nPortfolio XP will remember you!'); });
    document.getElementById('start-help-btn')?.addEventListener('click', () => { closeStartMenu(); showBalloon('❓ Help & Support', 'Type "xpdev" anytime to unlock the secret Developer Console!\n\nDouble-click desktop icons to open windows.'); });
    document.addEventListener('click', e => { if (!menu.contains(e.target) && !btn.contains(e.target)) closeStartMenu(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && AppState.startMenuOpen) closeStartMenu(); });
}
function toggleStartMenu() { AppState.startMenuOpen ? closeStartMenu() : openStartMenu(); }
function openStartMenu() {
    const menu = document.getElementById('start-menu'), btn = document.getElementById('start-button');
    if (!menu || !btn) return;
    menu.classList.add('active'); menu.setAttribute('aria-hidden', 'false');
    btn.classList.add('active'); btn.setAttribute('aria-expanded', 'true');
    AppState.startMenuOpen = true;
    gsap.fromTo(menu, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' });
}
function closeStartMenu() {
    const menu = document.getElementById('start-menu'), btn = document.getElementById('start-button');
    if (!menu || !btn) return;
    gsap.to(menu, { y: 20, opacity: 0, duration: 0.15, ease: 'power2.in', onComplete: () => { menu.classList.remove('active'); menu.setAttribute('aria-hidden', 'true'); } });
    btn.classList.remove('active'); btn.setAttribute('aria-expanded', 'false');
    AppState.startMenuOpen = false;
}

// ── MY COMPUTER ──
function mcToggleSection(id) { document.getElementById(id)?.classList.toggle('mc-collapsed'); }
function initializeMyComputerIcons() {
    document.querySelectorAll('.mycomp-file-icon').forEach(icon => {
        icon.addEventListener('click', () => { document.querySelectorAll('.mycomp-file-icon').forEach(i => i.classList.remove('mc-selected')); icon.classList.add('mc-selected'); });
    });
}

// ── ABOUT TABS ──
function initializeAboutTabs() {
    document.querySelectorAll('.about-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            document.querySelectorAll('.about-tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
            document.querySelectorAll('.about-panel').forEach(p => p.classList.remove('active'));
            tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
            const panel = document.getElementById(`tab-${target}`); if (panel) panel.classList.add('active');
            if (target === 'advanced') setTimeout(animateAboutPerfBars, 100);
        });
    });
}
function animateAboutPerfBars() {
    document.querySelectorAll('.about-perf-fill').forEach(bar => { const pct = bar.dataset.perf; if (pct) gsap.fromTo(bar, { width: '0%' }, { width: `${pct}%`, duration: 1, ease: 'power2.out' }); });
}

// ══════════════════════════════════════════════
// PROJECTS WINDOW — COMPLETE LOGIC
// ══════════════════════════════════════════════
function initializeProjectsWindow() {
    initProjToolbar();
    initProjSearch();
    initProjCategoryFilter();
    initProjFileIcons();
    initProjDetailWindow();
    updateProjStatusBar();
}

/* ── Toolbar buttons ── */
function initProjToolbar() {
    // View toggle buttons
    document.querySelectorAll('.proj-view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            setProjView(view);
        });
    });

    // Back button (navigate back to My Computer concept)
    document.getElementById('proj-back-btn')?.addEventListener('click', () => {
        openWindow('mycomputer');
    });

    // Search button
    document.getElementById('proj-search-btn')?.addEventListener('click', () => {
        toggleProjSearch();
    });

    // Folders / sidebar toggle
    document.getElementById('proj-folders-btn')?.addEventListener('click', () => {
        toggleProjFolders();
    });
}

function setProjView(view) {
    AppState.projCurrentView = view;
    const grid = document.getElementById('proj-files-grid');
    if (!grid) return;

    // Update toolbar button states
    document.querySelectorAll('.proj-view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === view));

    // Remove old view classes
    grid.classList.remove('view-list', 'view-details');

    if (view === 'list') {
        grid.classList.add('view-list');
    } else if (view === 'details') {
        grid.classList.add('view-details');
        injectDetailsViewHeaders();
    }
    // icons view is the default (no extra class needed)

    // Update address bar
    const addrText = document.getElementById('proj-addr-text');
    if (addrText) addrText.textContent = 'My Documents\\Projects';
}

function injectDetailsViewHeaders() {
    const grid = document.getElementById('proj-files-grid');
    if (!grid || grid.querySelector('.proj-detail-header')) return;
    const header = document.createElement('div');
    header.className = 'proj-detail-header';
    header.innerHTML = `<span>Name</span><span>Type</span><span>Technologies</span><span>Category</span>`;
    grid.insertBefore(header, grid.firstChild);
    // Inject extra cells into each file
    grid.querySelectorAll('.proj-file').forEach(file => {
        const pid = file.dataset.project;
        const p = ProjectData[pid];
        if (!p || file.querySelector('.proj-file-type')) return;
        ['proj-file-type','proj-file-tech','proj-file-cat'].forEach((cls, i) => {
            const cell = document.createElement('div');
            cell.className = cls;
            if (i === 0) cell.textContent = p.type || 'File Folder';
            if (i === 1) cell.textContent = p.tech.slice(0,2).join(', ');
            if (i === 2) cell.textContent = p.category.charAt(0).toUpperCase() + p.category.slice(1);
            file.appendChild(cell);
        });
    });
}

function toggleProjSearch() {
    const bar = document.getElementById('proj-search-bar');
    const input = document.getElementById('proj-search-input');
    if (!bar) return;
    AppState.projSearchActive = !AppState.projSearchActive;
    bar.style.display = AppState.projSearchActive ? 'flex' : 'none';
    if (AppState.projSearchActive) {
        setTimeout(() => input?.focus(), 50);
    } else {
        if (input) input.value = '';
        filterProjFiles('', AppState.projCurrentFilter);
    }
}

function toggleProjFolders() {
    const panel = document.getElementById('proj-left-panel');
    if (!panel) return;
    AppState.projFoldersVisible = !AppState.projFoldersVisible;
    panel.classList.toggle('hidden', !AppState.projFoldersVisible);
    const btn = document.getElementById('proj-folders-btn');
    if (btn) btn.classList.toggle('active', AppState.projFoldersVisible);
}

/* ── Search ── */
function initProjSearch() {
    const input = document.getElementById('proj-search-input');
    const clearBtn = document.getElementById('proj-search-clear');
    input?.addEventListener('input', () => {
        filterProjFiles(input.value.trim().toLowerCase(), AppState.projCurrentFilter);
    });
    clearBtn?.addEventListener('click', () => {
        if (input) { input.value = ''; input.focus(); }
        filterProjFiles('', AppState.projCurrentFilter);
    });
}

/* ── Category filter ── */
function initProjCategoryFilter() {
    document.querySelectorAll('.proj-cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.proj-cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            AppState.projCurrentFilter = btn.dataset.filter;
            const searchVal = document.getElementById('proj-search-input')?.value.trim().toLowerCase() || '';
            filterProjFiles(searchVal, AppState.projCurrentFilter);
        });
    });
}

function filterProjFiles(searchQuery, filter) {
    const files = document.querySelectorAll('.proj-file');
    let visibleCount = 0;

    files.forEach(file => {
        const pid = file.dataset.project;
        const fileFilter = file.dataset.filter;
        const p = ProjectData[pid];
        if (!p) return;

        const matchFilter = filter === 'all' || fileFilter === filter;
        const matchSearch = !searchQuery ||
            p.name.toLowerCase().includes(searchQuery) ||
            p.fullName.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery) ||
            p.tech.some(t => t.toLowerCase().includes(searchQuery)) ||
            p.category.toLowerCase().includes(searchQuery);

        const visible = matchFilter && matchSearch;
        file.classList.toggle('hidden-by-filter', !visible);
        if (visible) visibleCount++;
    });

    // Show/hide empty state
    const emptyState = document.getElementById('proj-empty-state');
    if (emptyState) emptyState.style.display = visibleCount === 0 ? 'flex' : 'none';

    // Update status bar
    const statusCount = document.getElementById('proj-status-count');
    if (statusCount) statusCount.textContent = `${visibleCount} object${visibleCount !== 1 ? 's' : ''}`;

    // Clear selection if it's now hidden
    if (AppState.projSelectedId) {
        const sel = document.querySelector(`.proj-file[data-project="${AppState.projSelectedId}"]`);
        if (sel?.classList.contains('hidden-by-filter')) {
            AppState.projSelectedId = null;
            resetProjDetails();
        }
    }
}

/* ── File Icons (click + double-click) ── */
function initProjFileIcons() {
    document.querySelectorAll('.proj-file').forEach(file => {
        let clickTimer = null;
        const pid = file.dataset.project;

        // Single click: select + show details
        file.addEventListener('click', e => {
            e.stopPropagation();
            selectProjFile(file, pid);

            // Double-click via timer
            if (clickTimer) {
                clearTimeout(clickTimer);
                clickTimer = null;
                openProjDetail(pid);
            } else {
                clickTimer = setTimeout(() => { clickTimer = null; }, 300);
            }
        });

        // Keyboard: Enter to open, Space to select
        file.addEventListener('keydown', e => {
            if (e.key === 'Enter') { selectProjFile(file, pid); openProjDetail(pid); }
            if (e.key === ' ') { e.preventDefault(); selectProjFile(file, pid); }
        });
    });

    // Deselect on background click
    document.getElementById('proj-file-area')?.addEventListener('click', e => {
        if (e.target.id === 'proj-file-area' || e.target.id === 'proj-files-grid') {
            deselectAllProjFiles();
        }
    });
}

function selectProjFile(fileEl, pid) {
    deselectAllProjFiles();
    fileEl.classList.add('selected');
    AppState.projSelectedId = pid;
    updateProjDetails(pid);
    updateProjStatusBar(pid);
}

function deselectAllProjFiles() {
    document.querySelectorAll('.proj-file').forEach(f => f.classList.remove('selected'));
    AppState.projSelectedId = null;
    resetProjDetails();
    updateProjStatusBar(null);
}

function updateProjDetails(pid) {
    const p = ProjectData[pid]; if (!p) return;
    const icon = document.getElementById('proj-details-icon');
    const name = document.getElementById('proj-details-name');
    const meta = document.getElementById('proj-details-meta');
    const desc = document.getElementById('proj-details-desc');
    if (icon) icon.textContent = p.icon || '📁';
    if (name) name.textContent = p.fullName;
    if (meta) meta.innerHTML = `
        <div class="proj-details-row"><span>Type:</span><span>${p.type}</span></div>
        <div class="proj-details-row"><span>Year:</span><span>${p.year}</span></div>
        <div class="proj-details-row"><span>Status:</span><span>${p.status}</span></div>
        <div class="proj-details-row"><span>Tags:</span><span>${p.tech.length}</span></div>
    `;
    if (desc) desc.textContent = p.description.substring(0, 80) + '…';
}

function resetProjDetails() {
    const icon = document.getElementById('proj-details-icon');
    const name = document.getElementById('proj-details-name');
    const meta = document.getElementById('proj-details-meta');
    const desc = document.getElementById('proj-details-desc');
    if (icon) icon.textContent = '📁';
    if (name) name.textContent = 'Projects';
    if (meta) meta.innerHTML = `<div class="proj-details-row"><span>Type:</span><span>File Folder</span></div><div class="proj-details-row"><span>Items:</span><span>6 projects</span></div>`;
    if (desc) desc.textContent = 'Select a project to view details';
}

function updateProjStatusBar(pid) {
    const statusSel = document.getElementById('proj-status-sel');
    if (!statusSel) return;
    if (pid && ProjectData[pid]) {
        statusSel.textContent = ProjectData[pid].fullName + ' selected';
    } else {
        statusSel.textContent = 'No item selected';
    }
    // Update total count
    const visibleFiles = document.querySelectorAll('.proj-file:not(.hidden-by-filter)');
    const statusCount = document.getElementById('proj-status-count');
    if (statusCount) statusCount.textContent = `${visibleFiles.length} object${visibleFiles.length !== 1 ? 's' : ''}`;
}

/* ── Project Detail Window ── */
function initProjDetailWindow() {
    document.getElementById('projdetail-ok-btn')?.addEventListener('click', () => closeWindow('projdetail'));
    document.getElementById('projdetail-close-btn')?.addEventListener('click', () => closeWindow('projdetail'));
}

function openProjDetail(pid) {
    const p = ProjectData[pid]; if (!p) return;

    // Populate detail window
    const titleEl = document.getElementById('projdetail-title');
    const folderName = document.getElementById('projdetail-folder-name');
    const tagsEl = document.getElementById('projdetail-tags');
    const descEl = document.getElementById('projdetail-desc');
    const techGrid = document.getElementById('projdetail-tech-grid');
    const propsTable = document.getElementById('projdetail-props-table');

    if (titleEl) titleEl.textContent = p.fullName + ' — Properties';
    if (folderName) folderName.textContent = p.fullName;

    // Tags
    if (tagsEl) {
        tagsEl.innerHTML = p.tech.map(t => `<span class="projdetail-tag">${t}</span>`).join('');
    }

    // Description
    if (descEl) descEl.textContent = p.description;

    // Tech chips
    if (techGrid) {
        techGrid.innerHTML = p.tech.map(t => `<span class="projdetail-tech-chip">${t}</span>`).join('');
    }

    // Props table
    if (propsTable) {
        const tbody = propsTable.querySelector('tbody');
        if (tbody) tbody.innerHTML = `
            <tr><td>Type</td><td>${p.type}</td></tr>
            <tr><td>Category</td><td>${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</td></tr>
            <tr><td>Status</td><td>${p.status}</td></tr>
            <tr><td>Year</td><td>${p.year}</td></tr>
            <tr><td>Technologies</td><td>${p.tech.join(', ')}</td></tr>
        `;
    }

    // Offset from projects window
    const cfg = WindowConfig['projdetail'];
    const projWin = document.getElementById('window-projects');
    if (projWin && !AppState.isMobile) {
        const projLeft = parseInt(projWin.style.left) || cfg.x;
        const projTop = parseInt(projWin.style.top) || cfg.y;
        WindowConfig['projdetail'].x = projLeft + 40;
        WindowConfig['projdetail'].y = projTop + 40;
    }

    openWindow('projdetail');
}

/* ── Helper: toggle left panel task sections ── */
function projToggleSection(id) {
    document.getElementById(id)?.classList.toggle('proj-collapsed');
}

/* ── New Folder helper (cosmetic) ── */
function projNewFolder() {
    showBalloon('📁 New Folder', 'New folder created!\n(Coming soon in Portfolio v2.0)');
}

// ── EASTER EGG ──
function initializeEasterEgg() {
    document.addEventListener('keydown', e => {
        AppState.easterEggSequence += e.key.toLowerCase();
        if (AppState.easterEggSequence.length > 5) AppState.easterEggSequence = AppState.easterEggSequence.slice(-5);
        if (AppState.easterEggSequence === 'xpdev') {
            AppState.easterEggSequence = '';
            openWindow('devconsole');
            showBalloon('🎉 Easter Egg Unlocked!', 'Developer Console activated.\nWelcome, System Architect!');
        }
    });
}

// ── CONTACT FORM ──
function initializeContactForm() {
    const form = document.getElementById('contact-form'); if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        if (!data.name || !data.email || !data.message) { alert('Please fill in all required fields.'); return; }
        const btn = form.querySelector('button[type="submit"]'), orig = btn.textContent;
        btn.textContent = 'Sending...'; btn.disabled = true;
        setTimeout(() => {
            alert('Message sent successfully! I will get back to you soon.');
            showBalloon('📧 Message Sent!', `Thank you, ${data.name}! I'll get back to you soon.`);
            form.reset(); btn.textContent = orig; btn.disabled = false;
        }, 1500);
    });
}

// ── SHUTDOWN ──
function initializeShutdown() { document.getElementById('shutdown-btn')?.addEventListener('click', () => { closeStartMenu(); triggerShutdown(); }); }
function triggerShutdown() {
    const s = document.getElementById('shutdown-screen'); if (!s) return;
    document.querySelectorAll('.xp-window').forEach(w => w.classList.remove('active', 'focused'));
    s.classList.add('active');
    setTimeout(() => {
        s.innerHTML = `<div class="shutdown-message"><p style="font-size:24px;margin-bottom:20px;">It is now safe to turn off your computer.</p><p style="font-size:14px;color:#aaa;">Thank you for visiting Arjumand Ali's portfolio.</p><button onclick="location.reload()" style="margin-top:30px;padding:10px 20px;font-size:14px;cursor:pointer;font-family:Tahoma,sans-serif;">Restart System</button></div>`;
    }, 4000);
}

// ── SKILL BARS ──
function animateSkillBars() {
    document.querySelectorAll('.skill-bar').forEach(bar => { const lvl = bar.dataset.level; if (lvl) gsap.fromTo(bar, { width: '0%' }, { width: `${lvl}%`, duration: 0.8, ease: 'power2.out' }); });
}

// ── RESUME DOWNLOAD ──
document.addEventListener('click', e => {
    if (e.target.id === 'download-resume' || e.target.closest('#download-resume')) {
        e.preventDefault();
        const txt = `ARJUMAND ALI\nFrontend Developer & Theming Engineer\n\nCONTACT\nLocation: Pakistan\nEmail: arjumand@example.com\nLinkedIn: linkedin.com/in/arjumandali\nGitHub: github.com/arjumandali\n\nSUMMARY\nA frontend developer with a passion for clean, structured code and disciplined design principles.\n\nSKILLS\n- HTML5 (Expert)\n- CSS3 (Expert)\n- JavaScript (Intermediate)\n- Tailwind CSS (Learning)\n- Next.js (Learning)\n- PHP (Learning)\n- Windows Optimization (Advanced)\n- Structured UI Design (Expert)\n\nEXPERIENCE\nFrontend Developer | Freelance | 2023 - Present\nUI/Theming Engineer | Self-Directed | 2022 - 2023\nSystem Optimization Specialist | 2020 - 2022\n\nTRAITS\n- Structural Thinker\n- Disciplined Approach\n- Leadership Mindset\n- No Chaos Policy\n`;
        const blob = new Blob([txt], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'Arjumand_Ali_Resume.txt';
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        showBalloon('💾 Download Started', 'Arjumand_Ali_Resume.txt is being saved!');
    }
});

// ── RECYCLE BIN ──
document.addEventListener('click', e => { if (e.target.closest('.recycle-bin')) { showBalloon('🗑️ Recycle Bin', 'Recycle Bin is empty.\n(No chaos allowed!)'); } });

// ── RESIZE ──
window.addEventListener('resize', () => { AppState.isMobile = window.innerWidth <= 768; });

// ── CONSOLE SIGNATURE ──
console.log('%c Windows XP Portfolio ', 'background:#0054E3;color:#fff;font-size:20px;font-weight:bold;padding:10px;');
console.log('%c Arjumand Ali — Frontend Developer & Theming Engineer ', 'color:#3A9E3A;font-size:14px;');
console.log('%c Type "xpdev" to unlock the developer console! ', 'color:#FDB813;font-size:12px;');