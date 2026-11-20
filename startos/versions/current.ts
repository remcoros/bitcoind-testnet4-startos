import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '31.2:1',
  releaseNotes: {
    en_US:
      'Requires StartOS 0.4.2 or later. Services that depend on Bitcoin can now connect to it without being able to read its data directory, including wallets.',
    es_ES:
      'Requiere StartOS 0.4.2 o posterior. Los servicios que dependen de Bitcoin ahora pueden conectarse a él sin poder leer su directorio de datos, incluidas las billeteras.',
    de_DE:
      'Erfordert StartOS ab 0.4.2. Dienste, die von Bitcoin abhängen, können sich jetzt damit verbinden, ohne sein Datenverzeichnis einschließlich der Wallets lesen zu können.',
    pl_PL:
      'Wymaga StartOS 0.4.2 lub nowszego. Usługi zależne od Bitcoin mogą teraz łączyć się z nim bez możliwości odczytu jego katalogu danych, w tym portfeli.',
    fr_FR:
      "Nécessite StartOS 0.4.2 ou ultérieur. Les services qui dépendent de Bitcoin peuvent désormais s'y connecter sans pouvoir lire son répertoire de données, portefeuilles compris.",
  },
  migrations: {
    up: async () => {},
    down: async () => {},
  },
})
