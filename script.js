const tokens = {
  zaru: "0xdac6f0ec5901b3877dc6db23c3882267ba9fabf6",
  zarux: "0x7e8e9a6f626e499cf24063cdaf937615576b6cf3",
  diamond: "0x...", // جایگزین کن با آدرس واقعی
  mak1: "0x...",
  makese: "0x...",
  btcbr: "0x...",
  bitcoinbr: "0x..."
};

Object.entries(tokens).forEach(([name, address]) => {
  fetch(`https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=${address}&vs_currencies=usd`)
    .then(res => res.json())
    .then(data => {
      const price = data[address.toLowerCase()]?.usd;
      if (price) {
        const element = document.getElementById(`${name}-price`);
        if (element) {
          element.innerText = "$" + price.toFixed(4);
        }
      }
    });
});
