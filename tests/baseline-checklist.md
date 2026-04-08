# Pre-Upgrade Baseline Checklist

Captured before upgrading from Svelte 3 to Svelte 5. Use this to verify nothing breaks after the upgrade.

## Home Page (`/`)
- [ ] ASCII art title "NEO JUSTINE" renders
- [ ] Animated blinking stars display
- [ ] "Options" and "Play" buttons render and are clickable
- [ ] Navigation to `/play` works
- [ ] Navigation to `/options` works

## Options Page (`/options`)
- [ ] "Options" heading renders
- [ ] "Go back" link navigates to home

## Game Page (`/play`)

### Board Rendering
- [ ] SVG game board renders with grid cells
- [ ] Fog of war — only cells within Manhattan distance 3 are visible
- [ ] Player arrow (green polygon) renders centered on screen
- [ ] Camera re-centers on player after each move

### Movement (WASD)
- [ ] W moves player up (decreases j)
- [ ] S moves player down (increases j)
- [ ] A moves player left (decreases i)
- [ ] D moves player right (increases i)
- [ ] Movement blocked by Empty cells (walls)
- [ ] Fog of war uncovers new cells on each move

### Rotation (Q/E)
- [ ] Q rotates player counter-clockwise (arrow direction changes)
- [ ] E rotates player clockwise (arrow direction changes)

### Zoom (Mouse Wheel)
- [ ] Scroll up zooms in
- [ ] Scroll down zooms out
- [ ] Zoom clamped between 0.1x and 3x

### Chest Interaction
- [ ] Chest SVG icon visible when in player's vision range
- [ ] Walking onto a chest picks it up (chest disappears)
- [ ] Log shows "You got Door Key." (green highlighted item name)
- [ ] Item added to player inventory

### Lock Interaction
- [ ] Lock SVG icon visible when in player's vision range
- [ ] Walking into a lock with the key unlocks it (lock removed)
- [ ] Log shows "You unlocked the door."
- [ ] Walking into a lock without the key blocks movement
- [ ] Log shows locked door message when blocked

### Key Items Dialog
- [ ] "Key Items" button opens dialog
- [ ] Dialog lists collected key items (e.g., "Door Key")
- [ ] Clicking backdrop closes dialog

### Level Transition
- [ ] Stairs SVG icon visible when in player's vision range
- [ ] Walking onto stairs transitions to next floor
- [ ] New map loads (Test2: 8x7 grid, no chests/locks)
- [ ] Player position resets to new floor starting position

### Log Panel
- [ ] "Some text" label renders (left panel)
- [ ] Log entries appear at bottom of screen
- [ ] Auto-scrolls to latest entry
