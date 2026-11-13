# PawGuard Shopify Store — Project Conventions

## Store facts
- Store: mwnyhj-kk.myshopify.com ("My Store"), owner login seoprotein@gmail.com
- Plan: Basic · Currency: USD (store default) · Timezone: EET · Business country: Bulgaria · Selling market: United States
- Target custom domain: paw-guard.com (registered at Namecheap)
- Live theme (since 2026-11-13): "Horizon – PawGuard DRAFT" (gid://shopify/OnlineStoreTheme/192425886024), role MAIN.
- Old theme: "Horizon" (gid://shopify/OnlineStoreTheme/192234422600), UNPUBLISHED — rollback option.

## Always-do rules (updated 2026-11-13 by owner: "work on the live store from now on, don't ask for approval")
1. **No approval needed.** Make store changes directly and live (products ACTIVE + published, discounts active, pages published). Briefly say what you're doing as you go.
2. **Still confirm before anything that cannot be undone** (deleting products, files, themes, customers, orders) or that spends money.
3. **Live theme edits:** the Shopify tools refuse writes to the MAIN theme. So: duplicate the live theme (or reuse an unpublished working copy), edit + screenshot-check it, then publish it (if the tool refuses, ask the owner to click Publish in Online Store > Themes). Keep the previous theme as rollback.
4. **Log everything.** Every Shopify API mutation and every file change goes into PROGRESS.md (date, tool, operation, target ID, result), then commit + push to GitHub.
5. **No guessing IDs.** Look up IDs with a query first.
6. **No made-up content.** Never invent prices, reviews, testimonials, ratings, stats or endorsements. Customer photos and expert endorsements must be real.
7. **Beginner-friendly.** Explain in plain language and say where to click in Shopify admin to check the result.
8. **No secrets in files.** Never write API tokens or passwords into this repo.

## Workflow for each task
Do it live -> verify (query / screenshot) -> log in PROGRESS.md -> commit + push -> tell the owner what changed and where to see it.
