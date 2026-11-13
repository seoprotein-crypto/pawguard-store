"""Builds templates/product.pawguard.json (run: python3 -I theme/build_template.py).
Copy lives here so it is reviewable in git. Images reference Shopify Files by filename."""
import json, pathlib

def img(name):
    return f"shopify://shop_images/{name}"

hero_blocks = {
    "faq_signs": {"type": "faq", "settings": {
        "title": "Have you noticed this in your dog?",
        "content": "<p>Still scratching, scooting or licking their paws? When your dog seems uncomfortable, you notice. Common signs owners tell us about:</p>"
                   "<ul><li>Scratching that keeps coming back</li><li>Constant paw licking or chewing</li><li>Scooting or dragging their bottom</li>"
                   "<li>Restless nights and broken sleep</li><li>Loose stools or an unsettled tummy</li><li>A dull coat or extra shedding</li>"
                   "<li>Less energy for walks and play</li><li>Recurring irritation or hot spots</li></ul>"
                   "<p>These signs can have several causes — not only gut issues or parasites. Your vet can help you find out what your dog needs.</p>"}},
    "faq_how": {"type": "faq", "settings": {
        "title": "How it works: a simple 90-day routine",
        "content": "<p><strong>Days 1–14 · Build the habit.</strong> Start with the recommended serving each day. Keep an eye on appetite, stools and overall comfort.</p>"
                   "<p><strong>Days 15–30 · Track changes.</strong> Watch stool consistency, scratching, scooting and sleep. A quick note each day makes progress easy to see.</p>"
                   "<p><strong>Days 31–90 · Review progress.</strong> Keep following the label directions and look back at your notes. If signs persist, talk to your vet about the next step.</p>"
                   "<p><em>Every dog responds differently. If stools get looser or symptoms worsen, stop use and check with your vet.</em></p>"}},
    "faq_dosing": {"type": "faq", "settings": {
        "title": "Dosing: easy to serve, once a day",
        "content": "<p>Add the daily amount to your dog's food, based on their weight. Every bottle includes a full dosing guide.</p>"
                   "<table><tr><th>Dog's weight</th><th>Daily serving</th></tr><tr><td>Under 10 lbs</td><td>0.5 ml</td></tr>"
                   "<tr><td>10–35 lbs</td><td>1 ml</td></tr><tr><td>35–75 lbs</td><td>2 ml</td></tr><tr><td>Over 75 lbs</td><td>3 ml</td></tr></table>",
        "image": img("pawguard-dosing-chart-by-dog-weight.jpg")}},
    "faq_guarantee": {"type": "faq", "settings": {
        "title": "90-day money-back guarantee",
        "content": "<p>Every bottle is covered by our 90-day money-back guarantee. If your dog doesn't show meaningful improvement over the 90-day routine, email <a href=\"mailto:help@paw-guard.com\">help@paw-guard.com</a> and we'll refund you in full — even if the bottle is empty.</p>"}},
}

full_list = ("<p><strong>Serving size:</strong> 1 ml · <strong>Servings per bottle:</strong> 60</p>"
    "<p><strong>Active ingredients*</strong></p><ul>"
    "<li>Pumpkin Seed Extract</li><li>Marshmallow Root Extract</li><li>Ginger Root Extract</li><li>Fennel Seed Extract</li>"
    "<li>Black Walnut Hull Extract</li><li>Oregon Grape Root Extract</li><li>Olive Leaf Extract</li><li>Clove Extract</li>"
    "<li>Goldenrod Extract</li><li>Wormwood Root Extract (0.85% thujone max)</li>"
    "<li>Probiotic Blend: Lactobacillus plantarum, L. acidophilus, Bifidobacterium lactis, L. reuteri</li></ul>"
    "<p>*Active botanicals and probiotics.</p>"
    "<p><strong>Other ingredients:</strong> vegetable glycerine, purified water, natural duck flavour.</p>"
    "<p><strong>Suitable for dogs from 12 weeks.</strong> Not recommended for pregnant or nursing dogs, or dogs with known tree-nut allergies (black walnut hull).</p>"
    "<p>Every batch is third-party lab tested and made in a GMP-certified facility.</p>")

