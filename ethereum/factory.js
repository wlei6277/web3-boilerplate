import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x2AC8F2c9f2863a367B639423D43fA5685D228Df2'
);

export default instance;