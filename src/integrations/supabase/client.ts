
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://clofehcehujszwubdrjo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsb2ZlaGNlaHVqc3p3dWJkcmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NjAxNTUsImV4cCI6MjA1ODUzNjE1NX0.xsEy3HqGkxiBQFn4fi9F3KtDfZSs0URayPPDVv_sXv0";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
