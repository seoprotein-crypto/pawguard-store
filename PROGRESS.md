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
- 2026-11-13 | Shopify MCP | themeDuplicate (live Horizon -> copy) | gid://shopify/OnlineStoreTheme/192425886024 "Horizon – PawGuard DRAFT" role UNPUBLISHED | OK
- 2026-11-13 | Shopify MCP | themeFilesUpsert -> DRAFT theme 192425886024 | assets/pawguard.js, assets/pawguard.css, sections/pg-image-text, pg-vet, pg-comparison, pg-ingredients, pg-faq-tabs, pg-product-hero | OK — MD5 of all 8 files verified identical to repo
- 2026-11-13 | Shopify MCP | themeFilesUpsert templates/product.pawguard.json | 1st attempt rejected (richtext can't contain <table>); dosing table changed to list; 2nd attempt OK
- 2026-11-13 | Note | live theme 192234422600 untouched; product stays DRAFT; images still pending upload (owner to upload via Content > Files)
- 2026-11-13 | Local file | added theme/sections/pg-reviews.liquid; reviews CSS + "show more" JS; build_template.py adds reviews section + rating pill | repo | Liquid/JS checks OK
- 2026-11-13 | Shopify theme_bash + theme_commit 22cbd2b8 | DRAFT theme 192425886024 | sections/pg-reviews.liquid, assets/pawguard.css, assets/pawguard.js, templates/product.pawguard.json | saved; MD5 of section/css/js identical to repo
  - Reviews: 10 owner-supplied reviews (first names only, owner-supplied dates, "Verified buyer"); summary 4.5 / 1,281 with owner-supplied distribution 890/255/57/19/60 (avg 4.48)
  - Rating pill on hero turned ON: "Rated 4.5 · 1,281 reviews"
  - NOT used: 4 "customer photos" (images 28-35) — visible signs of AI generation (two different shoots of same scenes, garbled label text); declined to attach to named reviews. Photo field left empty.
- 2026-11-13 | Shopify theme_screenshot | /products/parasite-cleanse-drops | 404 because product is DRAFT (expected); screenshot tool renders theme CSS unstyled for live theme too
- 2026-11-13 | Owner (admin) | uploaded 18 images to Files; created 3 selling plan groups in Shopify Subscriptions app; turned off tax-inclusive prices | verified by query: files READY; groups 77815480648 (1 Bottle monthly), 77815513416 (2 Bottles / 2 mo), 77815546184 (3 Bottles / 3 mo), each 20% off and linked to the right variant; taxesIncluded=false
- 2026-11-13 | Note | product status found ACTIVE (changed outside this session); NOT published to Online Store channel (onlineStoreUrl null) so not visible to shoppers
- 2026-11-13 | Shopify MCP | fileUpdate — alt text on all 18 files; 7 images attached to product gid://shopify/Product/10484819263816 (main, dog parents grid, ingredients, dosing, 1/2/3 bottles) | OK
- 2026-11-13 | Shopify MCP | productVariantsBulkUpdate — variant images: 1 Bottle -> ...078664, 2 Bottles -> ...176968, 3 Bottles -> ...980360 | OK
- 2026-11-13 | Shopify theme_screenshot | draft theme product page | 404 — product not published to Online Store, so cannot be screenshotted yet
- 2026-11-13 | Shopify MCP | publishablePublish product -> Online Store publication 307229229384 | OK (owner asked to publish everything)
- 2026-11-13 | Shopify theme_screenshot | draft theme product page desktop + mobile | renders all 8 sections; found mobile overflow (hero grid) + faded ATC
- 2026-11-13 | Shopify theme_bash + theme_commit c6d1e16f | DRAFT theme | assets/pawguard.css (minmax grid fix), sections/pg-product-hero.liquid ("Sold out" label when unavailable) | saved; MD5 identical to repo
- 2026-11-13 | Note | storefront shows "Sold out": only active market is United States (Bulgaria removed) — non-US visitors cannot buy; admin availableForSale=true. Theme NOT published yet — awaiting owner's explicit yes. Password removal = owner action in admin.
- 2026-11-13 | Shopify theme_publish | DRAFT theme 192425886024 | REFUSED by Shopify ("Only agent-created themes can be published here") — owner to publish in admin: Online Store > Themes > Publish
- 2026-11-13 | Local file | CLAUDE.md rules updated per owner (live changes, no approval; confirm irreversible only); memory updated; live theme now 192425886024 (owner published)
- 2026-11-13 | Shopify MCP | themeDuplicate live 192425886024 -> "PawGuard – working copy" gid://shopify/OnlineStoreTheme/192441876808 (UNPUBLISHED) | OK — for header redesign
