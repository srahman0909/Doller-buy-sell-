

import { createClient } from '@supabase/supabase-js';


const SUPABASE_URL = "https://piscmjpcvcgefxqohjki.supabase.co";


const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpc2NtanBjd mNnZWZ4cW9oamtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2MDAwMDAsImV4cCI6MjAzODE3NjAwMH0.J9hHqSe5R-L5o5mXvwO6fCznPqf7LZlqgCJQAvP0Ywo";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
