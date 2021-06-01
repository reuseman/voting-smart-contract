const Mayor = artifacts.require("Mayor");

contract("Mayor", accounts => {
    const candidate = accounts[0]
    const escrow = accounts[1]

    describe("Computing mayor contract gas estimate for functions", () => {

        it("...should deploy, and successfully call the constructor", async () => {            
            const gasEstimate = await Mayor.new.estimateGas(candidate, escrow, 2);
            
            console.log("Gas estimate " + gasEstimate);
        })

        it("...should successfully compute the envelope", async () => {
            const mayorInstance = await Mayor.new(candidate, escrow, 2);
            const gasEstimate = await mayorInstance.compute_envelope.estimateGas(872134, false, 30);
            
            console.log("Gas estimate " + gasEstimate);
        })
        
        it("...should successfully cast the envelope", async () => {
            const mayorInstance = await Mayor.new(candidate, escrow, 2);
            const computedEnvelope = await mayorInstance.compute_envelope(872134, false, 30);
            const gasEstimate = await mayorInstance.cast_envelope.estimateGas(computedEnvelope);
            
            console.log("Gas estimate " + gasEstimate);
        })

        it("...should successfully open the envelope", async () => {
            const voter = accounts[3]
            const mayorInstance = await Mayor.new(candidate, escrow, 1);
            const computedEnvelope = await mayorInstance.compute_envelope(872134, false, 30);
            const castedEnvelope = await mayorInstance.cast_envelope(computedEnvelope, {from: voter})
            const gasEstimate = await mayorInstance.open_envelope.estimateGas(872134, false, {from: voter, value:30});
            
            console.log("Gas estimate " + gasEstimate);
        });
    
        it("...should successfully state the mayor victory", async () => {
            const voter = accounts[3]
            const mayorInstance = await Mayor.new(candidate, escrow, 1);
            const computedEnvelope = await mayorInstance.compute_envelope(872134, true, 30);
            const castedEnvelope = await mayorInstance.cast_envelope(computedEnvelope, {from: voter})
            const openEnvelope = await mayorInstance.open_envelope(872134, true, {from: voter, value:30});
            const gasEstimate = await mayorInstance.mayor_or_sayonara.estimateGas();
            
            console.log("Gas estimate " + gasEstimate);
        });
    });

 });