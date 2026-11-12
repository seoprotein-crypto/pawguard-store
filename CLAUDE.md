# PawGuard Shopify Store — Project Conventions

## Store facts
- Store: mwnyhj-kk.myshopify.com ("My Store"), owner login seoprotein@gmail.com
- Plan: Basic · Currency: EUR · Timezone: EET · Country: Bulgaria
- Target custom domain: paw-guard.com (registered at Namecheap)
- Live theme: Horizon (gid://shopify/OnlineStoreTheme/192234422600), role MAIN. DO NOT EDIT.

## Always-do rules
1. **Plan first.** Before any mutation or file change, write out the plan (what, why, which API call) and get the owner's OK.
2. **Never touch the live theme.** All theme work goes in a draft copy (`themeDuplicate` -> edit the copy -> owner previews -> owner publishes).
   Never call `themePublish`, `themeDelete`, or `themeFilesUpsert`/`themeFilesDelete` on a theme with role MAIN.
3. **Draft by default.** New products get `status: DRAFT`. New discounts are created with a future start date or left inactive, and new pages are created with `isPublished: false`.
4. **Log everything.** Every Shopify API mutation and every local file change goes into PROGRESS.md (date, tool, operation, target ID, result).
5. **No guessing IDs.** Look up IDs with a query first.
6. **Prices are TBD.** Don't invent prices. Use a placeholder only in DRAFT products and mark it "PRICE TBD" in PROGRESS.md.
7. **Beginner-friendly.** Explain each step in plain language and say where to click in Shopify admin to review it.
8. **No secrets in files.** Never write API tokens or passwords into this repo.

## Workflow for each task
Plan -> owner approves -> execute in draft -> log in PROGRESS.md -> owner reviews in admin -> owner publishes.
