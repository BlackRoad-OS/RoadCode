# BlackRoad-OS RoadCode

Upstream operator root for BlackRoad.

## What Lives Here

- RoadCode landing page and deploy surface
- upstream operator workflows
- fast-turn automation entrypoints for GitHub, RoadCode, Slack, and Cloudflare
- executive role and promotion definitions

## Deploy

This repo ships a static site from site/ to both GitHub Pages and Cloudflare Pages.

- GitHub Pages URL: https://blackroad-os.github.io/RoadCode/
- Cloudflare Pages URL: https://blackroad-os-roadcode.pages.dev
- Expected Cloudflare project name: blackroad-os-roadcode

## Operator Notes

- Default branch: main
- GitHub Pages workflow: .github/workflows/github-pages.yml
- Workflow: .github/workflows/roadcode-pages.yml
- Site entrypoint: site/index.html
- Executive charter: EXECUTIVE_MODEL.md
- Org role registry: org-executives.json

## Role In The System

This repo is the upstream operator lab.

- Upstream operator: `BlackRoad-OS/RoadCode`
- Production operator: `BlackRoad-OS-Inc/RoadCode`
- Canonical source root: `BlackRoad-OS-Inc/source`
- Platform stack map: `PLATFORM_STACK.md`
- Provider and fleet registry: `infra/platform-registry.json`
- Local health command: `bash scripts/platform-health.sh`

---

**Proprietary Software — BlackRoad OS, Inc.**

This software is proprietary to BlackRoad OS, Inc. Source code is publicly visible for transparency and collaboration. Commercial use, forking, and redistribution are prohibited without written authorization.

**BlackRoad OS — Pave Tomorrow.**

*Copyright 2024-2026 BlackRoad OS, Inc. All Rights Reserved.*
