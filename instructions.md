# Bitcoin Core (testnet4) Instructions

This package runs Bitcoin Core connected to the Bitcoin testnet4 network. It is intended for development and testing. Funds on testnet4 have no real value.

## First-time setup

1. After installation, the node will begin syncing the testnet4 blockchain. This can take some time depending on your hardware.
2. Use the **Configure** action to adjust settings such as RPC access, peer connections, mempool limits, and optional I2P or Tor networking.

## Actions

- **Configure** - Adjust node configuration including RPC, peers, mempool, and networking options.
- **Runtime Info** - Display current sync status, peer count, and block height.
- **Generate RPC User** - Create a new RPC credential pair for use with external applications.
- **Generate RPC User (Dependent)** - Create an RPC credential pre-scoped for a dependent service.
- **Delete RPC Auth** - Remove an existing RPC credential.
- **Delete Peers** - Clear the peer address database.
- **Delete TX Index** - Remove the transaction index (triggers rebuild on restart).
- **Delete Coinstats Index** - Remove the coinstats index (triggers rebuild on restart).
- **Reindex Blockchain** - Reprocess all block data from disk.

## RPC access

Enable RPC in the **Configure** action to allow external applications to connect. The **Generate RPC User** action creates credentials that external tools can use to authenticate.

## Tor and I2P

Optional Tor and I2P networking can be enabled in the **Configure** action. Both require the corresponding service to be installed and running.
