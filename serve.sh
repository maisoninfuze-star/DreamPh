#!/usr/bin/env bash
# Centre Dream PH — local preview server control
# Usage: ./serve.sh start | stop | restart | status
cd "$(dirname "$0")" || exit 1
PORT="${PORT:-8190}"
PIDFILE=".server.pid"
NODE="$(command -v node || echo /usr/local/bin/node)"

is_running() { [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; }

start() {
  if is_running; then echo "Already running (pid $(cat "$PIDFILE")) → http://localhost:$PORT"; exit 0; fi
  PORT="$PORT" "$NODE" server.mjs > server.log 2>&1 &
  echo $! > "$PIDFILE"
  sleep 1
  echo "Started → http://localhost:$PORT  (pid $(cat "$PIDFILE"))"
}

stop() {
  if is_running; then kill "$(cat "$PIDFILE")" && echo "Stopped (pid $(cat "$PIDFILE"))"; fi
  # also clear any stray listener on the port
  lsof -nP -tiTCP:"$PORT" -sTCP:LISTEN 2>/dev/null | xargs -r kill 2>/dev/null
  rm -f "$PIDFILE"
}

case "${1:-start}" in
  start)   start ;;
  stop)    stop ;;
  restart) stop; sleep 1; start ;;
  status)  if is_running; then echo "running (pid $(cat "$PIDFILE")) → http://localhost:$PORT"; else echo "stopped"; fi ;;
  *) echo "Usage: ./serve.sh {start|stop|restart|status}"; exit 1 ;;
esac
