# Bitcoin testnet4 package

- Merge published Start9 Bitcoin `32.x` releases into `32.x-testnet4` and retain upstream ancestry.
- Fetch release tags from `origin`. In each clone, run `git config --local remote.upstream.tagOpt --no-tags` to keep mainnet tags out of the local tag namespace. Inspect mainnet tags with `git ls-remote --tags upstream`.
- For new releases, sign and push a `-testnet4` tag to `origin`. Map `32.1:0` to `v32.1_0-testnet4`. Preserve the suffix filter in `.github/workflows/release.yml` during upstream merges.
- Keep the configuration reader, writer, and legacy conversion consistent: Bitcoin treats quoting and escaping literally, and this package uses a `[testnet4]` section.
- When changing a configuration field, update `shape`, `fileToForm`, `formToFile`, and the relevant action filter; TypeScript does not check their exhaustiveness.
- Keep the exports dependents build against — the host ids, ports and `rpccookiefile` in `startos/utils.ts`, the dependent volume `rpcVolumeId` with `rpcCookieName` and `rpcPruneName` (named as in Start9's Bitcoin packages, so a dependent mounts either the same way), `startos/manifest`, and `startos/actions/config/autoconfig`. Renaming or moving one breaks their builds.
- Never export an interface on the `zmq`, `rpc-local`, or `peer-local` hosts: exporting one puts the binding on the LAN by default, and none of the three may reach it (unauthenticated ZMQ and REST, whitelisted P2P). Dependents resolve them with `getBridgeAddress`, which needs no interface.
