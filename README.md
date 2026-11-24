# Bitcoin Core (testnet4) on StartOS

> Everything not listed here behaves as upstream Bitcoin Core. See the Documentation section of `instructions.md` for upstream documentation.

This package runs a Bitcoin testnet4 node independently of the mainnet Bitcoin package. Its service ID is `bitcoind-testnet`.

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

## Image and Container Runtime

The custom Debian image downloads the upstream Guix-built binaries. The build verifies the archive checksum against attestations from at least five distinct pinned release signers. Bitcoin runs under its normal `bitcoind` executable with a five-minute shutdown allowance.

Additional images supply the RPC proxy, Python for RPC credential generation, and the embedded I2P router. Bitcoin supports x86_64, aarch64, and riscv64; the I2P image uses emulation where no native image exists.

## Volume and Data Layout

The `main` volume mounts at `/root/.bitcoin`. It contains `bitcoin.conf` and package state in `store.json`. Network data, indexes, wallets, peer state, and the RPC cookie live below `testnet4/`. The `i2pd` volume mounts at `/home/i2pd` and retains the router identity and configuration. The `public` volume is not mounted by Bitcoin; it holds copies of the RPC cookie and the `prune` setting for dependents, and is not backed up.

Keep the volume root and the network directory distinct when diagnosing missing data: the cookie is `/root/.bitcoin/testnet4/.cookie`, and the transaction index is `/root/.bitcoin/testnet4/indexes/txindex`.

