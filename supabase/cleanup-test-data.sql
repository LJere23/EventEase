-- EventEase — Test Data Cleanup Script
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/wxmoinkgtmadcqmasypo/sql)
-- STEP 1: Review what's in the database first
-- Run the SELECT statements below before running any DELETE statements.

-- ─── SEE ALL USERS ───────────────────────────────────────────────────────────
SELECT au.email, p.full_name, p.role, p.created_at
FROM auth.users au
LEFT JOIN public.profiles p ON p.id = au.id
ORDER BY p.created_at DESC;

-- ─── SEE ALL VENDOR PROFILES ─────────────────────────────────────────────────
SELECT vp.business_name, vp.category, vp.city, au.email, vp.created_at
FROM public.vendor_profiles vp
JOIN public.profiles p ON p.id = vp.user_id
JOIN auth.users au ON au.id = p.id
ORDER BY vp.created_at DESC;

-- ─── SEE ALL EVENTS ──────────────────────────────────────────────────────────
SELECT e.title, e.type, e.date, au.email, e.created_at
FROM public.events e
JOIN public.profiles p ON p.id = e.user_id
JOIN auth.users au ON au.id = p.id
ORDER BY e.created_at DESC;


-- ════════════════════════════════════════════════════════════════════════════
-- AFTER REVIEWING THE ABOVE — run only the sections you need:
-- ════════════════════════════════════════════════════════════════════════════

-- ─── DELETE ALL VENDOR PROFILES (clears fake/test vendors) ───────────────────
-- Uncomment and run when ready:
-- DELETE FROM public.vendor_profiles;

-- ─── DELETE FAKE TEST EVENTS ─────────────────────────────────────────────────
-- To delete ALL events (uncomment):
-- DELETE FROM public.events;

-- To delete events for a SPECIFIC test user (replace email):
-- DELETE FROM public.events
-- WHERE user_id = (SELECT id FROM auth.users WHERE email = 'testemail@example.com');

-- ─── DELETE A SPECIFIC USER ACCOUNT ─────────────────────────────────────────
-- Replace with the test account email. This cascades to profiles + vendor_profiles + events.
-- DELETE FROM auth.users WHERE email = 'testemail@example.com';

-- ─── DELETE ALL QUOTE REQUESTS (test quotes) ─────────────────────────────────
-- DELETE FROM public.quote_requests;

-- ─── DELETE ALL BOOKINGS (test bookings) ─────────────────────────────────────
-- DELETE FROM public.bookings WHERE true;
