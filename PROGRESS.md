# PROGRESS / Audit Log

Format: `YYYY-MM-DD HH:MM (EET) | Tool | Operation | Target | Result`

## 2026-11-12 — Session 1: Environment check (read-only)
- 2026-11-12 | Shopify MCP | get-shop-info (read) | shop | Connected: mwnyhj-kk.myshopify.com, Basic plan, EUR
- 2026-11-12 | Shopify MCP | graphql_query (read): themes, products, orders, primaryDomain, sellingPlanGroups | shop | 1 theme (Horizon, MAIN); 0 products; 0 orders; primary domain still *.myshopify.com; 0 selling plan groups
- 2026-11-12 | Shopify MCP | graphql_schema (read): theme mutations | — | themeDuplicate / themeFilesUpsert available, so draft-theme workflow is possible via API
- 2026-11-12 | Local file | created CLAUDE.md | /home/user/CLAUDE.md | conventions & rules
- 2026-11-12 | Local file | created PROGRESS.md | /home/user/PROGRESS.md | this log
- 2026-11-12 | Local file | created auto memory | ~/.claude/projects/-home-user/memory/MEMORY.md | store schema notes

No mutations to the store have been made.

## 2026-11-12 — Session 1: Verify owner setup (read-only)
- 2026-11-12 | Shopify MCP | graphql_query (read): shop.primaryDomain | shop | primary domain = paw-guard.com, SSL enabled ✅
- 2026-11-12 | Shopify MCP | graphql_query (read): appInstallations | shop | "Subscriptions" (subscriptions-remix) installed ✅
- 2026-11-12 | CCR | get_session / list_repos (read) | session | no GitHub repo attached / visible ❌
- 2026-11-12 | Local file | appended to PROGRESS.md | /home/user/PROGRESS.md | this entry
- 2026-11-12 | CCR | add_repo seoprotein-crypto/pawguard-store + git clone | repo | empty repo cloned to /home/user/pawguard-store
- 2026-11-12 | Local file | copied CLAUDE.md, PROGRESS.md, .claude/memory/MEMORY.md into repo | repo | first commit
- 2026-11-12 | git | push main -> origin (seoprotein-crypto/pawguard-store) | repo | first push succeeded after owner installed Claude GitHub App
- 2026-11-12 | Shopify MCP | graphql_query (read): shop settings, markets, locations, delivery profiles, policies | shop | currency USD ✅; ships to BG only ❌; only market = Bulgaria; taxesIncluded=true; store name "My Store"; only Privacy policy exists
- 2026-11-12 | Shopify MCP | graphql_query (read): shopifyPaymentsAccount | shop | access denied (connector lacks payments scope) — owner must check payments in admin

## 2026-11-13 — Product 1 build (owner approved plan)
- 2026-11-13 | Local | prepared 18 images in assets/source (renamed for SEO; Trustpilot badge on grid image replaced with PawGuard logo pill; fictional-vet image #5 excluded) | assets/source | done
- 2026-11-13 | Shopify MCP | stagedUploadsCreate (18 targets) | Files | targets issued; file POST step blocked by session safety check — images NOT yet in Shopify Files
- 2026-11-13 | Shopify MCP | productSet (DRAFT) | gid://shopify/Product/10484819263816 "Parasite Cleanse Drops" handle parasite-cleanse-drops, templateSuffix pawguard | OK
  - Variant 1 Bottle  gid://shopify/ProductVariant/54667983552840  $49.99 (compare $69.99) 0.18kg SKU PG-PCD-60-1
  - Variant 2 Bottles gid://shopify/ProductVariant/54667983585608  $89.99 (compare $139.98) 0.36kg SKU PG-PCD-60-2
  - Variant 3 Bottles gid://shopify/ProductVariant/54667983618376 $119.99 (compare $209.97) 0.54kg SKU PG-PCD-60-3
  - inventory untracked + CONTINUE (always in stock); SEO title/description set
- 2026-11-13 | Local file | created theme/sections/pg-product-hero.liquid, pg-image-text.liquid, pg-vet.liquid, pg-ingredients.liquid, pg-comparison.liquid, pg-faq-tabs.liquid | repo | Liquid + schema parse-checked OK
- 2026-11-13 | Local file | created theme/assets/pawguard.css, pawguard.js | repo | JS syntax OK
- 2026-11-13 | Local file | created theme/build_template.py -> theme/templates/product.pawguard.json | repo | all page copy (rewritten, PawGuard brand, Probiotic Blend, 35,000+, vet disclosure)
- 2026-11-13 | Shopify MCP | connection dropped after session restart (502) — themeDuplicate NOT yet run; nothing uploaded to any theme
