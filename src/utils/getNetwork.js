function getNetwork(web3) {
  if (web3.currentProvider.constructor.name === 'MetamaskInpageProvider') {
    const networkId = web3.version.network;
    let networkName = null;

    switch (networkId) {
      case '1':
        networkName = 'Mainnet';
        break;
      case '2':
        networkName = 'Morden';
        break;
      case '3':
        networkName = 'Ropsten';
        break;
      case '4':
        networkName = 'Rinkeby';
        break;
      case '42':
        networkName = 'Kovan';
        break;
      default:
        networkName = 'LOCALHOST';
    }
    return networkName;
  }
  else if (web3.currentProvider.constructor.name === 'EthereumProvider') {
    return 'MIST';
  }
  else if (web3.currentProvider.constructor.name === 'o') {
    return 'PARITY';
  }
  else if (web3.currentProvider.host.indexOf('infura') !== -1) {
    return 'INFURA';
  }
  else if (web3.currentProvider.host.indexOf('localhost') !== -1) {
    return 'LOCALHOST';
  }

  return 'LOCALHOST';
}

export default getNetwork;
