const APP_CONFIG = {
  org: 'BlackRoad-OS',
  title: 'RoadCode',
  mode: 'upstream-operator',
  stance: 'Upstream',
  summary:
    'The messy operator war room for BlackRoad. Railway, Vercel, Cloudflare, Tailscale, Ollama, oceans, Pis, IoT, and org automation get stitched together here first, then promoted forward.',
  links: [
    { label: 'GitHub Pages', href: 'https://blackroad-os.github.io/RoadCode/' },
    { label: 'Cloudflare Pages', href: 'https://blackroad-os-roadcode.pages.dev' },
    { label: 'GitHub Repo', href: 'https://github.com/BlackRoad-OS/RoadCode' },
  ],
  roots: [
    'Upstream operator: BlackRoad-OS/RoadCode',
    'Production operator: BlackRoad-OS-Inc/RoadCode',
    'Canonical source: BlackRoad-OS-Inc/source',
  ],
  providerStatus: {
    ok: ['railway', 'vercel', 'wrangler', 'digitalocean', 'tailscale', 'ollama'],
    needsAttention: [],
  },
  fleetStatus: {
    reachable: ['alice', 'aria', 'lucidia', 'anastasia', 'cecilia', 'octavia', 'gematria', 'blackroad'],
    needsAttention: ['cadence', 'codex-infinity', 'shellfish'],
  },
}

async function loadRegistry() {
  const response = await fetch('../infra/platform-registry.json')
  if (!response.ok) throw new Error('Unable to load platform registry')
  return response.json()
}

function card(title, body) {
  return `<section class="card"><h3>${title}</h3>${body}</section>`
}

function pills(items, className) {
  return items.map((item) => `<span class="pill ${className}">${item}</span>`).join('')
}

function render(registry) {
  const root = document.getElementById('app')
  const platformRows = registry.platforms
    .map(
      (platform) => `
        <div class="stack-item">
          <strong>${platform.name}</strong>
          <span>${platform.purpose}</span>
        </div>
      `
    )
    .join('')

  root.innerHTML = `
    <main class="shell">
      <span class="eyebrow">${APP_CONFIG.org}</span>
      <section class="hero">
        <div>
          <h1>${APP_CONFIG.title}</h1>
          <p>${APP_CONFIG.summary}</p>
          <div class="link-row">
            ${APP_CONFIG.links.map((link) => `<a class="mini-label" href="${link.href}">${link.label}</a>`).join('')}
          </div>
        </div>
        <aside class="panel hero-panel">
          <h2>Operator Stance</h2>
          <div class="metric">${APP_CONFIG.stance}</div>
          <p class="muted">Mode: <strong>${APP_CONFIG.mode}</strong></p>
          <ul>
            ${APP_CONFIG.roots.map((entry) => `<li>${entry}</li>`).join('')}
          </ul>
        </aside>
      </section>

      <div class="section-title">Platform Stack</div>
      <section class="panel">
        ${platformRows}
      </section>

      <div class="section-title">Fleet Reality</div>
      <section class="grid">
        ${card(
          'Reachable Nodes',
          `<div class="fleet-list">${pills(APP_CONFIG.fleetStatus.reachable, 'ok')}</div>`
        )}
        ${card(
          'Needs Attention',
          `<div class="fleet-list">${pills(APP_CONFIG.fleetStatus.needsAttention, 'warn')}</div>`
        )}
        ${card(
          'LAN Compute',
          `<ul>${registry.fleet.lan_compute_nodes.map((node) => `<li>${node}</li>`).join('')}</ul>`
        )}
        ${card(
          'Tailscale Mesh',
          `<ul>${registry.fleet.tailscale_nodes.map((node) => `<li>${node}</li>`).join('')}</ul>`
        )}
      </section>

      <div class="section-title">Provider Health</div>
      <section class="grid">
        ${card(
          'Providers OK',
          `<div class="fleet-list">${pills(APP_CONFIG.providerStatus.ok, 'ok')}</div>`
        )}
        ${card(
          'Operator Files',
          `
            <ul>
              <li><a href="../PLATFORM_STACK.md">PLATFORM_STACK.md</a></li>
              <li><a href="../infra/platform-registry.json">infra/platform-registry.json</a></li>
              <li><code>bash scripts/platform-health.sh</code></li>
            </ul>
          `
        )}
      </section>

      <p class="footer-note">
        Dynamic app shell rendered from JavaScript and the platform registry instead of a hand-authored static content page.
      </p>
    </main>
  `
}

loadRegistry().then(render).catch((error) => {
  document.getElementById('app').innerHTML = `
    <main class="shell">
      <span class="eyebrow">${APP_CONFIG.org}</span>
      <section class="panel">
        <h2>RoadCode</h2>
        <p class="muted">${error.message}</p>
      </section>
    </main>
  `
})
