# BlackRoad-OS RoadCode

Canonical RoadCode workspace and automation hub for BlackRoad-OS.

## What Lives Here

- RoadCode landing page and deploy surface
- org-specific operator workflows
- automation entrypoints for GitHub, Gitea, Slack, and Cloudflare

## Deploy

This repo ships a static site from site/ to Cloudflare Pages.

- Pages URL: https://blackroad-os-roadcode.pages.dev
- Expected project name: blackroad-os-roadcode

## Operator Notes

- Default branch: main
- Workflow: .github/workflows/roadcode-pages.yml
- Site entrypoint: site/index.html
