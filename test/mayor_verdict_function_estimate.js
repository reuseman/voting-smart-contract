const Mayor = artifacts.require("Mayor");
const truffleAssert = require('truffle-assertions');

contract("Mayor", accounts => {
    const candidate = accounts[0]
    const escrow = accounts[1]
    const numberOfAccounts = accounts.length

    describe("Testing mayor_or_sayonara function with different parameters", () => {
        // Varations tested are the following:
        //      verdict: EXTREME VICTORY, BALANCED VICTORY, EXTREME DEFEAT
        //      quorum : HIGH QUORUM, MEDIUM QUORUM, LOW QUORUM
        //      souls  : HIGH SOULS, LOW SOULS

        it("...should successfully state the mayor EXTREME VICTORY with HIGH QUORUM, LOW SOULS", async () => {
            const quorum = numberOfAccounts - 2;
            const yays = quorum - 1;
            const nays = 1;
            const mayorInstance = await Mayor.new(candidate, escrow, quorum);

            // Cast
            for (i = 0; i < yays; i++) {
                let computedEnvelope = await mayorInstance.compute_envelope(i + 2, true, 1);
                await mayorInstance.cast_envelope(computedEnvelope, {from: accounts[i + 2]});
            }

            for (i = 0; i < nays; i++) {
                let computedEnvelope = await mayorInstance.compute_envelope(i + 2 + yays, false, 1);
                await mayorInstance.cast_envelope(computedEnvelope, {from: accounts[i + 2 + yays]});
            }

            // Open
            for (i = 0; i < yays; i++) {
                await mayorInstance.open_envelope(i + 2, true, {from: accounts[i + 2], value:1});
            }

            for (i = 0; i < nays; i++) {
                await mayorInstance.open_envelope(i + 2 + yays, false, {from: accounts[i + 2 + yays], value:1});

            }
            
            // Verdict
            output = await mayorInstance.mayor_or_sayonara();

            truffleAssert.eventEmitted(output, "NewMayor");  
            console.log("Gas estimate " + output.receipt.gasUsed)
            console.log("Gas per voter " + output.receipt.gasUsed / quorum)
        });

        it("...should successfully state the mayor BALANCED VICTORY with HIGH QUORUM, LOW SOULS", async () => {
            const quorum = numberOfAccounts - 2;
            const yays = quorum / 2 + 1;
            const nays = quorum / 2 - 1;
            const mayorInstance = await Mayor.new(candidate, escrow, quorum);

            // Cast
            for (i = 0; i < yays; i++) {
                let computedEnvelope = await mayorInstance.compute_envelope(i + 2, true, 1);
                await mayorInstance.cast_envelope(computedEnvelope, {from: accounts[i + 2]});
            }

            for (i = 0; i < nays; i++) {
                let computedEnvelope = await mayorInstance.compute_envelope(i + 2 + yays, false, 1);
                await mayorInstance.cast_envelope(computedEnvelope, {from: accounts[i + 2 + yays]});
            }

            // Open
            for (i = 0; i < yays; i++) {
                await mayorInstance.open_envelope(i + 2, true, {from: accounts[i + 2], value:1});
            }

            for (i = 0; i < nays; i++) {
                await mayorInstance.open_envelope(i + 2 + yays, false, {from: accounts[i + 2 + yays], value:1});

            }
            
            // Verdict
            output = await mayorInstance.mayor_or_sayonara();

            truffleAssert.eventEmitted(output, "NewMayor");  
            console.log("Gas estimate " + output.receipt.gasUsed)
            console.log("Gas per voter " + output.receipt.gasUsed / quorum)
        });

        it("...should successfully state the mayor EXTREME DEFEEAT with HIGH QUORUM, LOW SOULS", async () => {
            const quorum = numberOfAccounts - 2;
            const yays = 1;
            const nays = quorum - 1;
            const mayorInstance = await Mayor.new(candidate, escrow, quorum);

            // Cast
            for (i = 0; i < yays; i++) {
                let computedEnvelope = await mayorInstance.compute_envelope(i + 2, true, 1);
                await mayorInstance.cast_envelope(computedEnvelope, {from: accounts[i + 2]});
            }

            for (i = 0; i < nays; i++) {
                let computedEnvelope = await mayorInstance.compute_envelope(i + 2 + yays, false, 1);
                await mayorInstance.cast_envelope(computedEnvelope, {from: accounts[i + 2 + yays]});
            }

            // Open
            for (i = 0; i < yays; i++) {
                await mayorInstance.open_envelope(i + 2, true, {from: accounts[i + 2], value:1});
            }

            for (i = 0; i < nays; i++) {
                await mayorInstance.open_envelope(i + 2 + yays, false, {from: accounts[i + 2 + yays], value:1});

            }
            
            // Verdict
            output = await mayorInstance.mayor_or_sayonara();

            truffleAssert.eventEmitted(output, "Sayonara");  
            console.log("Gas estimate " + output.receipt.gasUsed)
            console.log("Gas per voter " + output.receipt.gasUsed / quorum)
        });

        it("...should successfully state the mayor BALANCED VICTORY with MEDIUM QUORUM, LOW SOULS", async () => {
            const quorum = numberOfAccounts / 2 -  2;
            const yays = Math.floor(quorum / 2) + 1;
            const nays = Math.ceil(quorum / 2) - 1;
            const mayorInstance = await Mayor.new(candidate, escrow, quorum);

            // Cast
            for (i = 0; i < yays; i++) {
                let computedEnvelope = await mayorInstance.compute_envelope(i + 2, true, 1);
                await mayorInstance.cast_envelope(computedEnvelope, {from: accounts[i + 2]});
            }

            for (i = 0; i < nays; i++) {
                let computedEnvelope = await mayorInstance.compute_envelope(i + 2 + yays, false, 1);
                await mayorInstance.cast_envelope(computedEnvelope, {from: accounts[i + 2 + yays]});
            }

            // Open
            for (i = 0; i < yays; i++) {
                await mayorInstance.open_envelope(i + 2, true, {from: accounts[i + 2], value:1});
            }

            for (i = 0; i < nays; i++) {
                await mayorInstance.open_envelope(i + 2 + yays, false, {from: accounts[i + 2 + yays], value:1});

            }
            
            // Verdict
            output = await mayorInstance.mayor_or_sayonara();

            truffleAssert.eventEmitted(output, "NewMayor");  
            console.log("Gas estimate " + output.receipt.gasUsed)
            console.log("Gas per voter " + output.receipt.gasUsed / quorum)
        });

        it("...should successfully state the mayor BALANCED VICTORY with LOW QUORUM, LOW SOULS", async () => {
            const quorum = 4;
            const yays = quorum / 2 + 1;
            const nays = quorum / 2 - 1;
            const mayorInstance = await Mayor.new(candidate, escrow, quorum);

            // Cast
            for (i = 0; i < yays; i++) {
                let computedEnvelope = await mayorInstance.compute_envelope(i + 2, true, 1);
                await mayorInstance.cast_envelope(computedEnvelope, {from: accounts[i + 2]});
            }

            for (i = 0; i < nays; i++) {
                let computedEnvelope = await mayorInstance.compute_envelope(i + 2 + yays, false, 1);
                await mayorInstance.cast_envelope(computedEnvelope, {from: accounts[i + 2 + yays]});
            }

            // Open
            for (i = 0; i < yays; i++) {
                await mayorInstance.open_envelope(i + 2, true, {from: accounts[i + 2], value:1});
            }

            for (i = 0; i < nays; i++) {
                await mayorInstance.open_envelope(i + 2 + yays, false, {from: accounts[i + 2 + yays], value:1});

            }
            
            // Verdict
            output = await mayorInstance.mayor_or_sayonara();

            truffleAssert.eventEmitted(output, "NewMayor");  
            console.log("Gas estimate " + output.receipt.gasUsed)
            console.log("Gas per voter " + output.receipt.gasUsed / quorum)
        });

        it("...should successfully state the mayor BALANCED VICTORY with HIGH QUORUM, HIGH SOULS", async () => {
            const quorum = numberOfAccounts - 2;
            const yays = quorum / 2 + 1;
            const nays = quorum / 2 - 1;
            const mayorInstance = await Mayor.new(candidate, escrow, quorum);

            // Cast
            for (i = 0; i < yays; i++) {
                let computedEnvelope = await mayorInstance.compute_envelope(i + 2, true, 100000000);
                await mayorInstance.cast_envelope(computedEnvelope, {from: accounts[i + 2]});
            }

            for (i = 0; i < nays; i++) {
                let computedEnvelope = await mayorInstance.compute_envelope(i + 2 + yays, false, 100000000);
                await mayorInstance.cast_envelope(computedEnvelope, {from: accounts[i + 2 + yays]});
            }

            // Open
            for (i = 0; i < yays; i++) {
                await mayorInstance.open_envelope(i + 2, true, {from: accounts[i + 2], value: 100000000});
            }

            for (i = 0; i < nays; i++) {
                await mayorInstance.open_envelope(i + 2 + yays, false, {from: accounts[i + 2 + yays], value: 100000000});

            }
            
            // Verdict
            output = await mayorInstance.mayor_or_sayonara();

            truffleAssert.eventEmitted(output, "NewMayor");  
            console.log("Gas estimate " + output.receipt.gasUsed)
            console.log("Gas per voter " + output.receipt.gasUsed / quorum)
        });
    });

 });