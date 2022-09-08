import { useMetaMask } from "metamask-react";
import { useState } from "react";





export default function Web3Component() {
    const { switchChain } = useMetaMask();
    const wrongNetwork = () => {
        // Request a switch to Ethereum Mainnet
        return (
          <button onClick={() => switchChain("0x1")}>Switch to Ethereum Mainnet</button>
        )
    }   

    const { status, connect, account, chainId, ethereum } = useMetaMask();

    if (status === "initializing") return <div>Synchronisation with MetaMask ongoing...</div>

    if (status === "unavailable") return <div>MetaMask not available :( - please install metamask</div>

    if (status === "notConnected") return <button onClick={connect}>Connect to MetaMask</button>

    if (status === "connecting") return <div>Connecting...</div>

    if (status === "connected") {
        if (chainId !== "0x1") {
            return wrongNetwork()
        }
        return ( 
         <div>Connected account {account} on {chainId == '0x1' ? 'ethereum mainnet': 'chain ID ' + chainId}  
         <p></p>
         <button onClick={() => ethereum.send({ method: "eth_sendTransaction", params: [{ from: account, to: account, value: "1" }] })}>Claim an Outsider token</button>
        </div>
        )

    }

    return null;
}