// login.js

document.getElementById("login-btn").addEventListener("click", async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    alert("Login failed: " + error.message);
  }
});

// After login, this runs when user returns from Google
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    window.location.href = "dashboard.html"; // Redirect after successful login
  }
});
