// Form Toggle
function showForm(type) {
  document.getElementById("buyForm").style.display = (type === 'buy') ? "block" : "none";
  document.getElementById("sellForm").style.display = (type === 'sell') ? "block" : "none";
  document.getElementById("coinForm").style.display = (type === 'coin') ? "block" : "none";
}

// Buy Calculation
function calculateBuy() {
  const rate = 129;
  const amount = parseFloat(document.getElementById("buyAmount").value);
  const total = amount >= 1 ? (amount * rate).toFixed(2) : 0;
  document.getElementById("buyTotal").value = total;
}

// Sell Calculation
function calculateSell() {
  const amount = parseFloat(document.getElementById("sellAmount").value);
  const wallet = document.getElementById("sellWallet").value;
  let rate = 0;

  if (wallet === "Payeer") rate = 121;
  else if (wallet === "Binance" || wallet === "Bybit") rate = 124;

  if (amount >= 1 && rate > 0) {
    const total = (amount * rate - 5).toFixed(2);
    document.getElementById("sellTotal").value = total;
  } else {
    document.getElementById("sellTotal").value = "";
  }
}

// Coin Sell Calculation
function calculateCoin() {
  const coinAmount = parseFloat(document.getElementById("coinAmount").value);
  const ratePer500 = 170;
  const fee = 5;

  if (coinAmount >= 500) {
    const total = ((coinAmount / 500) * ratePer500 - fee).toFixed(2);
    document.getElementById("coinTotal").value = total;
  } else {
    document.getElementById("coinTotal").value = "";
  }
}

// Admin Status (demo purpose)
function updateAdminStatus() {
  const now = new Date();
  const hour = now.getHours();
  const isActive = (hour >= 8 && hour < 23); // 8AM - 11PM

  const statusDot = document.getElementById("adminDot");
  const statusText = document.getElementById("adminText");

  if (isActive) {
    statusDot.style.backgroundColor = "#27ae60";
    statusText.innerText = "Active";
  } else {
    statusDot.style.backgroundColor = "#e74c3c";
    statusText.innerText = "Offline";
  }
}

// Initial calls
updateAdminStatus();
setInterval(updateAdminStatus, 60000); // Every 1 minute
