// -----------------------------
// Token Contracts
// -----------------------------
const TOKENS = {
  zaru: "0xdac6f0ec5901b3877dc6db23c3882267ba9fabf6",
  zarux: "0x7e8e9a6f626e499cf24063cdaf937615576b6cf3",
  dmd: "0x8c4c0116d051f6f2ea27e8fa7614c8f799191ab3",
  mak1: "0x9f833ca55ce0431045098ef12b64da6b33cf1f48",
  makese: "0xa6bcd9434e8db84108612bb7ccb77775306adf1a",
  btcbr: "0x40310d3d4eaeeffba63e39cd5b7b65bd51d23164",
  bitcoinbr: "0x90bb20727b6e28c02cd941ecce635ffd826e3e00"
};

// -----------------------------
// Fetch live prices from CoinGecko
// -----------------------------
function fetchPrices() {
  const entries = Object.entries(TOKENS);
  const addresses = entries.map(([_, addr]) => addr).join(",");

  fetch(`https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=${addresses}&vs_currencies=usd`)
    .then(r => r.json())
    .then(data => {
      entries.forEach(([key, addr]) => {
        const price = data[addr.toLowerCase()]?.usd;
        const el = document.getElementById(`${key}-price`);
        if (el) {
          el.textContent = price ? `$${Number(price).toFixed(4)}` : "No price";
        }
      });
    })
    .catch(() => {
      entries.forEach(([key]) => {
        const el = document.getElementById(`${key}-price`);
        if (el) el.textContent = "Price unavailable";
      });
    });
}

// -----------------------------
// Footer docs enlarge-on-click
// -----------------------------
function setupFooterDocs() {
  const imgs = document.querySelectorAll(".footer-docs img");

  imgs.forEach(img => {
    img.addEventListener("click", () => {
      // اگر همین عکس بزرگه، برگرد به حالت عادی
      if (img.classList.contains("enlarged")) {
        img.classList.remove("enlarged");
      } else {
        // همه عکس‌های دیگه رو کوچیک کن
        imgs.forEach(i => i.classList.remove("enlarged"));
        // این یکی رو بزرگ کن
        img.classList.add("enlarged");
      }
    });
  });
}

// -----------------------------
// Init
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  fetchPrices();
  setupFooterDocs();
  // هر ۶۰ ثانیه قیمت‌ها آپدیت بشن
  setInterval(fetchPrices, 60000);
});
