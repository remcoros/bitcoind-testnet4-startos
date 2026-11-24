# Bitcoin testnet4 package

- Resolve upstream merges against the published `31.x` release and retain upstream ancestry; the maintained personal base is `31.x-testnet4`.
- Keep the configuration reader, writer, and legacy conversion consistent: Bitcoin treats quoting and escaping literally, and this package uses a `[testnet4]` section.
- When changing a configuration field, update `shape`, `fileToForm`, `formToFile`, and the relevant action filter; TypeScript does not check their exhaustiveness.
- Keep the exports dependents build against — the host ids, ports and `rpccookiefile` in `startos/utils.ts`, the dependent volume `rpcVolumeId` with `rpcCookieName` and `rpcPruneName` (named as in Start9's Bitcoin packages, so a dependent mounts either the same way), `startos/manifest`, and `startos/actions/config/autoconfig`. Renaming or moving one breaks their builds.
- Never export an interface on the `zmq`, `rpc-local`, or `peer-local` hosts: exporting one puts the binding on the LAN by default, and none of the three may reach it (unauthenticated ZMQ and REST, whitelisted P2P). Dependents resolve them with `getBridgeAddress`, which needs no interface.
