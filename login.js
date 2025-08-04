document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");

    loginBtn.addEventListener("click", async function () {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: "google",
        });

        if (error) {
            alert("Login Failed: " + error.message);
            console.error(error);
        }
    });
});
