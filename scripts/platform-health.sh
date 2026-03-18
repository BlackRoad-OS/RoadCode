#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT/artifacts/platform-health/latest"
mkdir -p "$OUT_DIR"

SSH_HOSTS=(alice aria lucidia anastasia cecilia octavia gematria blackroad cadence codex-infinity shellfish)

json_escape() {
  python3 - <<'PY' "$1"
import json, sys
print(json.dumps(sys.argv[1]))
PY
}

cmd_output() {
  local command="$1"
  if eval "$command" >"$OUT_DIR/.tmp" 2>&1; then
    cat "$OUT_DIR/.tmp"
    return 0
  fi
  cat "$OUT_DIR/.tmp"
  return 1
}

provider_status() {
  local name="$1"
  local command="$2"
  local output
  if output="$(cmd_output "$command")"; then
    printf '{"name":%s,"ok":true,"detail":%s}' "$(json_escape "$name")" "$(json_escape "$output")"
  else
    printf '{"name":%s,"ok":false,"detail":%s}' "$(json_escape "$name")" "$(json_escape "$output")"
  fi
}

ssh_status() {
  local host="$1"
  local output
  if output="$(ssh -o BatchMode=yes -o ConnectTimeout=5 "$host" 'hostname' 2>&1)"; then
    printf '{"host":%s,"ok":true,"detail":%s}' "$(json_escape "$host")" "$(json_escape "$output")"
  else
    printf '{"host":%s,"ok":false,"detail":%s}' "$(json_escape "$host")" "$(json_escape "$output")"
  fi
}

{
  echo '{'
  echo '  "generated_at": '"$(json_escape "$(date -u +"%Y-%m-%dT%H:%M:%SZ")")"','
  echo '  "repo": "BlackRoad-OS/RoadCode",'
  echo '  "mode": "upstream-operator",'
  echo '  "providers": ['
  provider_status "railway" "railway whoami"
  echo ','
  provider_status "vercel" "vercel whoami"
  echo ','
  provider_status "wrangler" "wrangler whoami"
  echo ','
  provider_status "digitalocean" "doctl auth list"
  echo ','
  provider_status "tailscale" "tailscale status --json"
  echo ','
  provider_status "ollama" "ollama list"
  echo
  echo '  ],'
  echo '  "ssh": ['
  for i in "${!SSH_HOSTS[@]}"; do
    ssh_status "${SSH_HOSTS[$i]}"
    if [[ "$i" -lt $((${#SSH_HOSTS[@]} - 1)) ]]; then
      echo ','
    else
      echo
    fi
  done
  echo '  ]'
  echo '}'
} >"$OUT_DIR/summary.json"

python3 - <<'PY' "$OUT_DIR/summary.json" >"$OUT_DIR/SUMMARY.md"
import json, sys
path = sys.argv[1]
data = json.load(open(path))
providers = data["providers"]
ssh = data["ssh"]
ok_providers = [p["name"] for p in providers if p["ok"]]
bad_providers = [p["name"] for p in providers if not p["ok"]]
ok_hosts = [h["host"] for h in ssh if h["ok"]]
bad_hosts = [h["host"] for h in ssh if not h["ok"]]
print("# Platform Health")
print()
print(f"- Repo: `{data['repo']}`")
print(f"- Mode: `{data['mode']}`")
print(f"- Generated: `{data['generated_at']}`")
print(f"- Providers OK: `{len(ok_providers)}`")
print(f"- SSH reachable: `{len(ok_hosts)}`")
print()
print("## Providers OK")
for name in ok_providers:
    print(f"- `{name}`")
print()
print("## Providers Needing Attention")
for name in bad_providers:
    print(f"- `{name}`")
print()
print("## SSH Reachable")
for host in ok_hosts:
    print(f"- `{host}`")
print()
print("## SSH Needing Attention")
for host in bad_hosts:
    print(f"- `{host}`")
PY

rm -f "$OUT_DIR/.tmp"
echo "Wrote $OUT_DIR/summary.json"
echo "Wrote $OUT_DIR/SUMMARY.md"
