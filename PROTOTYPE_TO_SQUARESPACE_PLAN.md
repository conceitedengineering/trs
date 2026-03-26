# TRS Prototype-to-Squarespace Execution Plan (Frozen)

## Intent
- Use code-first prototypes to accelerate polish decisions, interaction validation, and client feedback.
- Reuse approved prototype patterns as direct inputs for Squarespace custom CSS/JS instead of treating prototypes as throwaway.

## Why This Plan Is Locked
- Interactive behavior is faster to validate in code than static design tooling.
- Squarespace capability gaps can be identified early before commitment.
- Approved patterns can be ported with less rework.

## Core Workflow
1. Prototype key page sections in code (mobile-first, interaction-first).
2. Review with client in browser and collect structured decisions.
3. Classify each pattern for Squarespace implementation:
   - `Native`: built with standard Squarespace blocks
   - `Hybrid`: native structure + custom CSS
   - `Custom`: code injection (CSS/JS)
4. Port approved patterns into Squarespace with scoped selectors and fallback behavior.
5. Run visual + functional QA against approved prototype behavior.

## Build Scope (MVP Pages)
- Home
- Offerings
- Member Space
- Contact

## Pattern Inventory (Initial)
- Global nav with clear conversion path
- Hero section + dominant CTA
- Section cards for offerings/value explanations
- Conversion strip with primary and secondary actions
- Contact form shell and direct email block

## Squarespace Portability Rules
- Every section in prototype should be mappable to `Native`, `Hybrid`, or `Custom`.
- Avoid fragile selectors tied to transient platform markup when possible.
- Any JavaScript enhancement must degrade gracefully with no-JS fallback.
- Keep design tokens centralized so visual changes propagate quickly.

## Client Feedback Format (Required)
- Decision per block: `Keep`, `Change`, `Remove`
- Priority per change: `Must`, `Should`, `Nice`
- Freeze accepted patterns into `v1` before full-page expansion.

## Guardrails
- Do not add new interaction patterns after `v1` freeze unless replacing existing ones.
- Avoid low-impact/high-complexity effects.
- Preserve legibility, performance, and mobile clarity over ornament.

## Immediate Execution
1. Build a small linked MVP page series in code with shared style/token system.
2. Validate conversion flow from Home -> Member Space.
3. Annotate each section with intended Squarespace implementation mode.
4. Use this scaffold as the base for iterative content/design polish.
