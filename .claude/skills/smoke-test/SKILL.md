---
name: smoke-test
description: Run browser smoke test of the game using Puppeteer MCP - starts dev server, tests all game mechanics against the baseline checklist, stops server
disable-model-invocation: true
---

# Browser Smoke Test

Run a full smoke test of the NEO Justine game using Puppeteer MCP. Tests all game mechanics from the baseline checklist.

## Steps

1. Start the dev server (`npm run dev -- --port 5199`) in the background
2. Wait for it to be ready (curl check)
3. Launch Puppeteer browser (headless)
4. Run through the baseline checklist at `tests/baseline-checklist.md`:

### Home Page
- Navigate to `http://localhost:5199`
- Screenshot and verify: ASCII art title, animated stars, Options/Play buttons
- Click "Play" link

### Game Board
- Verify SVG game board renders with grid cells
- Verify player arrow (green polygon) renders centered
- Verify fog of war (hidden cells)
- Verify chest is visible

### Movement (WASD)
- Dispatch keyboard events with `code` property (e.g., `KeyW`, `KeyS`, `KeyA`, `KeyD`)
- Use: `window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW', bubbles: true }))`
- Verify player moves and camera re-centers
- Verify fog uncovers new cells

### Chest Pickup
- Move player onto chest at {i:3, j:3} (starting position is {i:4, j:4}, so move up 1 + left 1)
- Verify chest disappears
- Verify log shows "You got Door Key."

### Rotation
- Press KeyE (clockwise) and KeyQ (counter-clockwise)
- Verify player arrow direction changes

### Key Items Dialog
- Click "Key Items" button (find via `document.querySelectorAll('button')`)
- Verify dialog opens showing "Door Key"
- Close dialog

### Lock Interaction
- Move down 5 from chest position to reach lock at {i:3, j:8}
- Verify log shows "You unlocked the door."

### Level Transition
- Continue moving down toward stairs at {i:3, j:15}
- Verify map changes to Test2 (7x8 grid = 56 rects)
- Verify with: count `svg rect` elements and check max x/y coordinates

### Options Page
- Navigate to `/options`
- Verify "Options" heading and "Go back" link render

### Cleanup
5. Close Puppeteer browser
6. Kill the dev server (`pkill -f "vite dev"`)
7. Report results as a checklist with pass/fail for each item
