#!/bin/sh
cd "$(dirname "$0")/../example" || exit 1
exec npx turbo check:lint
