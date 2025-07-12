import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ujbytwqmhwcducxtkmix.supabase.co'; // ⬅️ replace this
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqYnl0d3FtaHdjZHVjeHRrbWl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjMzNjI3MiwiZXhwIjoyMDY3OTEyMjcyfQ.tt7WLRNSsmTz39XaCG6g8N_bBECrKCeAWuYFnkGkHIU'; // ⬅️ your anon public key

export const supabase = createClient(supabaseUrl, supabaseKey);
