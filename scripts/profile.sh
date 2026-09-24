#!/usr/bin/env bash
# Times the CLI commands so you can spot the slow ones.
set -euo pipefail
cd "$(dirname "$0")/.."
for cmd in list total "show INV-1002"; do
  start=$(node -e 'console.log(Date.now())')
  node bin/ledgerly.js $cmd > /dev/null
  end=$(node -e 'console.log(Date.now())')
  echo "ledgerly $cmd: $((end - start)) ms"
done
