# TheFoundationHQ Landing Pages

## Funnel Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FUNNEL STRUCTURE                             │
└─────────────────────────────────────────────────────────────────────┘

    ┌──────────────────┐
    │   OPT-IN PAGE    │  /opt-in/blueprint/
    │  (Email Capture) │
    └────────┬─────────┘
             │ Form Submit
             ▼
    ┌──────────────────┐
    │  UPGRADE OFFER   │  /offers/upgrade/
    │  (Upsell Page)   │
    └────────┬─────────┘
             │
      ┌──────┴──────┐
      ▼             ▼
┌───────────┐  ┌───────────┐
│  MAIN CTA │  │  SKIP CTA │
│ (Payment) │  │  (Free)   │
└─────┬─────┘  └─────┬─────┘
      │              │
      ▼              ▼
┌─────────────────────────────────────┐
│           SYSTEME.IO                │
│  Payment: courses.thefoundationhq.com/55e3cadc
│  Free:    courses.thefoundationhq.com/f58bc4f5-...
└─────────────────────────────────────┘
```

## File Structure

```
10_LANDING_PAGES_GITHUB/
├── index.html              → Redirects to /opt-in/blueprint/
├── README.md               → This file
├── opt-in/
│   └── blueprint/
│       ├── index.html      → Main opt-in page (LP1)
│       └── variant-b.html  → A/B test variant
├── offers/
│   └── upgrade/
│       ├── index.html      → Upgrade offer page (LP2)
│       └── light.html      → Light theme variant
├── sales/
│   └── main/
│       ├── index.html      → Main sales landing page
│       └── v2.html         → Version 2
└── assets/
    ├── css/
    ├── images/
    └── js/
```

## URLs After Deployment

| Page | URL |
|------|-----|
| Opt-in (main) | `yourdomain.com/opt-in/blueprint/` |
| Opt-in (variant) | `yourdomain.com/opt-in/blueprint/variant-b.html` |
| Upgrade (main) | `yourdomain.com/offers/upgrade/` |
| Upgrade (light) | `yourdomain.com/offers/upgrade/light.html` |
| Sales (main) | `yourdomain.com/sales/main/` |
| Sales (v2) | `yourdomain.com/sales/main/v2.html` |

## How to Deploy

1. **Drag & drop** the contents of this folder into your GitHub repo (`foundation-landing-pages`)
2. Cloudflare Pages will **automatically deploy** when GitHub receives the changes
3. Pages will be live at your Cloudflare domain

## CTA Links Summary

### Opt-in Pages → Upgrade Offer
- Form action: `/offers/upgrade/`

### Upgrade Offer → Systeme.io
- Main CTA (Buy): `https://courses.thefoundationhq.com/55e3cadc`
- Skip CTA (Free): `https://courses.thefoundationhq.com/f58bc4f5-8d173036-b14aea28-ad3e659a-16ab6b4d`

---

Last updated: January 22, 2026
