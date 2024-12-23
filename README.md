# Transfer SOL Program

This project demonstrates a simple Solana program written in Rust using the Anchor framework. The program facilitates transferring SOL (lamports) from one account to another.

## Features
- Transfer SOL between accounts.
- Securely handles transactions using the Solana runtime.

---

## Prerequisites

### Tools
- [Rust](https://www.rust-lang.org/tools/install)
- [Anchor CLI](https://book.anchor-lang.com/chapter_2/installation.html)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- Node.js (for testing purposes)

### Environment
Ensure you have a Solana local test validator running or access to a Solana cluster (e.g., devnet).

---

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/kunals12/solana-system-programs.git
cd solana-system-programs
```

### 2. Build the Program
```bash
anchor build
```

### 3. Deploy the Program
Start a Solana test validator in another terminal:
```bash
solana-test-validator
```

Deploy the program to the local cluster:
```bash
anchor deploy
```

---

## Usage

### Transfer SOL
1. Start the test validator:
   ```bash
   solana-test-validator
   ```

2. Execute the `transfer` instruction:
   - Provide the `from` account (source), `to` account (destination), and amount (in lamports) as inputs.

### Example Call
Use the provided TypeScript test script to invoke the program and verify the functionality.

---

## Testing

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests
```bash
anchor test
```

The tests validate the transfer functionality and ensure balances are updated correctly.

---

## Program Details

### Instruction: `transfer`
Transfers lamports from the `from` account to the `to` account.

#### Parameters
- `amount` (u64): The number of lamports to transfer.

#### Accounts
- **`from`**: The source account and signer.
- **`to`**: The destination account.
- **`system_program`**: The Solana system program.

---

## Code Structure

- **`lib.rs`**: Contains the Solana program logic.
- **`tests/transfer-sol.ts`**: Contains TypeScript-based tests to verify program functionality.

---

## License
This project is licensed under the [MIT License](LICENSE).
