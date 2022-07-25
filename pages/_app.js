import { useState, useEffect, createContext } from "react";
import web3 from "../ethereum/web3";

export const MetaMaskContext = createContext({ address: "" });
MetaMaskContext.displayName = "MetaMaskContext";

const App = ({ Component, pageProps }) => {
  const [metaMaskAccount, setMetaMaskAccount] = useState({ address: "" });

  const connect = async () => {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    setMetaMaskAccount({ address: accounts[0] });
  };

  useEffect(() => {
    window.ethereum.on('accountsChanged', async () => {
      const accounts = await web3.eth.getAccounts();
      setMetaMaskAccount({ address: accounts[0] })
    })
    connect();
  }, []);

  if (!metaMaskAccount.address)
    return (
      <div>
        <p>Please connect to MetaMask before using this app</p>
        <button onClick={() => connect()}>Connect to MetaMask</button>
      </div>
    );

  return (
    <MetaMaskContext.Provider value={metaMaskAccount}>
      <Component {...pageProps} />
    </MetaMaskContext.Provider>
  );
};

export default App;
