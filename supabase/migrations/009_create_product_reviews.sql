-- 009: SKU 客戶評價 (K3 2026-10-28 方案A · A1批)
-- 紅線 (§0.23 + src/data/product-reviews.ts 头): 0 編造 — 全部真实提交, status 強制 pending, 審核通過才可見
-- 審核操作: Supabase Studio → product_reviews 表 (service role 繞過 RLS), status: pending → approved/rejected
create extension if not exists pgcrypto;

create table if not exists public.product_reviews (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  locale text not null check (locale in ('zh-hk','en','ja')),
  author text not null default '匿名' check (char_length(btrim(author)) between 1 and 40),
  rating int not null check (rating between 1 and 5),
  title text check (title is null or char_length(title) <= 80),
  body text not null check (char_length(btrim(body)) between 10 and 1000),
  consent boolean not null default false,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  ip_hash text not null,
  created_at timestamptz not null default now(),
  moderated_at timestamptz
);

create index if not exists idx_product_reviews_slug_status
  on public.product_reviews (slug, status, created_at desc);

-- 每人每 SKU 每日一条 (DB 級頻控; API 无 service key, 由唯一表达式索引兜底)
create unique index if not exists uq_product_reviews_iphash_day
  on public.product_reviews (slug, ip_hash, ((created_at at time zone 'utc')::date));

alter table public.product_reviews enable row level security;

drop policy if exists "anon insert pending" on public.product_reviews;
create policy "anon insert pending" on public.product_reviews
  for insert to anon
  with check (
    status = 'pending'
    and rating between 1 and 5
    and consent = true
    and char_length(btrim(body)) between 10 and 1000
    and locale in ('zh-hk','en','ja')
  );

drop policy if exists "anon read approved" on public.product_reviews;
create policy "anon read approved" on public.product_reviews
  for select to anon
  using (status = 'approved');
