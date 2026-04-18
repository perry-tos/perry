Emergency debugging mode for the hackathon. Fast, focused, no unnecessary changes.

The user will describe a bug or error. Follow this protocol:

1. **Read the error** — paste or describe it. Don't guess.
2. **Locate the source** — grep for the error message, trace the call stack, find the exact line.
3. **Understand the context** — read surrounding code. What was it supposed to do?
4. **Fix minimally** — change the fewest lines possible. No refactoring, no cleanup, no "while we're here" improvements.
5. **Verify** — if there's a way to run/test the fix locally, do it.

## Rules

- Speed over elegance. A working hack beats a beautiful fix we don't have time for.
- If the fix requires an env var or config change, say so explicitly.
- If the bug is in a dependency (not our code), suggest a workaround, not a PR to the dependency.
- If the bug will take more than 15 minutes to fix properly, suggest what to mock/stub for the demo instead.
- Never change the API contract between services unless absolutely necessary (other team members depend on it).

$ARGUMENTS contains the error description or context.
