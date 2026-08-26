#!/usr/bin/env python3
# 2026-08-25 P0 #5 24h SLA FAQ en locale
import json
import io
import os

EN_FAQ = {
    "metadata": {
        "slug": "sla-faq",
        "title": "ZprintPro 24-Hour Service Commitment · Eligibility FAQ",
        "description": "ZprintPro 4 types of 24-hour service commitments (response / proofing / SF Express local / digital printing) with eligibility and exclusion conditions, aligned with NAP consistency.",
        "lastUpdated": "2026-08-25",
        "version": "1.0"
    },
    "categories": [
        {
            "id": "sla-response",
            "label": "24-Hour Response",
            "scope": "Inquiry / contact follow-up within 24 hours",
            "faqs": [
                {
                    "question": "What are the eligibility conditions for 24-hour response?",
                    "answer": "Inquiries submitted on business days 9:00-18:00 (UTC+8), with complete contact details (WhatsApp / email / phone) and standard categories (stickers / packaging / paper bags / posters / books), will receive professional follow-up within 24 hours.",
                    "applicable": [
                        "✅ Business days 9:00-18:00 (UTC+8) submission",
                        "✅ Inquiry with complete contact details",
                        "✅ Standard categories (stickers / packaging / paper bags / posters / books)"
                    ],
                    "notApplicable": [
                        "❌ Weekends / Hong Kong public holidays (per government announcement)",
                        "❌ Incomplete inquiry (no contact / no category)",
                        "❌ Cross-border bulk orders (per project timeline)"
                    ]
                },
                {
                    "question": "How are weekends and Hong Kong public holidays handled?",
                    "answer": "On weekends and public holidays, the 24-hour response commitment defers to the next business day 9:00. For urgent cases, contact us via WhatsApp (+86 198 8085 1334) with 'URGENT' tag for priority handling.",
                    "applicable": [
                        "✅ Urgent WhatsApp 'URGENT' tag for priority",
                        "✅ Follow-up within 24 hours after holiday ends"
                    ],
                    "notApplicable": [
                        "❌ 24-hour response guaranteed during holidays"
                    ]
                }
            ]
        },
        {
            "id": "sla-proofing",
            "label": "24-Hour Digital Proofing",
            "scope": "Digital proof delivered within 24 hours",
            "faqs": [
                {
                    "question": "What are the eligibility conditions for 24-hour digital proofing?",
                    "answer": "Submitted on business days 9:00-18:00, with problem-free files (300dpi / CMYK / 3mm bleed / fonts outlined), 100+ quantity, and customer confirmation of proofing need, digital proof is delivered within 24 hours.",
                    "applicable": [
                        "✅ Business days 9:00-18:00 submission",
                        "✅ Problem-free files (300dpi / CMYK / 3mm bleed / fonts outlined)",
                        "✅ 100+ quantity",
                        "✅ Customer confirmation of proofing need"
                    ],
                    "notApplicable": [
                        "❌ Weekends / holidays",
                        "❌ Files requiring correction (1-2 days correction, then 24h restarts)",
                        "❌ Special processes (foil / die-cut / UV / embossing) — switch to offset proofing 3-5 business days",
                        "❌ Quantity < 100 (per special pricing flow)"
                    ]
                },
                {
                    "question": "What if proof files have issues?",
                    "answer": "ZprintPro completes PDF pre-check within 2 hours of order, with free correction of common issues (page count / fonts / bleed). After correction, the 24-hour proofing commitment restarts.",
                    "applicable": [
                        "✅ Free PDF pre-check within 2 hours",
                        "✅ Free correction of common issues (page count / fonts / bleed)",
                        "✅ 24-hour commitment restarts after correction"
                    ],
                    "notApplicable": [
                        "❌ Customer-requested redesign (out of ZprintPro scope)"
                    ]
                }
            ]
        },
        {
            "id": "sla-sf-express",
            "label": "24-Hour SF Express Local",
            "scope": "Hong Kong local SF Express delivery within 24 hours",
            "faqs": [
                {
                    "question": "What are the eligibility conditions for 24-hour SF Express local?",
                    "answer": "Hong Kong local addresses (HK Island / Kowloon / New Territories), submitted before 14:00 on business days (after 14:00: next day), standard size + weight (≤ 30kg, length ≤ 1.5m), delivered within 24 hours by SF Express.",
                    "applicable": [
                        "✅ Hong Kong local addresses (HK Island / Kowloon / New Territories)",
                        "✅ Business days 14:00 cutoff (after 14:00: next day)",
                        "✅ Standard size + weight (≤ 30kg, length ≤ 1.5m)"
                    ],
                    "notApplicable": [
                        "❌ Remote areas (outlying islands / restricted zones, SF surcharge / 2-3 days)",
                        "❌ Oversize (exceeds SF standard, switch to logistics)",
                        "❌ Holidays (SF holiday timing, 1-2 days)"
                    ]
                },
                {
                    "question": "How is SF Express delivery time confirmed?",
                    "answer": "ZprintPro provides SF Express tracking number within 1 hour of order, with real-time delivery tracking. Urgent orders can request SF Express Priority (extra fee applies).",
                    "applicable": [
                        "✅ SF tracking number within 1 hour",
                        "✅ Real-time delivery tracking",
                        "✅ Urgent SF Express Priority available (extra fee)"
                    ],
                    "notApplicable": [
                        "❌ Cross-border (switch to DHL / FedEx, 2-4 days)"
                    ]
                }
            ]
        },
        {
            "id": "sla-digital",
            "label": "24-Hour Digital Printing",
            "scope": "Digital printing completed within 24 hours",
            "faqs": [
                {
                    "question": "What are the eligibility conditions for 24-hour digital printing?",
                    "answer": "Submitted on business days 9:00-18:00, quantity 1-500 (digital economic batch), problem-free files, standard paper (coated / offset / no special paper), digital printing completed within 24 hours.",
                    "applicable": [
                        "✅ Business days 9:00-18:00 submission",
                        "✅ Quantity 1-500 (digital economic batch)",
                        "✅ Problem-free files",
                        "✅ Standard paper (coated / offset / no special paper)"
                    ],
                    "notApplicable": [
                        "❌ Quantity > 500 (switch to offset, 3-5 business days)",
                        "❌ Special paper (FSC / cotton / foil paper, 1-3 days material prep)",
                        "❌ Foil / die-cut / UV / embossing (switch to offset)",
                        "❌ Weekends / holidays"
                    ]
                },
                {
                    "question": "How to choose digital vs offset printing?",
                    "answer": "Digital fits 1-500 copies urgent orders, no plate fee, 24h delivery; offset fits 500+ bulk orders, lower unit price, 3-5 business days. ZprintPro 30-second AI instant quote auto-recommends the best option.",
                    "applicable": [
                        "✅ 1-500 copies: digital (urgent, 24h)",
                        "✅ 500+ copies: offset (bulk, lower unit price)",
                        "✅ ZprintPro 30-second AI quote auto-recommend"
                    ],
                    "notApplicable": [
                        "❌ Special processes always offset (foil / die-cut / UV / embossing)"
                    ]
                }
            ]
        }
    ]
}


def main():
    path = r'F:\zprintpro-nextjs\src\data\faq\en.json'
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with io.open(path, 'w', encoding='utf-8') as f:
        json.dump(EN_FAQ, f, ensure_ascii=False, indent=2)
        f.write('\n')
    with io.open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    total_faqs = sum(len(c['faqs']) for c in data['categories'])
    print(f'en FAQ written: {len(data["categories"])} categories, {total_faqs} FAQs')
    print(f'  file size: {os.path.getsize(path)} bytes')
    print(f'  JSON valid: True')


if __name__ == '__main__':
    main()
