# Header (working copy theme 192441876808, commit 626c5249)

- config/settings_data.json: logo = shopify://shop_images/pawguard-logo-green.png, logo_height 34, logo_height_mobile 26
- sections/header-group.json
  - announcement text "FREE SHIPPING OVER $54 · 90-DAY MONEY-BACK GUARANTEE", uppercase, 700, loose, white, 0.75rem
  - announcement bg #1f5c3f + custom_css gradient #1f5c3f -> #2f7a57 -> #4a8c6c, padding 8/8, no divider
  - header: logo center, menu left, search right, country + language selectors off, bottom border 1px #e5e9e7
  - header custom_css: .pg-header-cta green pill (#1f5c3f, hover #173f2d), hidden < 750px
  - cta_label "Shop the Cleanse", cta_link shopify://products/parasite-cleanse-drops
  - menu font regular, 1rem
- sections/header.liquid
  - schema: added header "Call-to-action button" + settings cta_label (text), cta_link (url) at top of settings
  - `capture actions`: renders <a class="pg-header-cta"> before header-actions when cta_label set
- Store data (live): main-menu = All Products (/collections/all) · Track Your Order (customer account orders) · Contact Us (/pages/contact)
