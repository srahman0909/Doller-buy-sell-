import { supabase } from './supabase.js';

// শুধু Admin লগইন চেক (আপনার Admin Gmail দিয়ে replace করুন)
const adminEmail = "jimmd8467@gmail.com";

supabase.auth.getUser().then(({ data: { user } }) => {
  if (!user || user.email !== adminEmail) {
    alert("Access Denied! Admin only.");
    window.location.href = "login.html";
  } else {
    loadOrders();
  }
});

async function loadOrders() {
  const container = document.getElementById("orders-container");
  container.innerHTML = "Fetching orders...";

  const { data, error } = await supabase.from("orders").select("*").eq("status", "pending");

  if (error) {
    container.innerHTML = "Error loading orders!";
    return;
  }

  if (data.length === 0) {
    container.innerHTML = "No pending orders.";
    return;
  }

  container.innerHTML = "";

  data.forEach((order) => {
    const div = document.createElement("div");
    div.className = "order-card";

    div.innerHTML = `
      <p><strong>Type:</strong> ${order.type}</p>
      <p><strong>Amount:</strong> ${order.amount}</p>
      <p><strong>Wallet:</strong> ${order.wallet}</p>
      <p><strong>User:</strong> ${order.user_email}</p>
      <p><strong>Time:</strong> ${new Date(order.created_at).toLocaleString()}</p>
      <button onclick="approveOrder(${order.id})">✅ Approve</button>
      <button onclick="rejectOrder(${order.id})">❌ Reject</button>
      <hr>
    `;

    container.appendChild(div);
  });
}

window.approveOrder = async function (id) {
  await supabase.from("orders").update({ status: "approved" }).eq("id", id);
  alert("Order Approved ✅");
  loadOrders();
};

window.rejectOrder = async function (id) {
  await supabase.from("orders").update({ status: "rejected" }).eq("id", id);
  alert("Order Rejected ❌ Sent to Refund");
  loadOrders();
};
