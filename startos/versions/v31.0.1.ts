import { VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_31_0_1 = VersionInfo.of({
  version: '31.0:1',
  releaseNotes: {
    en_US:
      'Upgraded to Bitcoin Core 31.0. Switched to upstream Guix-built binaries with 5-of-7 multi-builder PGP verification. Faster builds. Removed the experimental IPC feature.',
    es_ES:
      'Actualización a Bitcoin Core 31.0. Cambio a binarios Guix oficiales con verificación PGP de 5 de 7 firmantes. Compilaciones más rápidas. Se ha eliminado la función experimental de IPC.',
    de_DE:
      'Upgrade auf Bitcoin Core 31.0. Wechsel zu offiziellen Guix-Binärdateien mit 5-von-7-Multi-Builder-PGP-Verifikation. Schnellere Builds. Die experimentelle IPC-Funktion wurde entfernt.',
    pl_PL:
      'Aktualizacja do Bitcoin Core 31.0. Przejście na binaria Guix z weryfikacją PGP 5 z 7 sygnatariuszy. Szybsze kompilacje. Usunięto eksperymentalną funkcję IPC.',
    fr_FR:
      'Mise à jour vers Bitcoin Core 31.0. Passage aux binaires Guix officiels avec vérification PGP multi-builder 5 sur 7. Compilations plus rapides. Suppression de la fonctionnalité IPC expérimentale.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {
      // v30 introduced indexes/coinstatsindex/ at a new path; <=29 doesn't read it.
      // Core preserved indexes/coinstats/ on upgrade for exactly this rollback.
      await rm('/media/startos/volumes/main/indexes/coinstatsindex', {
        recursive: true,
        force: true,
      }).catch(console.error)
    },
  },
})
