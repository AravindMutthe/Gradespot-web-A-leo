import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-side Supabase access. The data layer uses the public (anon) client
// for reads allowed by RLS and the service-role client for lead inserts.
// Both are optional: when env vars are absent the data layer falls back to
// the local migrated content in src/data/.
//
// Every request gets a hard 5s timeout: in sandboxed build environments
// without direct egress, an unbounded fetch can hang static generation.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const fetchWithTimeout: typeof fetch = (input, init) =>
  fetch(input, { ...init, signal: init?.signal ?? AbortSignal.timeout(5000) });

function makeClient(key: string): SupabaseClient {
  return createClient(url as string, key, {
    auth: { persistSession: false },
    global: { fetch: fetchWithTimeout },
  });
}

export function getAnonClient(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  return makeClient(anonKey);
}

export function getServiceClient(): SupabaseClient | null {
  if (!url || !serviceRoleKey) return null;
  return makeClient(serviceRoleKey);
}

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}
