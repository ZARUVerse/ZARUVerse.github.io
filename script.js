const tokens = {
  zaru: "0xdac6f0ec5901b3877dc6db23c3882267ba9fabf6"
  // سایر توکن‌ها رو اضافه کن
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