faq_blocks = {}
faq = [
  ("1", "What signs suggest my dog could use a parasite cleanse?",
   "<p>Many signs are easy to miss because they look like everyday habits: scooting or bottom-dragging, constant paw licking, itchy or flaky skin, loose stools or occasional vomiting, a dull coat, low energy or restless nights. You won't always see worms — many parasites are too small to notice. These signs can also have other causes, so if they persist, check in with your vet.</p>"),
  ("1", "How is this different from a chemical dewormer?",
   "<p>Harsh dewormers usually target adult worms and stop there — they don't support the gut afterwards. PawGuard combines natural botanicals that support the body in addressing parasites at every life stage (eggs, larvae and adults) with a probiotic blend that helps restore healthy gut flora. Gentle enough for daily use.</p>"),
  ("1", "Will my dog pass visible worms?",
   "<p>Sometimes, but often not — and that's normal. Most parasites are microscopic. Rather than a one-off purge, PawGuard supports your dog's gut steadily over the full 90-day routine.</p>"),
  ("1", "My dog tested negative for parasites. Is this still worth it?",
   "<p>It can be. A single stool test only captures one moment and doesn't always catch everything, and daily walks, parks and other dogs mean exposure is ongoing. Supporting the gut every day helps your dog stay resilient either way. Your vet can advise on what's right for your dog.</p>"),
  ("1", "How soon will I see results?",
   "<p>Many owners notice changes within the first couple of weeks — firmer stools, less scooting, calmer nights. Paw licking often eases after that. The full 90-day routine gives the most noticeable, lasting results. Every dog is different.</p>"),
  ("1", "How much do I give my dog?",
   "<p>Once a day in food, by weight: <strong>under 10 lbs</strong> 0.5 ml · <strong>10–35 lbs</strong> 1 ml · <strong>35–75 lbs</strong> 2 ml · <strong>over 75 lbs</strong> 3 ml. A full dosing guide comes with every bottle.</p>"),
  ("2", "When will my order ship?", "<p>Orders ship the next day, 7 days a week.</p>"),
  ("2", "How long does delivery take?", "<p>Usually 4–7 business days within the US. You'll get a tracking link by email as soon as your order ships.</p>"),
  ("2", "Do you offer free shipping?", "<p>Yes — US orders of $54 or more ship free. Orders under $54 ship for $6.99.</p>"),
  ("2", "How do I track my order?", "<p>Use the tracking link in your shipping confirmation email. Need help? Email <a href=\"mailto:help@paw-guard.com\">help@paw-guard.com</a>.</p>"),
  ("3", "What payment methods do you accept?", "<p>All major credit and debit cards plus the express payment options shown at checkout. Checkout is secure and encrypted.</p>"),
  ("3", "How does the subscription work?", "<p>Subscribe and save an extra 20%. Your order arrives automatically — 1 bottle every month, 2 bottles every 2 months, or 3 bottles every 3 months. Pause, change or cancel anytime from your account. No commitment.</p>"),
  ("3", "What is the 90-day money-back guarantee?", "<p>If your dog doesn't show meaningful improvement within 90 days, email <a href=\"mailto:help@paw-guard.com\">help@paw-guard.com</a> and we'll refund you in full — even if the bottle is empty.</p>"),
  ("3", "Can I change or cancel my order?", "<p>Email <a href=\"mailto:help@paw-guard.com\">help@paw-guard.com</a> as soon as possible. If your order hasn't shipped yet, we'll update or cancel it for you.</p>"),
]
for i, (tab, q, a) in enumerate(faq, 1):
    faq_blocks[f"q{i}"] = {"type": "q", "settings": {"tab": tab, "question": q, "answer": a}}

