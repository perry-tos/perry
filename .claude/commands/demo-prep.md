Prepare and validate the end-to-end demo flow for the hackathon presentation.

## The Demo Flow

The "God Mode" demo should show this sequence live:

1. **Dashboard**: Click "Simulate ToS Change" button
2. **Brain**: Receives old/new markdown, returns structured analysis JSON
3. **Dispatcher**: Broadcasts `repository_dispatch` to registered repos
4. **Edge Bot**: Wakes up, scans manifests, opens a professional GitHub Issue

## What to Check

1. **Pre-prepared data**: Verify we have compelling old/new ToS markdown pairs stored. If not, create them:
   - Use a real OpenAI ToS change (or realistic mock) that demonstrates a CRITICAL severity finding
   - The diff should be visually clear and easy to explain in 30 seconds

2. **Brain endpoint**: Test `/diff-analyze` with the prepared data. Verify:
   - Response matches the Pydantic schema exactly
   - `severity` and `executive_summary` are compelling (not generic)
   - Response time is under 10 seconds

3. **Dashboard God Mode panel**: Verify the demo page:
   - Has clear, labeled buttons for different scenarios (CRITICAL, HIGH, MEDIUM)
   - Shows the JSON response in a readable format
   - Has visual feedback (loading states, success indicators)

4. **Edge Bot**: Verify the action.yml and workflow file are correct
   - Test with a mock dispatch payload locally if possible

5. **Fallback plan**: Create hardcoded mock responses in case any service is down during demo

## Output

Produce a **demo readiness checklist** with pass/fail for each step, and fix anything that's broken.
