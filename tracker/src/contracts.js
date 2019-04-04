const web3 = require('./web3');
const EchoRegister = require('./contracts/EchoRegister'); //0x556c45c74d5c8b352bb327dE3F9E3CBF722c371c
//const Echo
//0xB4AFA77EF55EdF3138306753c1bCF802603a4e05


const list = {};

const setupContract = async (networkId) => {
    console.log('setting up EchoRegister contract');
    //const deployedAddress = EchoRegister.networks[networkId].address;
    const deployedAddress = '0x556c45c74d5c8b352bb327dE3F9E3CBF722c371c';
    //console.log('contract deployed address:' + deployedAddress);
    list.echoRegister = new web3.eth.Contract(
       EchoRegister.abi,
        deployedAddress
    );
  }

const setup = async () => {
    //const networkId = await web3.eth.net.getId();
    const networkId = 3;
    await setupContract(networkId);
}

module.exports = {
    setup,
    list
}