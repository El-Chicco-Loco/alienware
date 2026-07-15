#!/usr/bin/env bash
set -e
[ -n "$PYENV_DEBUG" ] && set -x

program="${0##*/}"

export PYENV_ROOT="/home/alienware/.pyenv"
SHIM_PATH=${0%/*}
if [[ $SHIM_PATH != "/home/alienware/.pyenv/shims" ]]; then
  export _PYENV_SHIM_PATH="$SHIM_PATH"
fi
exec "/usr/share/pyenv/libexec/pyenv" exec "$program" "$@"
