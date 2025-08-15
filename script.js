// ==== CONSTANTS ====
const RATES = {
  BUY: 129,
  SELL_BINANCE: 124,
  SELL_BYBIT: 124,
  SELL_PAYEER: 120,
  COIN_PER_500: 165,
  FEE: 5
};

const ADDRESSES = {
  Binance: "1100408485",
  Bybit:   "468787974",
  Payeer:  "P1098742287"
};

// ==== HELPERS ====
function el(id){ return document.getElementById(id); }

function calcBuyBDT(){
  const usd = parseFloat(el('buy-amount').value) || 0;
  el('buy-bdt').innerText = (usd * RATES.BUY).toFixed(2);
}

function calcSellBDT(){
  const usd = parseFloat(el('sell-amount').value) || 0;
  const w   = el('sell-wallet').value;
  const rate = w === 'Payeer' ? RATES.SELL_PAYEER : RATES.SELL_BINANCE; // Binance/Bybit=124
  const total = Math.max(0, (usd * rate) - RATES.FEE);
  el('sell-bdt').innerText = total.toFixed(2);
}

function updateSellDest(){
  const w = el('sell-wallet').value;
  el('sell-dest').innerText = w ? ADDRESSES[w] : '—';
}

function calcCoinBDT(){
  const coin = parseFloat(el('coin-amount').value) || 0;
  const total = Math.max(0, ((coin / 500) * RATES.COIN_PER_500) - RATES.FEE);
  el('coin-bdt').innerText = total.toFixed(2);
}

// Upload file to Supabase Storage (public bucket: screenshots)
async function uploadScreenshot(file){
  const fileName = `${Date.now()}_${file.name.replace(/\s+/g,'_')}`;
  const { data, error } = await supabaseClient
    .storage
    .from('screenshots')
    .upload(fileName, file, { upsert: false });

  if(error) throw error;

  const { data: pub } = supabaseClient
    .storage
    .from('screenshots')
    .getPublicUrl(data.path);

  return pub.publicUrl;
}

// Insert order to Supabase table: orders
async function insertOrder(payload){
  const { error } = await supabaseClient.from('orders').insert(payload);
  if(error) throw error;
}

// ==== EVENT BINDINGS (when DOM ready) ====
document.addEventListener('DOMContentLoaded', () => {
  // live calculations
  el('buy-amount').addEventListener('input', calcBuyBDT);

  el('sell-amount').addEventListener('input', calcSellBDT);
  el('sell-wallet').addEventListener('change', () => {
    updateSellDest();
    calcSellBDT();
  });

  el('coin-amount').addEventListener('input', calcCoinBDT);

  // BUY submit
  el('buy-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    try{
      const usd   = parseFloat(el('buy-amount').value);
      const wallet= el('buy-wallet').value;
      const userWalletAddr = el('buy-wallet-address').value.trim();
      const txnId = el('buy-txn').value.trim();
      const file  = el('buy-file').files[0];
      if(!file) throw new Error('স্ক্রিনশট নির্বাচন করুন');

      // upload screenshot
      const shotUrl = await uploadScreenshot(file);

      // insert
      await insertOrder({
        type: 'buy',
        amount: usd,
        wallet: wallet,
        wallet_address: userWalletAddr,
        payment_method: 'bKash',
        user_number: null,
        transaction_id: txnId,
        screenshot_url: shotUrl,
        total_bdt: usd * RATES.BUY,
        status: 'pending'
      });

      alert('✅ Buy order submitted!');
      e.target.reset();
      el('buy-bdt').innerText = '0';
    }catch(err){
      alert('❌ ' + err.message);
    }
  });

  // SELL submit
  el('sell-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    try{
      const usd   = parseFloat(el('sell-amount').value);
      const wallet= el('sell-wallet').value;
      const payMethod = el('sell-pay-method').value;
      const number= el('sell-number').value.trim();
      const file  = el('sell-file').files[0];
      if(!wallet) throw new Error('ওয়ালেট নির্বাচন করুন');
      if(!file) throw new Error('স্ক্রিনশট নির্বাচন করুন');

      const rate = wallet === 'Payeer' ? RATES.SELL_PAYEER : RATES.SELL_BINANCE;
      const total = Math.max(0, (usd * rate) - RATES.FEE);

      const shotUrl = await uploadScreenshot(file);

      await insertOrder({
        type: 'sell',
        amount: usd,
        wallet: wallet,
        wallet_address: ADDRESSES[wallet], // where to send $
        payment_method: payMethod,
        user_number: number,
        transaction_id: null,
        screenshot_url: shotUrl,
        total_bdt: total,
        status: 'pending'
      });

      alert('✅ Sell order submitted!');
      e.target.reset();
      el('sell-dest').innerText = '—';
      el('sell-bdt').innerText = '0';
    }catch(err){
      alert('❌ ' + err.message);
    }
  });

  // COIN submit
  el('coin-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    try{
      const coin  = parseFloat(el('coin-amount').value);
      if(coin < 500) throw new Error('নূন্যতম 500 কয়েন');

      const payMethod = el('coin-pay-method').value;
      const number= el('coin-number').value.trim();
      const file  = el('coin-file').files[0];
      if(!file) throw new Error('স্ক্রিনশট নির্বাচন করুন');

      const total = Math.max(0, ((coin / 500) * RATES.COIN_PER_500) - RATES.FEE);

      const shotUrl = await uploadScreenshot(file);

      await insertOrder({
        type: 'coin',
        amount: coin,
        wallet: 'Payeer',
        wallet_address: ADDRESSES.Payeer,
        payment_method: payMethod,
        user_number: number,
        transaction_id: null,
        screenshot_url: shotUrl,
        total_bdt: total,
        status: 'pending'
      });

      alert('✅ Coin sell submitted!');
      e.target.reset();
      el('coin-bdt').innerText = '0';
    }catch(err){
      alert('❌ ' + err.message);
    }
  });
});
