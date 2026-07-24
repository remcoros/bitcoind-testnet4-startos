import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '31.1:0',
  releaseNotes: {
    en_US:
      'Updated Bitcoin Core to 31.1. Fixes a privacy issue where PrivateBroadcast could connect over clearnet instead of the configured privacy network, plus validation, wallet, networking, and performance issues. [Full release notes](https://bitcoincore.org/en/releases/31.1/).',
    es_ES:
      'Bitcoin Core se actualizó a la versión 31.1. Corrige un problema de privacidad por el que PrivateBroadcast podía conectarse por clearnet en lugar de la red de privacidad configurada, además de problemas de validación, cartera, red y rendimiento. [Notas completas de la versión](https://bitcoincore.org/en/releases/31.1/).',
    de_DE:
      'Bitcoin Core wurde auf Version 31.1 aktualisiert. Behebt ein Datenschutzproblem, durch das PrivateBroadcast Verbindungen über das Clearnet statt über das konfigurierte Datenschutznetzwerk herstellen konnte, sowie Probleme bei Validierung, Wallet, Netzwerk und Leistung. [Vollständige Versionshinweise](https://bitcoincore.org/en/releases/31.1/).',
    pl_PL:
      'Zaktualizowano Bitcoin Core do wersji 31.1. Naprawiono problem z prywatnością, przez który PrivateBroadcast mógł łączyć się przez clearnet zamiast skonfigurowanej sieci prywatności, a także problemy z walidacją, portfelem, siecią i wydajnością. [Pełne informacje o wydaniu](https://bitcoincore.org/en/releases/31.1/).',
    fr_FR:
      'Bitcoin Core a été mis à jour vers la version 31.1. Corrige un problème de confidentialité où PrivateBroadcast pouvait se connecter via le clearnet au lieu du réseau de confidentialité configuré, ainsi que des problèmes de validation, de portefeuille, de réseau et de performances. [Notes de version complètes](https://bitcoincore.org/en/releases/31.1/).',
  },
  migrations: {
    up: async () => {},
    down: async () => {},
  },
})