**Dependents mount the `public` volume (`rpcVolumeId`), never `main`**, which holds the wallets. The `publish-rpc` oneshot writes `.cookie` (`rpcCookieName`, mode 0600) and `prune` (`rpcPruneName`, Bitcoin's `prune` setting, `0` when unpruned) at the volume root each time `bitcoind` becomes ready, each through a temp file and a rename; the published cookie is removed at the start of every run, so its absence means Bitcoin is down. Mount the volume, never a file in it: a file mount keeps the copy of the start it was made on.

## File Models

Configuration actions read and merge `bitcoin.conf`, preserving unknown keys and other sections. The package enforces `chain=testnet4` and writes the active network configuration inside `[testnet4]`. A custom parser and writer preserve quotes, backslashes, equals signs, and semicolons as Bitcoin reads them. Text containing a line break or `#` cannot be written as a single Bitcoin configuration value.

Bitcoin Core defaults to 200 peer connections. The package raises explicit values below 53 to leave enough room for a whitelisted `peer-local` connection under Core's default inbound transaction relay quota.

`store.json` retains reindex requests and sync-notification state. `i2pd.conf` is a typed model on the I2P volume. Existing I2P bandwidth and transit settings are retained through upgrades; new configurations use the current router defaults.

## Dependencies

Tor is optional. It becomes required when onion connectivity is selected or an onion peer address is configured. Its SOCKS endpoint is resolved through the StartOS bridge. Losing Tor does not change an explicit `onlynet` restriction into unrestricted networking.

StartOS Tor manages inbound onion addresses for the **Peer** interface. The package disables Bitcoin Core's automatic onion service with `-listenonion=0`. Core still advertises the configured onion address and uses Tor SOCKS for outbound onion peers.

## Network Access and Interfaces

StartOS controls where exported interfaces are reachable. The package keeps its testnet ports separate from mainnet:

| Interface                   | Container port | Preferred external port | Behavior                                                |
| --------------------------- | -------------- | ----------------------- | ------------------------------------------------------- |
| RPC (`rpc`)                 | 48332          | 48332                   | JSON-RPC through the proxy on archival and pruned nodes |
| Peer (`peer`)               | 58333          | 48333                   | Public P2P listener, IPv4 and IPv6                      |
| I2P console (`i2p-console`) | 7070           | Assigned by StartOS     | Optional router console                                 |

Private bindings without exported interfaces provide direct RPC/REST on host `rpc-local`, port 58432, whitelisted P2P on `peer-local`, port 58334, and, when enabled, ZMQ on host `zmq`: hash and raw block notifications on 38332, transaction and sequence notifications on 38333. ZMQ has no authentication and carries the node's own transactions as it broadcasts them, so it never gets an exported interface. Dependent services should resolve these through StartOS rather than inventing hostnames or assuming host ports.

The exported RPC proxy forwards generated `rpcauth` credentials and follows cookie rotation. On pruned nodes it can fetch missing blocks from peers; archival nodes use ordinary forwarding. The public RPC interface does not expose Bitcoin's unauthenticated REST API. ZMQ listens on IPv6 with dual-stack support.

## Installation and First-Run Flow

Initialization seeds defaults, registers interfaces, and resolves dependencies. New installations use a RAM-scaled database cache and batch size; those temporary sync settings are removed after initial synchronization. Storage below 20 GB selects pruning by default. Embedded I2P is enabled by default and can be disabled in Peer Settings.

Bitcoin starts with the testnet4 configuration and RPC cookie. The proxy starts after Bitcoin's RPC listener becomes available; at the same point `publish-rpc` copies the cookie and the `prune` setting to the `public` volume. Initialization converts older INI-encoded configuration on the version edge without clearing blockchain data or credentials.

## Actions

Configuration actions merge their selected settings and restart the daemon when needed. RPC credential actions create or remove `rpcauth` entries; the hidden dependent-service action accepts a provided username/password. Dependent Auto-Configure can alter only its declared configuration fields and cannot overwrite raw authentication or peer settings.

Runtime Information reads network and blockchain RPCs. Reindex Blockchain requests a full rebuild on the next daemon run; Reindex Chainstate rebuilds validation state and is unavailable on pruned nodes. Both can take substantial time. Stopped-service recovery actions remove the testnet peer list or a selected transaction, coinstats, or block-filter index. Index deletion is followed by rebuilding when the corresponding index is enabled.

Recovery actions operate inside `testnet4/`; they do not clear wallets or configuration. IPC and the mainnet UTXO snapshot action are not exposed.

## Tasks

Dependent services may create a task to configure pruning, indexes, ZMQ, or other supported fields. The package itself does not request interactive setup before starting. A configured onion-only node requires its Tor dependency.

## Health Checks

RPC readiness verifies the cookie and private listener; RPC Proxy checks the exported listener. Blockchain Sync reports headers, blocks, catch-up progress, or Bitcoin's startup step. Index Sync reports enabled indexes separately from blockchain synchronization, and Peers reports inbound/outbound connection counts.

I2P probes the embedded router's control API. Tor and Clearnet checks describe configured transport availability and published addresses; their success does not independently prove that peers have connected over that transport. Use Peers and Runtime Information for connection evidence. I2P diagnostics filter known routine router chatter while retaining other output.

## Backups and Restore

Backups retain configuration, wallet files, package state, and I2P identity. They exclude the blockchain, chainstate, indexes, cookies, and disposable I2P network data; the `public` volume is not backed up. Exclusions cover the actual `testnet4/` data paths as well as legacy root blockchain paths, each anchored at the volume root so that no wallet is excluded for sharing a name with one; wallets inside `testnet4/`, and their journals, remain included.

A restored node must download and rebuild the excluded data. Restore replaces the saved wallet state, so wallet activity after the backup is not represented by that backup.

## Limitations and Differences

This package selects testnet4 and uses testnet ports, storage paths, and capacity defaults. It has no supported Core/Knots flavor-switching contract. It does not provide IPC or downloadable mainnet UTXO snapshots. Testnet coins have no monetary value.

The I2P router shares the service lifecycle. The RPC proxy is always present and handles JSON-RPC only. Builds on non-x86 architectures do not establish runtime validation on those architectures.

## Quick Reference for AI Consumers

```yaml
package_id: bitcoind-testnet
image: custom Dockerfile with verified upstream release binaries
architectures: [x86_64, aarch64, riscv64]
subcontainers: [bitcoind-sub, proxy-sub, i2pd-sub]
volumes:
  main: /root/.bitcoin
  i2pd: /home/i2pd
  public: null # not mounted by bitcoind; dependents mount it read-only (rpcVolumeId)
file_models: [bitcoin.conf, store.json, i2pd.conf]
startos_managed_env_vars: []
dependencies: [tor]
interfaces:
  rpc: { type: api, port: 48332 }
  peer: { type: p2p, port: 58333 }
  # zmq: no interface; 38332 and 38333 bridge-only, bound only when ZMQ is enabled
  i2p-console: { type: ui, port: 7070 }
actions:
  [
    mempool-config,
    peers-config,
    rpc-config,
    other-config,
    generate-rpcuser,
    delete-rpcauth,
    runtime-info,
    autoconfig,
    generate-rpc-dependent,
    reindex-blockchain,
    reindex-chainstate,
    delete-peers,
    delete-txindex,
    delete-coinstats-index,
    delete-block-filter-index,
  ]
tasks: [dependent autoconfiguration]
health_checks:
  [bitcoind, proxy, sync-progress, index-sync, peers, i2pd, tor, clearnet]
backup_volumes: [main, i2pd]
```
