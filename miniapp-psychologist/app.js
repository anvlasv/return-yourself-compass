(function() {
  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

  function getUserKey() {
    const userId = tg && tg.initDataUnsafe && tg.initDataUnsafe.user ? String(tg.initDataUnsafe.user.id) : 'guest';
    return `mindcare:${userId}`;
  }

  function readData() {
    try {
      const raw = localStorage.getItem(getUserKey());
      return raw ? JSON.parse(raw) : { checkins: [], journal: [], tasks: [] };
    } catch (e) {
      return { checkins: [], journal: [], tasks: [] };
    }
  }

  function writeData(data) {
    localStorage.setItem(getUserKey(), JSON.stringify(data));
  }

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const screens = {
    home: $('#screen-home'),
    checkin: $('#screen-checkin'),
    exercises: $('#screen-exercises'),
    journal: $('#screen-journal'),
    homework: $('#screen-homework'),
    sos: $('#screen-sos'),
    profile: $('#screen-profile'),
  };

  function showScreen(key) {
    Object.values(screens).forEach(node => node.classList.remove('visible'));
    const target = screens[key] || screens.home;
    target.classList.add('visible');

    if (tg) {
      if (key === 'home') {
        tg.BackButton.hide();
      } else {
        tg.BackButton.show();
      }
    }
  }

  function applyThemeFromTelegram() {
    if (!tg) return;
    const p = tg.themeParams || {};
    const vars = new Map([
      ['--bg', p.bg_color],
      ['--text', p.text_color],
      ['--muted', p.hint_color],
      ['--card', p.secondary_bg_color],
      ['--stroke', p.section_separator_color],
      ['--button', p.button_color],
      ['--buttonText', p.button_text_color],
    ]);
    vars.forEach((val, key) => {
      if (val) document.documentElement.style.setProperty(key, val);
    });
    const themeColor = p.bg_color || getComputedStyle(document.documentElement).getPropertyValue('--bg');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', themeColor.trim());
  }

  function initTelegram() {
    if (!tg) return;
    try {
      tg.ready();
      tg.expand();
      applyThemeFromTelegram();
      tg.onEvent('themeChanged', applyThemeFromTelegram);

      tg.onEvent('backButtonClicked', () => {
        showScreen('home');
      });
    } catch (_) {
      // no-op
    }
  }

  // Navigation from home cards
  $$('.card[data-target]').forEach(btn => {
    btn.addEventListener('click', () => showScreen(btn.dataset.target));
  });

  // Preview modal
  const modal = $('#preview-modal');
  $('#btn-preview')?.addEventListener('click', () => modal.classList.add('visible'));
  $$('[data-close]', modal).forEach(el => el.addEventListener('click', () => modal.classList.remove('visible')));

  // Check-in logic
  const moodRange = $('#mood-range');
  const moodLabel = $('#mood-label');
  const moodEmoji = $('#mood-emoji');
  const feelings = $('#feelings');
  const moodNote = $('#mood-note');
  const saveCheckin = $('#save-checkin');
  const history = $('#history');

  const FACE = ['😖','😣','😕','😟','🙁','🙂','😊','😁','🤩','🦄'];
  function moodToEmoji(v) { return FACE[Math.min(FACE.length - 1, Math.max(0, v - 1))]; }

  function updateMoodUI() {
    const v = parseInt(moodRange.value, 10);
    moodLabel.textContent = `${v} / 10`;
    moodEmoji.textContent = moodToEmoji(v);
  }
  moodRange?.addEventListener('input', updateMoodUI);
  updateMoodUI();

  feelings?.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    btn.classList.toggle('active');
  });

  function renderHistory() {
    const data = readData();
    const last7 = data.checkins.slice(-7);
    history.innerHTML = '';
    const days = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
    // pad if less than 7
    for (let i = 0; i < 7 - last7.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.textContent = '–';
      history.appendChild(dot);
    }
    last7.forEach((c) => {
      const date = new Date(c.date);
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.title = `${c.value}/10 — ${c.tags.join(', ')} ${c.note ? '— ' + c.note : ''}`;
      dot.textContent = days[date.getDay() === 0 ? 6 : date.getDay() - 1];
      dot.style.background = `linear-gradient(180deg, rgba(124,156,255,${c.value/10}), rgba(109,227,194,${c.value/10}))`;
      history.appendChild(dot);
    });
  }

  saveCheckin?.addEventListener('click', () => {
    const data = readData();
    const selected = $$('.tags button.active', feelings).map(b => b.dataset.tag);
    const entry = {
      date: new Date().toISOString(),
      value: parseInt(moodRange.value, 10),
      tags: selected,
      note: moodNote.value.trim(),
    };
    data.checkins.push(entry);
    writeData(data);
    moodNote.value = '';
    $$('.tags button', feelings).forEach(b => b.classList.remove('active'));
    renderHistory();
    if (tg) tg.HapticFeedback?.notificationOccurred('success');
  });

  // Exercises: breathing 4-7-8
  let breathTimer = null;
  const breathToggle = $('#breath-toggle');
  const breathPhase = $('#breath-phase');
  const breathCount = $('#breath-count');

  function stopBreathing() {
    if (breathTimer) clearInterval(breathTimer);
    breathTimer = null;
    breathToggle.textContent = 'Старт';
    breathPhase.textContent = 'Вдох';
    breathCount.textContent = '4';
  }
  function startBreathing() {
    let phase = 'in';
    let counter = 4;
    breathToggle.textContent = 'Стоп';
    breathPhase.textContent = 'Вдох';
    breathCount.textContent = String(counter);

    if (tg) tg.HapticFeedback?.impactOccurred('soft');

    breathTimer = setInterval(() => {
      counter -= 1;
      if (counter >= 0) {
        breathCount.textContent = String(counter);
        return;
      }
      // switch phase
      if (phase === 'in') {
        phase = 'hold';
        counter = 7;
        breathPhase.textContent = 'Задержка';
      } else if (phase === 'hold') {
        phase = 'out';
        counter = 8;
        breathPhase.textContent = 'Выдох';
      } else {
        phase = 'in';
        counter = 4;
        breathPhase.textContent = 'Вдох';
      }
      breathCount.textContent = String(counter);
      if (tg) tg.HapticFeedback?.impactOccurred('rigid');
    }, 1000);
  }

  breathToggle?.addEventListener('click', () => {
    if (breathTimer) stopBreathing(); else startBreathing();
  });

  // Journal
  const journalText = $('#journal-text');
  const saveJournal = $('#save-journal');
  const journalList = $('#journal-list');
  const promptSel = $('#prompt');

  function renderJournal() {
    const data = readData();
    journalList.innerHTML = '';
    data.journal.slice().reverse().forEach(it => {
      const node = document.createElement('div');
      node.className = 'entry';
      const date = new Date(it.date);
      node.innerHTML = `
        <div class="meta">${date.toLocaleString()} — ${it.prompt}</div>
        <div class="text">${escapeHtml(it.text)}</div>
      `;
      journalList.appendChild(node);
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  saveJournal?.addEventListener('click', () => {
    const txt = journalText.value.trim();
    if (!txt) return;
    const data = readData();
    data.journal.push({ date: new Date().toISOString(), text: txt, prompt: promptSel.value });
    writeData(data);
    journalText.value = '';
    renderJournal();
    if (tg) tg.HapticFeedback?.notificationOccurred('success');
  });

  // Tasks
  const taskInput = $('#task-input');
  const taskAdd = $('#task-add');
  const tasksRoot = $('#tasks');

  function renderTasks() {
    const data = readData();
    tasksRoot.innerHTML = '';
    data.tasks.forEach((t, idx) => {
      const node = document.createElement('div');
      node.className = 'task';
      node.innerHTML = `
        <input type="checkbox" ${t.done ? 'checked' : ''} />
        <div class="title ${t.done ? 'done' : ''}">${escapeHtml(t.title)}</div>
        <button class="btn ghost danger">✕</button>
      `;
      const [checkbox, , delBtn] = node.children;
      checkbox.addEventListener('change', () => {
        const data = readData();
        data.tasks[idx].done = checkbox.checked;
        writeData(data);
        renderTasks();
      });
      delBtn.addEventListener('click', () => {
        const data = readData();
        data.tasks.splice(idx, 1);
        writeData(data);
        renderTasks();
      });
      tasksRoot.appendChild(node);
    });
  }

  taskAdd?.addEventListener('click', () => {
    const title = taskInput.value.trim();
    if (!title) return;
    const data = readData();
    data.tasks.push({ title, done: false });
    writeData(data);
    taskInput.value = '';
    renderTasks();
  });

  // SOS actions
  $('#sos-breathe')?.addEventListener('click', () => {
    showScreen('exercises');
    if (!breathTimer) startBreathing();
  });
  $('#sos-ground')?.addEventListener('click', () => showScreen('exercises'));
  $('#sos-note')?.addEventListener('click', () => showScreen('journal'));
  $('#contact-psych')?.addEventListener('click', () => {
    if (tg) {
      tg.openTelegramLink?.('https://t.me/share/url?url=&text=Здравствуйте!');
    }
  });

  // Profile
  $('#book-session')?.addEventListener('click', () => {
    const url = 'https://cal.com/your-psych';
    if (tg) tg.openLink(url, { try_instant_view: true }); else window.open(url, '_blank');
  });
  $('#open-website')?.addEventListener('click', () => {
    const url = 'https://example.com/psychologist';
    if (tg) tg.openLink(url, { try_instant_view: true }); else window.open(url, '_blank');
  });

  // Init
  initTelegram();
  renderHistory();
  renderJournal();
  renderTasks();

  // Expose for debug
  window.__mindcare = { showScreen };
})();