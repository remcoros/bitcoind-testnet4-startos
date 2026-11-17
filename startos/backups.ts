import { sdk } from './sdk'

export const { createBackup, restoreInit } = sdk.setupBackups(async () =>
  sdk.Backups.ofVolumes('main', 'i2pd').setOptions({
    exclude: [
      // main
      'blocks/',
      'chainstate/',
      'chainstate.old/',
      'indexes/',
      '.cookie',
      'testnet4/blocks/',
      'testnet4/chainstate/',
      'testnet4/chainstate.old/',
      'testnet4/indexes/',
      'testnet4/.cookie',
      '**/*-journal',
      // i2pd. router.info is derived from router.keys but kept: restoring keys
      // without it lands i2pd on a "malformed, creating new" path that emits one
      // Identity parse error per netDb entry before it recovers.
      'data/addressbook/',
      'data/certificates/',
      'data/netDb/',
      'data/peerProfiles/',
      'data/tags/',
      'data/i2pd.pid',
    ],
  }),
)
