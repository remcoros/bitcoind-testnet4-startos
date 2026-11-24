import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'bitcoind-testnet',
  title: 'Bitcoin Core (testnet4)',
  license: 'MIT',
  donationUrl: null,
  packageRepo:
    'https://github.com/remcoros/bitcoind-testnet4-startos/tree/32.x-testnet4',
  upstreamRepo: 'https://github.com/bitcoin/bitcoin',
  marketingUrl: 'https://bitcoincore.org/',
  description: { short, long },
  volumes: ['main', 'i2pd', 'public'],
  images: {
    bitcoind: {
      source: {
        dockerBuild: {
          buildArgs: {
            VERSION: '32.1',
          },
        },
      },
      arch: ['x86_64', 'aarch64', 'riscv64'],
    },
    proxy: {
      source: {
        dockerTag: 'ghcr.io/start9labs/btc-rpc-proxy:v0.8.4',
      },
      arch: ['x86_64', 'aarch64', 'riscv64'],
    },
    python: {
      source: {
        dockerTag: 'python:3.14.10-alpine',
      },
      arch: ['x86_64', 'aarch64', 'riscv64'],
    },
    i2pd: {
      source: {
        dockerTag: 'purplei2p/i2pd:release-2.61.0',
      },
      arch: ['x86_64', 'aarch64'],
      emulateMissing: true,
    },
  },
})
