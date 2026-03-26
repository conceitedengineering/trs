# TRS Member + Public Site Map

## Purpose
- Define the full site map including public marketing pages, member portal pages, and deferred Phase 02 pages.
- Clarify navigation paths, conversion paths, and page relationships for design/build sequencing.

## Phase Scope
- **MVP (Phase 5):** Public core + Member portal foundation
- **Deferred (Phase 02):** Studio page and related booking/logistics expansion

## Sitemap Diagram
```mermaid
flowchart LR
  A["Public Site"] --> B["Home"]
  A --> C["About"]
  A --> D["Offerings"]
  A --> E["Member Space (Sales)"]
  A --> F["Contact"]

  B --> E
  C --> E
  D --> E
  D --> G["Studio (Phase 02)"]

  E --> H["Member Auth"]
  H --> I["Member Home"]

  I --> J["What's New"]
  I --> K["Read / Cook / Listen"]
  I --> L["Continue Where You Left Off (Optional)"]
  I --> M["Bulletin / Prompt Area (Nice to Have)"]

  K --> N["Journal Landing"]
  K --> O["Recipes Landing"]
  K --> P["Playlists Landing"]

  N --> N1["Deep Dives"]
  N --> N2["Features"]
  N --> N3["Focus Topics"]
  N --> N4["Journal Entry Detail"]

  O --> O1["Bases"]
  O --> O2["Meals"]
  O --> O3["Recipe Entry Detail"]

  P --> P1["Current Playlist (Featured)"]
  P --> P2["Playlist Archive"]
  P --> P3["Playlist Detail / Player"]

  I --> Q["Method Guide Detail (Resume target)"]
  L --> Q

  classDef mvp fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20;
  classDef later fill:#fff3e0,stroke:#ef6c00,color:#e65100;

  class B,C,D,E,F,H,I,J,K,N,O,P,N1,N2,N3,N4,O1,O2,O3,P1,P2,P3,Q mvp;
  class G,L,M later;
```

## Navigation Model
- **Public nav (MVP):** Home, About, Offerings, Member Space, Contact, Log In
- **Member nav (MVP target):** Home, Journal, Recipes, Playlists, Method (if exposed in nav)
- **Member Home internal blocks:** What's New, Read/Cook/Listen previews, optional Continue, optional Bulletin

## Relationship Notes
- `Member Space (Sales)` is the conversion bridge from public site into member auth and portal usage.
- `Member Home` is a re-entry/orientation surface, not a dense content feed.
- `Journal`, `Recipes`, and `Playlists` are recurring engagement pillars and should be reachable in one click from member home.
- `Method Guide Detail` is a destination tied to resume behavior from member home.

## Build Priority Sequence
1. Public conversion flow: Home -> Member Space -> Auth
2. Member Home orientation blocks: What's New + Read/Cook/Listen
3. Landing pages: Journal, Recipes, Playlists
4. Optional enhancements: Continue Where You Left Off, Bulletin/Prompt
5. Phase 02: Studio public page and booking details

## Open Architecture Decisions
- Confirm whether `Method` is top-level in member nav or accessed contextually from Home + Member Space.
- Confirm if `Continue Where You Left Off` is technically feasible in the selected member stack.
- Confirm whether playlist archive entries use embedded players, external links, or both.

## Change Log
- **2026-03-10:** Added expanded sitemap for member-side architecture and cross-site connections
