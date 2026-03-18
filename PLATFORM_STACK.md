# BlackRoad-OS Platform Stack

This repo is the upstream operator control surface for the BlackRoad stack.

## Provider Domains

- GitHub: org federation, workflows, source control
- Gitea: mirror and parallel RoadCode git surface
- Vercel: app deploy surface
- Cloudflare: DNS, Workers, Pages, edge
- Railway: service deploy surface
- DigitalOcean: ocean compute and droplets
- Tailscale: fleet reachability and private SSH
- Ollama: local and edge inference runtime

## Fleet Signals

- Reachable over SSH: `alice`, `aria`, `lucidia`, `anastasia`, `cecilia`, `octavia`, `gematria`, `blackroad`
- Alias still missing: `cadence`
- Known offline or stale Tailscale nodes seen recently: `codex-infinity`, `shellfish`
- Likely LAN compute nodes: `192.168.4.38`, `192.168.4.49`, `192.168.4.96`, `192.168.4.98`, `192.168.4.101`

## Local Operator Command

Run:

```bash
bash scripts/platform-health.sh
```

It writes:

- `artifacts/platform-health/latest/summary.json`
- `artifacts/platform-health/latest/SUMMARY.md`

## Intention

`BlackRoad-OS/RoadCode` is where messy operator reality gets integrated first.
Stable patterns should be promoted into `BlackRoad-OS-Inc/RoadCode`.
