
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = "https://piscmjpcvcgefxqohjki.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpc2NtanBjdmNnZWZ4cW9oamtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMzczMjIsImV4cCI6MjA2OTcxMzMyMn0.GIrT97QUl-C6BdooXAXUDVrxJKtHeHLikhX5HSk2UHA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
