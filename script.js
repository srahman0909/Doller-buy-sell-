document.getElementById("buy-amount").addEventListener("input", function() {
  const amount = parseFloat(this.value) || 0;
  document.getElementById("buy-total").textContent = amount * 129;
});
document.getElementById("sell-amount").addEventListener("input", function() {
  const amount = parseFloat(this.value) || 0;
  const wallet = document.getElementById("sell-wallet").value;
  let rate = 121;
  if (wallet.includes("Binance") || wallet.includes("Bybit")) rate = 124;
  const total = amount * rate - 5;
  document.getElementById("sell-total").textContent = total >= 0 ? total : 0;
});
document.getElementById("coin-amount").addEventListener("input", function() {
  const coins = parseInt(this.value) || 0;
  let total = (coins / 500) * 170 - 5;
  document.getElementById("coin-total").textContent = total >= 0 ? total : 0;
});
