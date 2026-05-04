import { VersionInfo } from '@start9labs/start-sdk'

export const v_30_2_6 = VersionInfo.of({
  version: '30.2:7',
  releaseNotes: {
    en_US: 'Initial release of Bitcoin Core (testnet4) for StartOS 0.4',
    es_ES: 'Lanzamiento inicial de Bitcoin Core (testnet4) para StartOS 0.4',
    de_DE: 'Erstveröffentlichung von Bitcoin Core (testnet4) für StartOS 0.4',
    pl_PL: 'Pierwsze wydanie Bitcoin Core (testnet4) dla StartOS 0.4',
    fr_FR: 'Première version de Bitcoin Core (testnet4) pour StartOS 0.4',
  },
  migrations: {
    down: async ({ effects }) => {},
  },
})
