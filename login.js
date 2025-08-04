// login.js
import { supabase } from './supabase.js';

const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    alert('Login failed: ' + error.message);
  }
});
