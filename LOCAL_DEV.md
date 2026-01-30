Local interactive runner (WebSocket)
===================================

What this gives you
-------------------
- A local Python runner that streams output in real time.
- Input is sent line-by-line (like a terminal).
- Docker-based setup so you can move to a real server later with the same config.

Start everything
----------------
From `e:\Programming\WEBSITE\probioz`:

```
docker compose up --build
```

Services
--------
- Frontend (Live Server): http://localhost:5500
- API (health check): http://localhost:8000/api/health
- Runner (WebSocket): ws://localhost:9001/ws/run?token=devtoken

How it works
------------
1) The browser opens a WebSocket to the runner.
2) It sends `{ "type": "run", "code": "..." }`.
3) The runner streams back stdout/stderr as they happen.
4) When the user types input, the browser sends `{ "type": "stdin", "data": "..." }`.

Move to real server later
-------------------------
- Keep the same Docker images.
- Change the hostnames and ports in your frontend JS.
- Replace local DB container with a managed Postgres (Supabase, RDS, Neon).
