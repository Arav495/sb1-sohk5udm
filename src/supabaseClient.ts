import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ujbytwqmhwcducxtkmix.supabase.co'; // ⬅️ replace this
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqYnl0d3FtaHdjZHVjeHRrbWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMzYyNzIsImV4cCI6MjA2NzkxMjI3Mn0.yN6eJo_IIsUq7HUxjwKp2WzL6mi3EvdQrwaWTXsSF4w'; // ⬅️ your anon public key

export const supabase = createClient(supabaseUrl, supabaseKey);
