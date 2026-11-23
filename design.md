# Design: redo

The locked system for the redo website. Both pages share this system.

## System

- Genre: modern-minimal
- Shape of the first page: Feature Stack
- Theme: brand, calm product utility
- Axes: dark green paper / grotesk display / pale green signal · posture: committed

## Tokens

`src/styles/tokens.css` is the source of truth.

- `--color-ink` is the dark green product ground.
- `--color-paper` is the warm document ground.
- `--color-accent` is the restrained pale green signal.
- `--font-display` is Schibsted Grotesk.
- `--font-body` is Instrument Sans.
- Screenshot surfaces use the shared 24px card radius and single screenshot shadow.

## Controls

- Primary: pale green fill, dark green text, 10px radius, 48px minimum height.
- Secondary: typographic links with underline on hover and current-page state.

## Motion

Calm. The existing entrance and reveal scripts remain wired, content is visible without scripting, and reduced motion ends every transition immediately.
