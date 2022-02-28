require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/d04WkxvmPMq7zzja8quOyO376ZwEFtml',
      accounts: [
        "4a9fff63bed9752b7581c25bdf867caf64ed300f5d948b197a72cea57f5b3128"
      ]
    }
  }
};
