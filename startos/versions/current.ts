import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '31.1:3',
  releaseNotes: {
    en_US:
      'Updates Start SDK to 3.0.6. Restarting Bitcoin Core (testnet4) while it is still starting stops every process of the previous run.',
    es_ES:
      'Actualiza Start SDK a 3.0.6. Reiniciar Bitcoin Core (testnet4) mientras aún se está iniciando detiene todos los procesos de la ejecución anterior.',
    de_DE:
      'Aktualisiert das Start SDK auf 3.0.6. Ein Neustart von Bitcoin Core (testnet4), während es noch startet, beendet alle Prozesse des vorherigen Laufs.',
    pl_PL:
      'Aktualizuje Start SDK do wersji 3.0.6. Ponowne uruchomienie Bitcoin Core (testnet4) w trakcie uruchamiania zatrzymuje wszystkie procesy poprzedniego uruchomienia.',
    fr_FR:
      "Met à jour Start SDK vers la version 3.0.6. Redémarrer Bitcoin Core (testnet4) pendant son démarrage arrête tous les processus de l'exécution précédente.",
  },
  migrations: {
    up: async () => {},
    down: async () => {},
  },
})
