# Bitcoin Core (testnet4) Instructions

This package runs Bitcoin Core connected to the Bitcoin testnet4 network. It is intended for development and testing. Funds on testnet4 have no real value.

## First-time setup

1. Start Bitcoin Core. It will begin downloading and checking the testnet4 blockchain. The first sync can take a long time depending on your hardware and internet connection.
2. You can leave the defaults in place, or use the settings actions to adjust networking, memory use, indexes, and RPC behavior.
3. Use **Runtime Information** to follow sync progress and see the current peer count and block height.

## Actions

- **Mempool Settings** - Adjust how pending transactions are stored and handled.
- **Peer Settings** - Adjust peer connections and optional Tor or I2P networking.
- **RPC Settings** - Adjust how Bitcoin Core accepts RPC requests.
- **Other Settings** - Manage indexes, pruning, wallet options, and performance settings.
- **Runtime Information** - View sync progress, peers, and blockchain information.
- **Generate RPC User Credentials** - Create login details for an external application.
- **Delete RPC Users** - Remove credentials that are no longer needed.

The delete and reindex actions are recovery tools. Use them only when Bitcoin Core reports corrupted data or you understand the rebuild they will trigger. Reindexing can take a long time.

## RPC access

Open the **RPC Interface** to find the connection address. Use **Generate RPC User Credentials** to create a username and password for an external application. Do not share these credentials.

## Tor and I2P

Optional Tor and I2P networking can be managed under **Peer Settings**.
