(function () {
  const storageKey = 'lemonmedia-sales-access-v1';
  const passwordHash = '0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c';
  const form = document.querySelector('[data-sales-access-form]');
  const gate = document.querySelector('[data-sales-access]');
  const input = form?.querySelector('input[name="password"]');
  const button = form?.querySelector('button[type="submit"]');
  const error = document.querySelector('[data-sales-access-error]');
  let applicationLoaded = false;

  function reportGateHeight() {
    if (window.parent === window) return;
    const height = Math.ceil(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
    window.parent.postMessage({ type: 'lemonmedia:sales-height', height }, '*');
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.append(script);
    });
  }

  async function openShowcase() {
    if (applicationLoaded) return;
    applicationLoaded = true;
    document.body.dataset.salesAuthorized = 'true';
    gate.hidden = true;
    try {
      await loadScript('assets/design/examples-sales-data.js?v=6');
      await loadScript('assets/design/examples-sales-study.js?v=10');
    } catch {
      applicationLoaded = false;
      document.body.dataset.salesAuthorized = 'false';
      gate.hidden = false;
      error.textContent = 'Страница не загрузилась. Обновите ее и попробуйте еще раз.';
    }
  }

  async function digest(value) {
    const bytes = new TextEncoder().encode(value);
    const hash = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  if (sessionStorage.getItem(storageKey) === passwordHash) {
    openShowcase();
  } else {
    requestAnimationFrame(reportGateHeight);
    if (new URLSearchParams(window.location.search).get('embed') !== 'tilda') input?.focus();
  }

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    error.textContent = '';
    button.disabled = true;
    const candidate = await digest(input.value.trim());
    button.disabled = false;

    if (candidate !== passwordHash) {
      input.value = '';
      input.setAttribute('aria-invalid', 'true');
      error.textContent = 'Неверный пароль. Попробуйте еще раз.';
      input.focus();
      return;
    }

    input.removeAttribute('aria-invalid');
    sessionStorage.setItem(storageKey, passwordHash);
    await openShowcase();
  });

  window.addEventListener('resize', reportGateHeight);
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'lemonmedia:measure-sales') reportGateHeight();
  });
})();
