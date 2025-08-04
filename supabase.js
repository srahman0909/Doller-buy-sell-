// supabase.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://piscmjpcvcgefxqohjki.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpc2NtanBjdmNnZWZ4cW9oamtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMzczMjIsImV4cCI6MjA2OTcxMzMyMn0.GIrT97QUl-C6BdooXAXUDVrxJKtHeHLikhX5HSk2UHA";

export const supabase = createClient(supabaseUrl, supabaseKey);
