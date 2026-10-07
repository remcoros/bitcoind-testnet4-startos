import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '31.1:2',
  releaseNotes: {
    en_US: 'Updates Start SDK to 3.0.3.',
    es_ES: 'Actualiza Start SDK a 3.0.3.',
    de_DE: 'Aktualisiert das Start SDK auf 3.0.3.',
    pl_PL: 'Aktualizuje Start SDK do wersji 3.0.3.',
    fr_FR: 'Met à jour Start SDK vers la version 3.0.3.',
  },
  migrations: {
    up: async () => {},
    down: async () => {},
  },
})
