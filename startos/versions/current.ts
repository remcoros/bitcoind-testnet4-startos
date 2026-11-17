import { FileHelper, VersionInfo, z } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'
import { bitcoinConfFile, toBitcoinConf } from '../fileModels/bitcoin.conf'

export const current = VersionInfo.of({
  version: '31.2:0',
  releaseNotes: {
    en_US:
      'Requires StartOS 0.4.2 or later. Updates Bitcoin Core to 31.2 with networking, validation, and performance fixes. [Upstream release notes](https://bitcoincore.org/en/releases/31.2/).\n\n- Brings the current Bitcoin package improvements to testnet4: IPv6 peer and ZMQ listeners, separate private RPC and peer interfaces for dependent services, improved pruned-block fetching, index and peer health checks, and I2P reliability and log filtering.\n- Existing I2P bandwidth and transit settings are preserved. Configuration conversion preserves the testnet4 section and custom settings. RPC credentials and the testnet4 blockchain stay in place.\n- Recovery actions and backup exclusions now use the testnet4 data directory. IPC and mainnet UTXO snapshot downloads remain unavailable.',
    es_ES:
      'Requiere StartOS 0.4.2 o posterior. Actualiza Bitcoin Core a 31.2 con correcciones de red, validación y rendimiento. [Notas de la versión](https://bitcoincore.org/en/releases/31.2/).\n\n- Incorpora las mejoras actuales del paquete Bitcoin a testnet4: conexiones de pares y ZMQ por IPv6, interfaces privadas RPC y de pares para servicios dependientes, recuperación de bloques podados, comprobaciones de índices y pares, y mejoras de I2P.\n- Conserva los ajustes existentes de ancho de banda y tránsito I2P. La conversión conserva la sección testnet4, los ajustes personalizados, las credenciales RPC y la cadena.\n- Las acciones de recuperación y exclusiones de copias de seguridad usan el directorio testnet4. IPC y las descargas de instantáneas UTXO de mainnet siguen sin estar disponibles.',
    de_DE:
      'Erfordert StartOS ab 0.4.2. Aktualisiert Bitcoin Core auf 31.2 mit Netzwerk-, Validierungs- und Leistungsverbesserungen. [Versionshinweise](https://bitcoincore.org/en/releases/31.2/).\n\n- Übernimmt die aktuellen Bitcoin-Paketverbesserungen für testnet4: IPv6 für Peers und ZMQ, private RPC- und Peer-Schnittstellen für abhängige Dienste, verbessertes Abrufen beschnittener Blöcke, Index- und Peer-Prüfungen sowie I2P-Verbesserungen.\n- Bestehende I2P-Bandbreiten- und Transiteinstellungen bleiben erhalten. Die Konfigurationsumwandlung erhält den testnet4-Abschnitt, eigene Einstellungen, RPC-Zugangsdaten und Blockchain.\n- Wiederherstellungsaktionen und Sicherungsausschlüsse verwenden das testnet4-Verzeichnis. IPC und Mainnet-UTXO-Snapshots bleiben deaktiviert.',
    pl_PL:
      'Wymaga StartOS 0.4.2 lub nowszego. Aktualizuje Bitcoin Core do 31.2 z poprawkami sieci, walidacji i wydajności. [Informacje o wydaniu](https://bitcoincore.org/en/releases/31.2/).\n\n- Przenosi aktualne ulepszenia pakietu Bitcoin do testnet4: IPv6 dla peerów i ZMQ, prywatne interfejsy RPC i peerów dla usług zależnych, pobieranie przyciętych bloków, kontrolę indeksów i peerów oraz ulepszenia I2P.\n- Zachowuje istniejące ustawienia przepustowości i tranzytu I2P. Konwersja zachowuje sekcję testnet4, własne ustawienia, dane RPC i blockchain.\n- Działania naprawcze i wykluczenia kopii zapasowych używają katalogu testnet4. IPC i migawki UTXO mainnet pozostają niedostępne.',
    fr_FR:
      'Nécessite StartOS 0.4.2 ou ultérieur. Met à jour Bitcoin Core vers 31.2 avec des corrections réseau, de validation et de performances. [Notes de version](https://bitcoincore.org/en/releases/31.2/).\n\n- Apporte les améliorations actuelles du paquet Bitcoin à testnet4 : IPv6 pour les pairs et ZMQ, interfaces privées RPC et de pairs pour les services dépendants, récupération de blocs élagués, contrôles des index et des pairs, et améliorations I2P.\n- Conserve les réglages existants de bande passante et de transit I2P. La conversion préserve la section testnet4, les réglages personnalisés, les identifiants RPC et la blockchain.\n- Les actions de réparation et exclusions de sauvegarde utilisent le dossier testnet4. IPC et les instantanés UTXO mainnet restent indisponibles.',
  },
  migrations: {
    up: async ({ effects }) => {
      // Older testnet releases used the INI writer's quoting and escaping.
      // Decode that representation once before adopting Bitcoin's verbatim format.
      const conf = await FileHelper.ini(
        bitcoinConfFile.path,
        z.looseObject({}),
        { bracketedArray: false },
      )
        .read()
        .once()
      if (conf)
        await FileHelper.string(bitcoinConfFile.path).write(
          effects,
          toBitcoinConf(conf),
        )
    },
    down: async () => {
      // Older Core releases cannot read the v31 fee-estimator format.
      await rm('/media/startos/volumes/main/testnet4/fee_estimates.dat', {
        force: true,
      })
    },
  },
})
