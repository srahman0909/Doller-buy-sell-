import { supabase } from './supabase.js';

function updateBuyBDT() {
  const amount = parseFloat(document.getElementById('buyAmount').value) || 0;
  document.getElementById('buyBDT').innerText = amount * 129;
}

function updateSellBDT() {
  const amount = parseFloat(document.getElementById('sellAmount').value) || 0;
  const wallet = document.getElementById('sellWallet').value;
  let rate = wallet === "Payeer" ? 120 : 124;
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

function updateCoinBDT() {
  const amount = parseFloat(document.getElementById('coinAmount').value) || 0;
  const total = ((amount / 500) * 165) - 5;
  document.getElementById('coinBDT').innerText = total > 0 ? total.toFixed(2) : 0;
}

async function uploadScreenshot(file, prefix) {
  const { data, error } = await supabase.storage
    .from('screenshots')
    .upload(`${prefix}-${Date.now()}`, file);
  if (error) throw error;
  return data.path;
}

export async function submitBuy(e) {
  e.preventDefault();
  try {
    const amount = document.getElementById('buyAmount').value;
    const wallet = document.getElementById('buyWallet').value;
    const address = document.getElementById('buyAddress').value;
    const screenshot = document.getElementById('buyScreenshot').files[0];
    const txnId = document.getElementById('buyTxnId').value;

    const path = await uploadScreenshot(screenshot, "buy");

    await supabase.from("orders").insert({
      type: "buy",
      amount,
      wallet,
      address,
      transaction_id: txnId,
      screenshot_url: path,
      status: "pending"
    });

    alert("✅ Buy order submitted!");
  } catch (err) {
    alert("❌ Order failed!");
  }
}

export async function submitSell(e) {
  e.preventDefault();
  try {
    const amount = document.getElementById('sellAmount').value;
    const wallet = document.getElementById('sellWallet').value;
    const method = document.getElementById('sellMethod').value;
    const number = document.getElementById('sellNumber').value;
    const screenshot = document.getElementById('sellScreenshot').files[0];

    const path = await uploadScreenshot(screenshot, "sell");

    await supabase.from("orders").insert({
      type: "sell",
      amount,
      wallet,
      payment_method: method,
      user_number: number,
      screenshot_url: path,
      status: "pending"
    });

    alert("✅ Sell order submitted!");
  } catch (err) {
    alert("❌ Order failed!");
  }
}

export async function submitCoin(e) {
  e.preventDefault();
  try {
    const amount = document.getElementById('coinAmount').value;
    const method = document.getElementById('coinMethod').value;
    const number = document.getElementById('coinNumber').value;
    const screenshot = document.getElementById('coinScreenshot').files[0];

    const path = await uploadScreenshot(screenshot, "coin");

    await supabase.from("orders").insert({
      type: "coin",
      amount,
      wallet: "Payeer",
      payment_method: method,
      user_number: number,
      screenshot_url: path,
      status: "pending"
    });

    alert("✅ Coin sell order submitted!");
  } catch (err) {
    alert("❌ Order failed!");
  }
}
