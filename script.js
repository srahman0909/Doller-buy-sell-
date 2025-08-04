// Buy Calculation
function calculateBuyTotal() {
  const amount = parseFloat(document.getElementById("buy-amount").value);
  const rate = 129;
  if (!isNaN(amount)) {
    document.getElementById("buy-total").innerText = (amount * rate).toFixed(2) + " BDT";
  } else {
    document.getElementById("buy-total").innerText = "0 BDT";
  }
}

// Sell Calculation
function calculateSellTotal() {
  const amount = parseFloat(document.getElementById("sell-amount").value);
  const wallet = document.getElementById("sell-wallet").value;
  let rate = 0;
  
  if (wallet === "Payeer") {
    rate = 121;
  } else if (wallet === "Binance" || wallet === "Bybit") {
    rate = 124;
  }

  if (!isNaN(amount) && rate > 0) {
    const total = (amount * rate) - 5;
    document.getElementById("sell-total").innerText = total.toFixed(2) + " BDT";
  } else {
    document.getElementById("sell-total").innerText = "0 BDT";
  }
}

// Coin Sell Calculation
function calculateCoinSellTotal() {
  const coins = parseFloat(document.getElementById("coin-amount").value);
  const min = 500;
  const rate = 170 / 500; // 1 coin = 0.34 BDT

  if (!isNaN(coins) && coins >= min) {
    const total = (coins * rate) - 5;
    document.getElementById("coin-total").innerText = total.toFixed(2) + " BDT";
  } else {
    document.getElementById("coin-total").innerText = "Minimum 500 Coins Required";
  }
}

// Admin Online/Offline Toggle (For Demo Only)
function toggleAdminStatus(isOnline) {
  const dot = document.querySelector(".status .dot");
  if (isOnline) {
    dot.style.backgroundColor = "green";
  } else {
    dot.style.backgroundColor = "red";
  }
}
