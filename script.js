import { supabase } from './supabase.js';

// BUY SECTION
function updateBuyBDT() {
  const amount = parseFloat(document.getElementById('buyAmount').value) || 0;
  document.getElementById('buyBDT').innerText = amount * 129;
}

async function submitBuy(e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById('buyAmount').value);
  const wallet = e.target.querySelector("select").value;
  const wallet_address = e.target.querySelectorAll("input")[1].value;
  const transaction_id = e.target.querySelectorAll("input")[3].value;
  const screenshot_file = e.target.querySelectorAll("input")[2].files[0];

  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return alert("Login first!");

  const { data: imageData, error: imageError } = await supabase.storage
    .from("screenshots")
    .upload(`buy-${Date.now()}.jpg`, screenshot_file);

  const screenshot_url = imageData?.path
    ? `https://piscmjpcvcgefxqohjki.supabase.co/storage/v1/object/public/screenshots/${imageData.path}`
    : "";

  const { error } = await supabase.from("orders").insert({
    user_email: user.email,
    type: "buy",
    amount,
    wallet,
    wallet_address,
    transaction_id,
    screenshot_url,
    status: "pending",
  });

  if (error) return alert("Order failed!");
  alert("✅ Buy order submitted!");
}

// SELL SECTION
function updateSellBDT() {
  const amount = parseFloat(document.getElementById('sellAmount').value) || 0;
  const wallet = document.getElementById('sellWallet').value;
  let rate = wallet === "Payeer" ? 121 : 124;
  const total = (amount * rate) - 5;
  document.getElementById('sellBDT').innerText = total > 0 ? total : 0;
}

function updateSellAddress() {
  const wallet = document.getElementById('sellWallet').value;
  let address = "—";
  if (wallet === "Payeer") address = "P1098742287";
  else if (wallet === "Binance") address = "1100408485";
  else if (wallet === "Bybit") address = "468787974";
  document.getElementById('walletAddress').innerText = address;
}

async function submitSell(e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById('sellAmount').value);
  const wallet = document.getElementById('sellWallet').value;
  const payment_wallet = e.target.querySelectorAll("select")[1].value;
  const payment_number = e.target.querySelectorAll("input")[2].value;
  const screenshot_file = e.target.querySelectorAll("input")[1].files[0];

  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return alert("Login first!");

  const { data: imageData, error: imageError } = await supabase.storage
    .from("screenshots")
    .upload(`sell-${Date.now()}.jpg`, screenshot_file);

  const screenshot_url = imageData?.path
    ? `https://piscmjpcvcgefxqohjki.supabase.co/storage/v1/object/public/screenshots/${imageData.path}`
    : "";

  const { error } = await supabase.from("orders").insert({
    user_email: user.email,
    type: "sell",
    amount,
    wallet,
    payment_wallet,
    payment_number,
    screenshot_url,
    status: "pending",
  });

  if (error) return alert("Order failed!");
  alert("✅ Sell order submitted!");
}

// COIN SELL SECTION
function updateCoinBDT() {
  const amount = parseFloat(document.getElementById('coinAmount').value) || 0;
  const total = ((amount / 500) * 170) - 5;
  document.getElementById('coinBDT').innerText = total > 0 ? total.toFixed(2) : 0;
}

async function submitCoin(e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById('coinAmount').value);
  const payment_wallet = e.target.querySelectorAll("select")[0].value;
  const payment_number = e.target.querySelectorAll("input")[1].value;
  const screenshot_file = e.target.querySelectorAll("input")[2].files[0];

  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return alert("Login first!");

  const { data: imageData, error: imageError } = await supabase.storage
    .from("screenshots")
    .upload(`coin-${Date.now()}.jpg`, screenshot_file);

  const screenshot_url = imageData?.path
    ? `https://piscmjpcvcgefxqohjki.supabase.co/storage/v1/object/public/screenshots/${imageData.path}`
    : "";

  const { error } = await supabase.from("orders").insert({
    user_email: user.email,
    type: "coin",
    amount,
    wallet: "Payeer",
    payment_wallet,
    payment_number,
    screenshot_url,
    status: "pending",
  });

  if (error) return alert("Order failed!");
  alert("✅ Coin sell order submitted!");
}

// Export functions for inline HTML
window.updateBuyBDT = updateBuyBDT;
window.updateSellBDT = updateSellBDT;
window.updateSellAddress = updateSellAddress;
window.updateCoinBDT = updateCoinBDT;
window.submitBuy = submitBuy;
window.submitSell = submitSell;
window.submitCoin = submitCoin;
