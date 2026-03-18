# BlackRoad-OS RoadCode

Upstream operator root for BlackRoad.

## What Lives Here

- RoadCode landing page and deploy surface
- upstream operator workflows
- fast-turn automation entrypoints for GitHub, Gitea, Slack, and Cloudflare
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
