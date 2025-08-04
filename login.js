import { supabase } from './supabase.js';

document.getElementById("login-btn").addEventListener("click", async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error("Login failed:", error.message);
  }
});
