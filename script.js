function openBuy() {
    document.getElementById("form-section").innerHTML = `
        <h2>Buy Dollar 💵</h2>
        <form onsubmit="submitBuy(event)">
            <label>Enter Dollar Amount (Min $1):</label>
            <input type="number" id="buyAmount" min="1" required oninput="updateBuyBDT()">
            
            <label>Select Wallet:</label>
            <select id="buyWallet" required>
                <option value="">Select Wallet</option>
                <option value="Binance">Binance</option>
                <option value="Bybit">Bybit</option>
                <option value="Payeer">Payeer</option>
            </select>

            <label>Wallet UID / Address:</label>
            <input type="text" id="buyUID" required>

            <label>Transaction ID:</label>
            <input type="text" id="buyTxnID" required>

            <label>Upload Transaction Screenshot:</label>
            <input type="file" id="buyScreenshot" required>

            <p><strong>Total Payment (BDT):</strong> <span id="buyBDT">0</span>৳</p>
            <p>Send money to: <strong>bKash Personal 01970225105</strong></p>

            <button type="submit">Submit Buy Order</button>
        </form>
    `;
}

function updateBuyBDT() {
    const amount = parseFloat(document.getElementById("buyAmount").value) || 0;
    document.getElementById("buyBDT").innerText = amount * 129;
}

function submitBuy(e) {
    e.preventDefault();
    alert("Buy order submitted! ✅ (Admin will verify)");
}

// Sell Dollar
function openSell() {
    document.getElementById("form-section").innerHTML = `
        <h2>Sell Dollar 💲</h2>
        <form onsubmit="submitSell(event)">
            <label>Enter Dollar Amount (Min $1):</label>
            <input type="number" id="sellAmount" min="1" required oninput="updateSellBDT()">

            <label>Select Wallet:</label>
            <select id="sellWallet" required onchange="updateSellBDT()">
                <option value="">Select Wallet</option>
                <option value="Binance">Binance</option>
                <option value="Bybit">Bybit</option>
                <option value="Payeer">Payeer</option>
            </select>

            <label>Receiver (bKash/Nagad) Number:</label>
            <input type="text" id="receiverNumber" required>

            <label>Transaction Screenshot:</label>
            <input type="file" id="sellScreenshot" required>

            <p><strong>Total You Will Get (BDT):</strong> <span id="sellBDT">0</span>৳</p>

            <button type="submit">Submit Sell Order</button>
        </form>
    `;
}

function updateSellBDT() {
    const amount = parseFloat(document.getElementById("sellAmount").value) || 0;
    const wallet = document.getElementById("sellWallet").value;
    let rate = 0;
    if (wallet === "Payeer") rate = 121;
    else if (wallet === "Binance" || wallet === "Bybit") rate = 124;
    const total = (amount * rate) - 5;
    document.getElementById("sellBDT").innerText = total > 0 ? total : 0;
}

function submitSell(e) {
    e.preventDefault();
    alert("Sell order submitted! ✅ (Admin will review)");
}

// Coin Sell
function openCoinSell() {
    document.getElementById("form-section").innerHTML = `
        <h2>Coin Sell 🪙</h2>
        <form onsubmit="submitCoin(event)">
            <label>Enter Coin Amount (Min 500):</label>
            <input type="number" id="coinAmount" min="500" required oninput="updateCoinBDT()">

            <label>Payeer ID (Send to P1098742287):</label>
            <input type="text" id="coinUID" required>

            <label>Transaction Screenshot:</label>
            <input type="file" id="coinScreenshot" required>

            <p><strong>Total You Will Get:</strong> <span id="coinBDT">0</span>৳</p>
            <p>5৳ will be deducted as send money fee</p>

            <button type="submit">Submit Coin Sell</button>
        </form>
    `;
}

function updateCoinBDT() {
    const amount = parseFloat(document.getElementById("coinAmount").value) || 0;
    const total = (amount / 500) * 170 - 5;
    document.getElementById("coinBDT").innerText = total > 0 ? total : 0;
}

function submitCoin(e) {
    e.preventDefault();
    alert("Coin Sell Order Submitted! ✅");
}
