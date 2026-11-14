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
- 2026-11-13 | Shopify MCP | menuUpdate main-menu gid://shopify/Menu/312892686664 -> All Products / Track Your Order / Contact Us | OK (LIVE store data)
- 2026-11-13 | Shopify theme_bash + theme_commit 626c5249 | working copy 192441876808 | config/settings_data.json (logo), sections/header-group.json (announcement + header layout + CTA css), sections/header.liquid (CTA setting + render) | saved; first attempt had Liquid quote error (caught in screenshot, fixed). Details: theme/notes/header.md
- 2026-11-13 | Shopify theme_publish working copy | REFUSED ("Only agent-created themes can be published here") — owner to publish in admin
- 2026-11-13 | Local file | .claude/settings.json allow-list write DENIED by session safety classifier (self-modification) — owner can add it
- 2026-11-13 | CCR | create_environment "pawguard-store" (env_01656NVL9K8wW62JV1hqWmTm, personal) allowing pawsylabs.com, www.pawsylabs.com, cdn.shopify.com; session switched (network only) | OK — owner approved
- 2026-11-13 | Research | downloaded competitor quiz page + px-gut-check.js (scratchpad only, not in repo) to study flow: name > age > weight > concerns (max 3) > follow-ups > exposure > diet > email > loading > plan
- 2026-11-13 | Local file | theme/sections/pg-gut-check.liquid, theme/assets/pawguard-quiz.js, theme/assets/pawguard-quiz.css, theme/templates/page.gut-check.json | own PawGuard copy; scoring picks 1/2/3-bottle bundle (>=9 pts -> 3, >=5 -> 2, else 1); vet-visit warning if worms reported; disclaimer; email -> Shopify customer (tags newsletter,gut-check); reviews = owner's real reviews (Jennifer, Michael)
- 2026-11-13 | Shopify theme_bash | working copy 192441876808 | uploaded quiz section/js/css/template (MD5 identical to repo); header CTA -> "Take the Gut Check" -> shopify://pages/gut-check | pending commit
- 2026-11-13 | Shopify MCP | pageCreate "The Gut Check" gid://shopify/Page/158719770952 handle gut-check, published, templateSuffix gut-check, SEO title/description metafields | OK (LIVE; renders with the live theme's default page template until working copy is published)
- 2026-11-13 | Shopify theme_screenshot | /pages/gut-check mobile | quiz renders; sticky Continue button overlapped input -> made footer non-sticky
- 2026-11-13 | Owner | published "PawGuard – working copy" (192441876808) -> now MAIN (new header live). Quiz edits left pending on it could not be committed (main_theme refused).
- 2026-11-13 | Shopify MCP | themeDuplicate live -> "PawGuard – working copy 2" gid://shopify/OnlineStoreTheme/192443515208 | OK; quiz files + header CTA copied from pending workspace (MD5 identical to repo)
- 2026-11-13 | Shopify theme_commit e0645f47 | working copy 2 | rejected pg-gut-check.liquid (block name > 25 chars) + template depending on it -> renamed block "Customer review"; re-commit pending
- 2026-11-13 | Shopify theme_commit 48dbe31e | working copy 2 192443515208 | pg-gut-check.liquid saved; verified via files query: quiz js/css/section/template present, MD5 identical to repo; header CTA = "Take the Gut Check" -> /pages/gut-check. Awaiting owner publish.
- 2026-11-13 | Local + Shopify theme_commit 063eab06 | working copy 2 | quiz: dog photos on weight answers (CSS crops of pawguard-dosing-chart-by-dog-weight.jpg via new section setting size_image), own SVG icons on concerns, clearer "US only" message | MD5 identical to repo
- 2026-11-13 | CCR | update_environment pawguard-store: + mwnyhj-kk.myshopify.com, paw-guard.com, www.paw-guard.com (owner approved) — for real-browser testing
- 2026-11-13 | Test (Playwright, scratchpad) | full quiz run on preview: all steps OK, 3-pick limit OK, follow-ups OK, strong signs -> 3 Bottles, dose 2 ml, vet warning OK, prices sub $95.99 / once $119.99 OK; only errors = blocked third-party trackers
- 2026-11-13 | FINDING | storefront reports product SOLD OUT for US buyers: /cart/add.js 422 "already sold out" although admin availableForSale=true, untracked, published. US market has catalogsCount 0, webPresences none, delivery.shipping null (Bulgaria market was removed). Store cannot take orders until owner fixes Settings > Markets.
- 2026-11-13 | Shopify theme_commit | working copy 2 | quiz tick z-index fix
- 2026-11-13 | Shopify theme_publish working copy 2 (192443515208) | REFUSED ("Only agent-created themes can be published here") — owner asked to publish; owner to click Publish in admin
- 2026-11-13 | Owner | published "PawGuard – working copy 2" (192443515208) -> MAIN (quiz live)
- 2026-11-13 | Local | extracted PNG photos from owner's PawGuardDesktop.svg / PawGuardMobile.svg -> assets/source/pawguard-hero-desktop.jpg (1832x859), pawguard-hero-mobile.jpg (1086x1448)
- 2026-11-13 | Shopify MCP | stagedUploadsCreate (PUT) + curl upload + fileCreate | MediaImage 64753817977160 (desktop), 64753818009928 (mobile), alt text set | OK
- 2026-11-13 | Shopify MCP | themeDuplicate live -> "PawGuard – working copy 3" gid://shopify/OnlineStoreTheme/192444793160 | OK
- 2026-11-13 | Local + theme_bash + theme_commit fc543c4c, 47631489 | working copy 3 | new sections/pg-home-hero.liquid (inline <style>, desktop/mobile photos, 4.5-star line "Loved by 35,000+ dog parents", headline, 2 buttons); templates/index.json now = [pg_hero] only (removed Shopify sample hero + placeholder T-shirt product list) | MD5 identical to repo; real-browser screenshots desktop + mobile OK; buttons -> /products/parasite-cleanse-drops and /pages/gut-check
- 2026-11-13 | Local + theme_bash + theme_commit 5bb85676 | working copy 3 192444793160 | new sections/pg-trust-strip.liquid (own SVG icons, inline style); index.json order = [pg_hero, trust]; items: Vet-reviewed / Plant-powered / Nothing hidden / 90-day guarantee (wording kept to verified facts) | MD5 identical to repo; real-browser check desktop (4 cols) + mobile (2x2) OK
- 2026-11-13 | Research | downloaded pawsylabs.com home (scratchpad) — sections ingredients/proof/reviews/quiz/faq; NOTE: owner-supplied dog photos (goldendoodle car, beagle yard, terrier couch) and kitchen lifestyle photo are the COMPETITOR's own review/quiz images -> not used
- 2026-11-13 | Shopify MCP | stagedUploadsCreate + PUT + fileCreate pawguard-ingredients-still-life.jpg (MediaImage 64754614370632) | OK
- 2026-11-13 | Owner | published "PawGuard – working copy 3" (192444793160) -> MAIN (hero + trust strip live)
- 2026-11-13 | Shopify MCP | themeDuplicate live -> "PawGuard – working copy 4" gid://shopify/OnlineStoreTheme/192449413448 | OK
- 2026-11-13 | Local + theme_bash + theme_commit fcfd57d5, a8ddf59d | working copy 4 | new sections pg-home-ingredients/proof/reviews/quiz/faq, assets pawguard-home.css/.js, quiz prefill (?concerns=) in pawguard-quiz.js, index.json order [pg_hero, trust, ingredients, proof, reviews, quiz, faq] (content in theme/templates/index-home-sections.json) | MD5 identical to repo
- 2026-11-13 | Test (Playwright) | ingredient pop-up + next OK; product CTA "Get the drops · $49.99"; quiz teaser picks -> /pages/gut-check?concerns=scoot,tummy and quiz pre-selects them; bug found+fixed: home JS double-initialised (two script tags) -> guard added; no page errors
- 2026-11-14 | Owner | published "PawGuard – working copy 4" (192449413448) -> MAIN (home sections live)
- 2026-11-14 | Check | owner's kitchen photo vs competitor pl-ms-help.jpg: not identical (mean pixel diff ~32) but near-identical composition; owner states AI-generated & unique, chose to use it (lifestyle image, not a review)
- 2026-11-14 | Shopify MCP | stagedUploadsCreate + PUT + fileCreate pawguard-kitchen-dog-lap.jpg (MediaImage 64765665247560) | OK
- 2026-11-14 | Shopify MCP | themeDuplicate live -> "PawGuard – working copy 5" gid://shopify/OnlineStoreTheme/192471400776 | OK
- 2026-11-14 | theme_bash + theme_commit 8f4ef10c | working copy 5 | index.json quiz.image -> pawguard-kitchen-dog-lap.jpg | OK
- 2026-11-14 | theme_bash + theme_commit 0d17dfd4 | working copy 5 | pawguard-home.css: quiz teaser photo framing (desktop object-position left; mobile photo above card) | MD5 identical to repo; Playwright screenshots desktop+mobile OK
