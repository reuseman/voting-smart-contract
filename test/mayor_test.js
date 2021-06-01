const Mayor = artifacts.require("Mayor");
const ethers = require("ethers");
const truffleAssert = require('truffle-assertions');

contract("Mayor", accounts => {
    const candidate = accounts[0]
    const escrow = accounts[1]

    describe("Testing Mayor contract functions", () => {

        it("...should deploy, and successfully call the constructor", async () => {
            const mayorInstance = await Mayor.new(candidate, escrow, 2);
                        
            assert(mayorInstance);          
        })

        it("...should successfully compute the envelope", async () => {
            const mayorInstance = await Mayor.new(candidate, escrow, 2);
            
            const computedEnvelope = await mayorInstance.compute_envelope(872134, false, 30);
            const rightEnvelope = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["uint", "bool", "uint"], [872134, false, 30]));
            
            assert.equal(computedEnvelope, rightEnvelope);          
        })
        
        it("...should successfully cast the envelope", async () => {
            const mayorInstance = await Mayor.new(candidate, escrow, 2);
            const computedEnvelope = await mayorInstance.compute_envelope(872134, false, 30);

            const output = await mayorInstance.cast_envelope(computedEnvelope)
            
            truffleAssert.eventEmitted(output, "EnvelopeCast");  
        })

        it("...should successfully open the envelope", async () => {
            const voter = accounts[3]
            const mayorInstance = await Mayor.new(candidate, escrow, 1);
            const computedEnvelope = await mayorInstance.compute_envelope(872134, false, 30);
            const castedEnvelope = await mayorInstance.cast_envelope(computedEnvelope, {from: voter})

            const output = await mayorInstance.open_envelope(872134, false, {from: voter, value:30});
            
            truffleAssert.eventEmitted(output, "EnvelopeOpen");  
        });
    
        it("...should successfully state the mayor victory", async () => {
            const voter = accounts[3]
            const mayorInstance = await Mayor.new(candidate, escrow, 1);
            const computedEnvelope = await mayorInstance.compute_envelope(872134, true, 30);
            const castedEnvelope = await mayorInstance.cast_envelope(computedEnvelope, {from: voter})
            const openEnvelope = await mayorInstance.open_envelope(872134, true, {from: voter, value:30});
            
            const output = await mayorInstance.mayor_or_sayonara();
            
            truffleAssert.eventEmitted(output, "NewMayor");  
        });

        it("...should successfully state the mayor defeat", async () => {
            const voter = accounts[3]
            const mayorInstance = await Mayor.new(candidate, escrow, 1);
            const computedEnvelope = await mayorInstance.compute_envelope(872134, false, 30);
            const castedEnvelope = await mayorInstance.cast_envelope(computedEnvelope, {from: voter})
            const openEnvelope = await mayorInstance.open_envelope(872134, false, {from: voter, value:30});
            
            const output = await mayorInstance.mayor_or_sayonara();
            
            truffleAssert.eventEmitted(output, "Sayonara");  
        });
    });

 });