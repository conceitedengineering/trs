# Member Experience - Core Client Asks Synthesis

## Purpose
- Synthesize the client's explicit asks for the member-side expansion into implementation-ready design direction.
- Translate qualitative language into concrete UX, structure, and priority decisions.

## 1) Core Experience Intention
- Member area should feel like a place of orientation and return.
- Each login should immediately answer: what is new, where to go next, and how to re-enter quickly.
- The space should feel alive/current while staying grounded and calm.

## 2) Primary Member Outcomes
- **Orientation:** members instantly understand new additions since last visit.
- **Re-entry:** members can resume recurring behavior with minimal friction.
- **Rhythm:** members return regularly because the space feels curated and useful, not noisy.

## 3) Member Home - Must Haves
- Welcome opener (`Welcome back, ___`).
- `What's New` block directly under opener.
- Core recurring content previews grouped as `Read / Cook / Listen`.
- Each preview includes title, small visual, and one line context.
- Clear links to full archives/landing pages.

## 4) Member Home - Should Haves / Nice To Have
- `Continue Where You Left Off` resume block if technically feasible.
- Flexible bulletin/prompt area for short notes, reflections, and announcements.
- Label can vary (`Notes`, `Reflection`, `From the Fold`) as long as tone remains aligned.

## 5) Journal - Editorial Intent
- Journal is an editorial extension of the Method, not a blog/diary.
- Emphasis: depth over frequency, curation over volume, reading experience over endless scrolling.
- Core categories:
  - Deep Dives
  - Features
  - Focus Topics
- Feed preview pattern: category label, title, short excerpt, read link.
- Desired member feeling: thoughtful, specific, worth sitting with.

## 6) Recipes - Inspiration Intent
- Recipes are inspiration prompts, not strict instruction manuals.
- Two entry types:
  - Bases (foundational, slightly more instructional)
  - Meals (visual, minimal, adaptable)
- Grid-first browse pattern with simple entry metadata.
- Desired member feeling: doable, flexible, easy to personalize.

## 7) Playlists - Atmosphere Intent
- Playlists provide soundscapes for routines/moods/headspaces.
- Latest playlist featured at top with immediate play.
- Older playlists move into clean chronological archive.
- Desired member feeling: quickly enter a state/mode.

## 8) UX Principles To Protect
- Prioritize clarity and rhythm over density.
- Enable one-click depth from orientation surfaces.
- Maintain calm scanning patterns and avoid content clutter.
- Preserve archival logic while still highlighting what is current.

## 9) Content Interaction Model
- Public site converts to member sales page and login.
- Member Home acts as orientation hub.
- Journal/Recipes/Playlists function as recurring content pillars.
- Resume behavior (Method continuation) should reduce repeat navigation effort.

## 10) Technical/Product Implications
- Need ability to mark and display newest content across multiple content types.
- Need content metadata model:
  - type (`Journal`, `Recipe`, `Playlist`, `Method`)
  - subtype/category (`Deep Dive`, `Base`, etc.)
  - publish date
  - preview image
  - short excerpt/descriptor
- Optional state tracking for last-viewed/last-completed content to power resume UX.
- Need archive patterns that stay lightweight and searchable/scannable.

## 11) Build Priorities
1. Member Home orientation framework (`What's New` + `Read/Cook/Listen`).
2. Journal landing + entry model.
3. Recipes landing + Bases/Meals structure.
4. Playlists featured + archive pattern.
5. Optional enhancements: Continue block and Bulletin/Prompt.

## 12) Quality Bar (Acceptance Signals)
- Member can identify new content in less than 5 seconds.
- Member can navigate to preferred content pillar in one click.
- Member home feels current without feeling crowded.
- Journal reads as editorial depth, not generic blog stream.
- Recipe section feels inspiring and doable, not rigid.
- Playlist section enables immediate listening or quick archive browse.

## Open Questions
- Is `Method` a top-level member navigation item or accessed through contextual links?
- What level of personalization is available for `Continue Where You Left Off` in current stack?
- Should bulletin content be chronological, pinned, or mixed?

## Change Log
- **2026-03-10:** Created member-side core asks synthesis from expanded sitemap context
