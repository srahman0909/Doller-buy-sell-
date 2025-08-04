function updateBuyBDT() {
  const amount = parseFloat(document.getElementById('buyAmount').value) || 0;
  document.getElementById('buyBDT').innerText = amount * 129;
}

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

function updateCoinBDT() {
  const amount = parseFloat(document.getElementById('coinAmount').value) || 0;
  const total = ((amount / 500) * 170) - 5;
  document.getElementById('coinBDT').innerText = total > 0 ? total.toFixed(2) : 0;
}

function submitBuy(e) {
  e.preventDefault();
  alert("✅ Buy order submitted! Admin will verify.");
}

function submitSell(e) {
  e.preventDefault();
  alert("✅ Sell order submitted! Admin will verify.");
}

function submitCoin(e) {
  e.preventDefault();
  alert("✅ Coin Sell order submitted! Admin will verify.");
}
