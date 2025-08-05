// login.js

import { supabase } from './supabase.js';

// Sign in button clicked
document.getElementById("login-btn").addEventListener("click", async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    alert("Login failed: " + error.message);
  }
});

// After login (when user comes back from Google)
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    window.location.href = "dashboard.html";
  }
});
