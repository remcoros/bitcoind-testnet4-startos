# Bitcoin testnet4 package

- Resolve upstream merges against the published `31.x` release and retain upstream ancestry; the maintained personal base is `31.x-testnet4`.
- Keep the configuration reader, writer, and legacy conversion consistent: Bitcoin treats quoting and escaping literally, and this package uses a `[testnet4]` section.
- When changing a configuration field, update `shape`, `fileToForm`, `formToFile`, and the relevant action filter; TypeScript does not check their exhaustiveness.