compare_rows = [
  ("Less itching & paw licking", "Noticeable in 2–3 weeks", True, "Often slower"),
  ("Supports every life stage", "Eggs, larvae & adults", False, "Often adults only"),
  ("Supports the gut", "Probiotic blend", False, "Gut left unsupported"),
  ("Made for absorption", "Liquid drops", False, "Chews & powders absorb less"),
  ("Natural botanicals", "No harsh additives", True, "Mostly natural"),
  ("Proven by owners", "35,000+ dog owners", False, "Limited reviews"),
]
compare_blocks = {f"r{i}": {"type": "row", "settings": {"label": l, "us_text": u, "them_yes": y, "them_text": t}}
                  for i, (l, u, y, t) in enumerate(compare_rows, 1)}

template = {
  "sections": {
    "hero": {
      "type": "pg-product-hero",
      "blocks": hero_blocks,
      "block_order": list(hero_blocks),
      "settings": {
        "show_rating": False,
        "eyebrow": "Trusted by 35,000+ dog owners",
        "headline": "Less tummy trouble. More tail-wagging moments.",
        "tab_description": "<p>Support your dog from the inside out. PawGuard Parasite Cleanse Drops are made for dogs dealing with:</p>"
                           "<ul><li>Recurring itching, scooting and paw licking</li><li>Loose stools and digestive upset</li><li>Restless nights and low energy</li></ul>"
                           "<p>A daily liquid cleanse that supports the body in addressing gut parasites at every life stage — eggs, larvae and adults.</p>",
        "proof_line": "Trusted by 35,000+ dog owners",
        "tab_benefits": "<ul><li><strong>Supports digestive health</strong> — botanicals plus a probiotic blend for a balanced, comfortable gut</li>"
                        "<li><strong>Liquid for easy absorption</strong> — mixes straight into food or water</li>"
                        "<li><strong>Gentle, natural formula</strong> — no harsh additives, made for daily use</li>"
                        "<li><strong>Duck-flavoured</strong> — most dogs take it like a treat</li>"
                        "<li><strong>Third-party tested</strong> — every batch, made in a GMP-certified facility</li></ul>",
        "tab_dosing": "<p>Shake well. Add to food or water once a day, by weight:</p>"
                      "<ul><li>Under 10 lbs — ½ dropper (0.5 ml)</li><li>10–35 lbs — 1 dropper (1 ml)</li><li>35–75 lbs — 2 droppers (2 ml)</li><li>Over 75 lbs — 3 droppers (3 ml)</li></ul>"
                      "<p>Full daily dose for 21 days, then continue daily — or as directed by your veterinarian.</p>",
        "tag_1": "", "tag_2": "Most Popular", "tag_3": "Best Value",
        "bundle_img_1": img("pawguard-parasite-cleanse-drops-1-bottle.jpg"),
        "bundle_img_2": img("pawguard-parasite-cleanse-drops-2-bottles.jpg"),
        "bundle_img_3": img("pawguard-parasite-cleanse-drops-3-bottles.jpg"),
        "sub_title": "Subscribe & save an extra 20%",
        "sub_note": "Ships automatically · Cancel or adjust anytime",
        "stock_text": "In stock, ready to ship by",
        "guarantee_line": "90-day money-back guarantee · Free US shipping over $54"
      }
    },
    "deeper": {
      "type": "pg-image-text",
      "settings": {
        "heading": "What you see often starts deeper down",
        "text": "<p>A large share of a dog's natural defences lives in the gut — so what happens there shows up everywhere: skin, energy, sleep and digestion.</p>"
                "<p>Many quick fixes only work on the surface — a shampoo, a chew, a spray. They calm the signs for a while, but the cause often sits somewhere else.</p>"
                "<p>Many recurring signs trace back to an imbalance in the gut. Support the gut, and you support everything that depends on it.</p>",
        "image": img("dog-gut-health-illustration.jpg"), "caption": "", "image_left": False, "bg": "white"
      }
    },
    "source": {
      "type": "pg-image-text",
      "blocks": {
        "c1": {"type": "check", "settings": {"title": "Less scratching and paw licking", "text": "Many owners notice a difference within 2–3 weeks."}},
        "c2": {"type": "check", "settings": {"title": "Supports the gut at the source", "text": "Botanicals plus a probiotic blend, working where it matters."}},
        "c3": {"type": "check", "settings": {"title": "Liquid drops for absorption", "text": "Made to reach the gut directly — easy to mix into food."}},
        "c4": {"type": "check", "settings": {"title": "Trusted by 35,000+ dog owners", "text": "Backed by our 90-day money-back guarantee."}}
      },
      "block_order": ["c1", "c2", "c3", "c4"],
      "settings": {
        "heading": "Works at the source, not the surface",
        "text": "<p>PawGuard starts in the gut, with traditional botanicals and a probiotic blend — in a liquid format made so the actives can do their work.</p>",
        "image": img("pawguard-drops-added-to-dog-food.jpg"), "image_left": True, "bg": "white"
      }
    },
    "vet": {
      "type": "pg-vet",
      "settings": {
        "enabled": True, "heading": "Reviewed by a veterinarian",
        "photo": img("pawguard-veterinarian-petya-georgieva.jpg"), "quote": "",
        "summary": "Our formula was reviewed by a practising veterinarian.",
        "name": "Dr. Petya Georgieva", "title": "Veterinarian · 12 years of practice",
        "disclosure": "Compensated for her time."
      }
    },
    "ingredients": {
      "type": "pg-ingredients",
      "blocks": {
        "i1": {"type": "card", "settings": {"image": img("black-walnut-hull.jpg"), "tag": "Cleanse", "title": "Black Walnut Hull",
               "text": "A traditional botanical that supports the body in addressing parasites at every life stage."}},
        "i2": {"type": "card", "settings": {"image": img("wormwood.jpg"), "tag": "Cleanse", "title": "Wormwood",
               "text": "A classic herbal cleanse ingredient, carefully dosed (0.85% thujone max) for dogs."}},
        "i3": {"type": "card", "settings": {"image": img("oregon-grape-root.jpg"), "tag": "Gut support", "title": "Oregon Grape Root",
               "text": "A berberine-rich root that helps support a calm, balanced digestive tract."}}
      },
      "block_order": ["i1", "i2", "i3"],
      "settings": {
        "heading": "Active ingredients that work at the source",
        "subheading": "Each active is chosen to support a cleanse at every life stage — then help the gut rebalance.",
        "full_list": full_list
      }
    },
    "compare": {
      "type": "pg-comparison",
      "blocks": compare_blocks,
      "block_order": list(compare_blocks),
      "settings": {
        "heading": "Why one ingredient isn't enough",
        "subheading": "Most supplements target just one thing. PawGuard combines botanicals, a probiotic blend and a liquid format — at the source.",
        "us_image": img("pawguard-parasite-cleanse-drops-1-bottle.jpg"), "us_label": "PawGuard Cleanse",
        "them_image": img("typical-supplement-tub.jpg"), "them_label": "Typical chews & powders"
      }
    },
    "faq": {
      "type": "pg-faq-tabs",
      "blocks": faq_blocks,
      "block_order": list(faq_blocks),
      "settings": {"heading": "Frequently asked questions", "subheading": "Everything you need to know",
                   "tab_1": "Product", "tab_2": "Shipping", "tab_3": "Orders & payment"}
    }
  },
  "order": ["hero", "deeper", "source", "vet", "ingredients", "compare", "faq"]
}

out = pathlib.Path(__file__).parent / "templates" / "product.pawguard.json"
out.write_text(json.dumps(template, ensure_ascii=False, indent=2))
print("wrote", out, len(out.read_text()), "bytes")
