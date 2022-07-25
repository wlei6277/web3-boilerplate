const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');



const provider = new HDWalletProvider(
  'castle march demise isolate limit comfort season goose nice erosion exile alone',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/6a760ecffd7c480c9ceb1fef75cef62d'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  try {
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
   } catch (err) {
    console.error(err)
  }

  
};
deploy();

// Contract last deployed to address 0xe01607990453F753A753792f0066106BA3Aec365
