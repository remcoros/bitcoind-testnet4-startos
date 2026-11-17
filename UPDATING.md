# Updating the upstream version

The `bitcoind` image is built from `Dockerfile`, which downloads the upstream release tarball from `bitcoincore.org` and verifies `SHA256SUMS.asc` against the release signers pinned in `PINNED_FINGERPRINTS`. This branch tracks **Bitcoin Core 31.x** on testnet4.

## Determining the upstream version

- **Bitcoin Core 31.x** — [bitcoin/bitcoin](https://github.com/bitcoin/bitcoin)
  - Latest 31.x release tag:
    ```sh
    gh release list -R bitcoin/bitcoin --limit 50 --json tagName -q '.[].tagName' | grep -E '^v31\.' | head -1
    ```
  - Current pin: `VERSION` build-arg under `images.bitcoind.source.dockerBuild.buildArgs` in `startos/manifest/index.ts`.

## The i2pd image

Pinned as `images.i2pd.source.dockerTag` in `startos/manifest/index.ts`: `purplei2p/i2pd:release-<version>` on Docker Hub. Releases are at <https://github.com/PurpleI2P/i2pd/releases>.

The service-log filter's drop list (`startos/i2pdLogFilter.ts`) is transcribed verbatim from the pinned i2pd image's message wording, so an `i2pd` image bump can reword those messages. Fold any reworded families back into the list and its test corpus (`test/i2pdLogFilter.test.ts`). Compare the filter and its tests with the published Bitcoin packaging upstream when changing the image.

## Applying the bump

1. Bump `VERSION` in `startos/manifest/index.ts` under `images.bitcoind.source.dockerBuild.buildArgs`.
2. If upstream rotated release signers, update `PINNED_FINGERPRINTS` in `Dockerfile` and refresh the keys in `assets/release-keys/`.

## Other images

The RPC proxy is pinned in `images.proxy.source.dockerTag` to a published tag from [Start9Labs/btc-rpc-proxy](https://github.com/Start9Labs/btc-rpc-proxy/releases). Check testnet4 network detection, cookie rotation, and pruned-block fetching when changing that pin.

The Python helper is pinned in `images.python.source.dockerTag` to the official Alpine-based Python image. It runs only the Bitcoin RPC credential generator. Confirm all declared architecture manifests exist before updating either image.
