# -*- coding: utf-8 -*-
import json
with open(r'F:\zprintpro-nextjs\.hermes\revenue-snapshot-2026-08-21.json', 'r', encoding='utf-8') as f:
    s = json.load(f)
print('=== snapshot validation ===')
print('  date:', s['date'])
print('  cron_id:', s['cron_id'])
print('  version:', s['version'])
print('  m3_north_star.8_12_decision_point_post_review present:', bool(s['m3_north_star']['8_12_decision_point_post_review']))
print('  m3_north_star.verification_table_7_items_8_21_actual_status present:', bool(s['m3_north_star']['verification_table_7_items_8_21_actual_status']))
print('  anomalies count:', len(s['anomalies']))
print('  data_sources.gsc.country_dimension_breakthrough:', s['data_sources']['gsc']['country_dimension_breakthrough'])
print('  funnel country_breakdown keys:', list(s['funnel']['country_breakdown'].keys()))
print('  funnel payment_breakdown keys:', list(s['funnel']['payment_breakdown'].keys()))
print('  Top-level keys:', list(s.keys()))
print('  m3_north_star keys:', list(s['m3_north_star'].keys()))
print('  verification_table_7_items keys:', list(s['m3_north_star']['verification_table_7_items_8_21_actual_status'].keys()))
print('  data_sources.gsc.data keys:', list(s['data_sources']['gsc']['data'].keys()))
