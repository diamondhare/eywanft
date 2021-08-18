let networkConfig = require('../../helper-hardhat-config.json')
const hre = require("hardhat");

async function main() {

    this.bridgeAdr  = networkConfig[network.name].bridge;
    this.s          = networkConfig[network.name].synthesis;
    this.p          = networkConfig[network.name].portal;
    this.sourceForRepresentation =  networkConfig[network.name].sourceForRepresentation;

    const [deployer] = await ethers.getSigners();
    console.log("Owner:", deployer.address);

    const Bridge = await ethers.getContractFactory("Bridge");
    const bridgeA = Bridge.attach(this.bridgeAdr);
    const mDP = networkConfig[network.name].mockDexPool;


    for(let netw of this.sourceForRepresentation) {
       let bridgeB = networkConfig[netw].bridge;
       let portal  = networkConfig[netw].portal;
       let synth   = networkConfig[netw].synthesis;
       let mockDexPool  = networkConfig[netw].mockDexPool;
       let chainid  = networkConfig[netw].chainId;

       this.tx = await bridgeA.addContractBind(this.s, bridgeB, portal);
       console.log(`addContractBind for synthesis on ${network.name} with ${netw}: ${this.tx.hash}`);
       this.tx = await bridgeA.addContractBind(this.p, bridgeB, synth);
       console.log(`addContractBind for portal on ${network.name} with ${netw}: ${this.tx.hash}`);

       this.tx = await bridgeA.addContractBind(mDP, bridgeB, mockDexPool);
       console.log(`addContractBind for mockDexPool on ${network.name} with ${netw}: ${this.tx.hash}`);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
