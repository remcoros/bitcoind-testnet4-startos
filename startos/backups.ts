import { sdk } from './sdk'

export const { createBackup, restoreInit } = sdk.setupBackups(async () =>
  sdk.Backups.ofVolumes('main').setOptions({
    exclude: ['testnet4/blocks/', 'testnet4/chainstate/', 'testnet4/indexes/'],
  }),
)
