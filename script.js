const tokens = {
  zaru: "0xdac6f0ec5901b3877dc6db23c3882267ba9fabf6",
  zarux: "0x7e8e9a6f626e499cf24063cdaf937615576b6cf3",
  dmd: "0x8c4c0116d051f6f2ea27e8fa7614c8f799191ab3",
  mak1: "0x9f833ca55ce0431045098ef12b64da6b33cf1f48",
  makese: "0xa6bcd9434e8db84108612bb7ccb77775306adf1a",
  btcbr: "0x40310d3d4eaeeffba63e39cd5b7b65bd51d23164",
  bitcoinbr: "0x90bb20727b6e28c02cd941ecce635ffd826e3e00"
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
    })
    .catch(err => {
      console.error(`Error fetching price for ${name}:`, err);
    });
});
