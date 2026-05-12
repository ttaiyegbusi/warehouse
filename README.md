# Warehouse

A Next.js (App Router) prototype for the Warehouse financial dashboard.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS**
- **lucide-react** (icons)
- **IBM Plex Sans** + **IBM Plex Mono** (loaded from Google Fonts)

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Flow

| Route | Screen |
|---|---|
| `/` | Create Account |
| `/account-type` | Account Type selection |
| `/home` | Home (dashboard) |
| `/transactions` | Transactions + Revenue chart |
| `/inbox` | Inbox |
| `/wallet` | Wallet (placeholder) |
| `/docs` | Docs (placeholder) |
| `/settings` | Settings (placeholder) |

The flow goes `/` → `/account-type` → `/home`. From `/home`, the sidebar handles navigation.

## Project Structure

```
warehouse-app/
├── app/
│   ├── layout.js                # Root layout (UserProvider)
│   ├── page.js                  # Create Account screen
│   ├── globals.css              # Tailwind + custom animations
│   ├── account-type/
│   │   └── page.js              # Account Type screen
│   └── (dashboard)/             # Route group — shared layout
│       ├── layout.js            # Sidebar + TopBar + drawer host
│       ├── home/page.js
│       ├── transactions/page.js
│       ├── inbox/page.js
│       ├── wallet/page.js
│       ├── docs/page.js
│       └── settings/page.js
├── components/
│   ├── auth/
│   │   ├── AuthShell.jsx        # Layout for auth screens
│   │   ├── GhostCard.jsx        # Stacked floating preview card
│   │   ├── Field.jsx            # Labeled input wrapper
│   │   └── TypeCard.jsx         # Individual/Business selector
│   └── dashboard/
│       ├── DashboardLayout.jsx  # Sidebar + TopBar + drawer
│       ├── Sidebar.jsx          # Left nav (uses usePathname)
│       ├── TopBar.jsx           # Search + user pill
│       ├── BalanceCard.jsx      # Currency balance card
│       ├── KPI.jsx              # Stat card (Transactions overview)
│       ├── TxnRow.jsx           # Transaction list row
│       ├── RevenueChart.jsx     # SVG bar chart with hover tooltip
│       ├── TransactionDrawer.jsx# Right-side drawer
│       ├── Placeholder.jsx      # Used by Wallet/Docs/Settings
│       └── Skel.jsx             # Skeleton shimmer
└── lib/
    ├── UserContext.js           # Shared user/account/drawer state
    └── mockData.js              # Mock data (transactions, inbox, chart)
```

## Notable Details

- **Live profile preview** — the Create Account ghost card updates as you type
- **Account type morphing** — Business/Individual toggle changes the ghost card icon, name, and adds a "Business Account" pill
- **Skeleton loading** on first visit to Home only (uses `sessionStorage` so it doesn't fire on re-navigation)
- **Drawer slides in from the right** with `cubic-bezier(0.22, 1, 0.36, 1)`; closes with Escape, X button, or backdrop click
- **Revenue chart hover** — dims non-hovered bars, shows month tooltip with current/last period values and a dashed indicator line
- **Sidebar** highlights based on `usePathname()` — works on every dashboard route

## State Management

The Create Account form data, account type selection, and active transaction (for the drawer) all live in `UserContext` so they persist across navigation. State is in-memory — refreshing the browser resets it. Wire up to a real backend / persistent store when ready.
# warehouse
