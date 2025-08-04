function updateBuyBDT() {
  const amount = parseFloat(document.getElementById("buyAmount").value) || 0;
  document.getElementById("buyBDT").innerText = amount * 129;
}

function submitBuy(e) {
  e.preventDefault();
  alert("Buy order submitted ✅ (Admin will verify)");
}

function updateSellBDT() {
  const amount = parseFloat(document.getElementById("sellAmount").value) || 0;
  const wallet = document.getElementById("sellWallet").value;
  let rate = 0;
  if (wallet === "Payeer") rate = 121;
  else if (wallet === "Binance" || wallet === "Bybit") rate = 124;
  const total = amount * rate - 5;
  document.getElementById("sellBDT").innerText = total > 0 ? total : 0;
}

function submitSell(e) {
  e.preventDefault();
  alert("Sell order submitted ✅ (Admin will review)");
}

function updateCoinBDT() {
  const amount = parseFloat(document.getElementById("coinAmount").value) || 0;
  const total = (amount / 500) * 170 - 5;
  document.getElementById("coinBDT").innerText = total > 0 ? total : 0;
}

function submitCoin(e) {
  e.preventDefault();
  alert("Coin Sell Order Submitted ✅");
}
