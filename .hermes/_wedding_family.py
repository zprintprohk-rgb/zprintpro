# -*- coding: utf-8 -*-
import io, json
imp = json.load(io.open('.hermes/analysis/gsc-product-page-imps-28d.json', encoding='utf-8'))
tg = ['drink-tokens','cafe-table-cards','save-the-date-cards','wedding-thank-you-cards','wedding-seating-charts','wedding-suite-bundle','wedding-place-cards','wedding-invitations','place-cards','foil-wedding-invitations','eco-tote-bag','postcard-set','japan-doujin','doujinshi-printing','fruit-food-label-stickers','security-stickers','fluorescent-stickers','removable-stickers','small-bags','gang-run-card-boxes','foil-red-packets','embossed-red-packets','cartoon-red-packets','custom-red-packets','eco-red-packets','large-red-packets']
for s in tg:
    print('  %-28s %s' % (s, imp.get(s, [0,0])))
print()
print('total tracked slugs:', len(imp))
print('slugs 0<imps<=5:', sorted([ (s,v[0]) for s,v in imp.items() if 0 < v[0] <= 5], key=lambda x:x[1]))
