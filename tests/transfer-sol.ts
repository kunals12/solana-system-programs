import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { TransferSol } from "../target/types/transfer_sol";
import * as assert from "assert";

describe("transfer_sol", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.TransferSol as Program<TransferSol>;

  let fromWallet = anchor.web3.Keypair.generate();
  let toWallet = anchor.web3.Keypair.generate();

  it("Transfers lamports from `from` to `to`", async () => {
    // Airdrop some SOL to the fromWallet
    const airdropSignature = await provider.connection.requestAirdrop(
      fromWallet.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL // 2 SOL
    );
    await provider.connection.confirmTransaction(airdropSignature);

    // Verify initial balances
    const fromInitialBalance = await provider.connection.getBalance(
      fromWallet.publicKey
    );
    const toInitialBalance = await provider.connection.getBalance(
      toWallet.publicKey
    );
    console.log("Initial Balance (from):", fromInitialBalance);
    console.log("Initial Balance (to):", toInitialBalance);

    // Ensure the initial balance of the `from` wallet is as expected
    assert.ok(fromInitialBalance >= 2 * anchor.web3.LAMPORTS_PER_SOL);
    assert.equal(toInitialBalance, 0);

    // Define the transfer amount (1 SOL)
    const transferAmount = anchor.web3.LAMPORTS_PER_SOL;

    // Call the transfer instruction
    await program.methods
      .transfer(new anchor.BN(transferAmount)) // Pass amount as BN
      .accounts({
        from: fromWallet.publicKey,
        to: toWallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([fromWallet])
      .rpc();

    // Verify final balances
    const fromFinalBalance = await provider.connection.getBalance(
      fromWallet.publicKey
    );
    const toFinalBalance = await provider.connection.getBalance(
      toWallet.publicKey
    );
    console.log("Final Balance (from):", fromFinalBalance);
    console.log("Final Balance (to):", toFinalBalance);

    // Check if the lamports were transferred correctly
    assert.equal(toFinalBalance, transferAmount);
    assert.ok(fromFinalBalance < fromInitialBalance - transferAmount);
  });
});
