import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '31.0:2',
  releaseNotes: {
    en_US:
      'Adds StartOS 0.4.0-beta.10 and Start SDK 2 compatibility, dynamic Tor bridge routing, and stable RPC/ZMQ provider bindings.',
    es_ES:
      'Añade compatibilidad con StartOS 0.4.0-beta.10 y Start SDK 2, enrutamiento Tor dinámico y enlaces RPC/ZMQ estables.',
    de_DE:
      'Fügt Kompatibilität mit StartOS 0.4.0-beta.10 und Start SDK 2, dynamisches Tor-Routing und stabile RPC/ZMQ-Bindungen hinzu.',
    pl_PL:
      'Dodaje zgodność ze StartOS 0.4.0-beta.10 i Start SDK 2, dynamiczny routing Tor oraz stabilne powiązania RPC/ZMQ.',
    fr_FR:
      'Ajoute la compatibilité avec StartOS 0.4.0-beta.10 et Start SDK 2, le routage Tor dynamique et des liaisons RPC/ZMQ stables.',
  },
  migrations: {
    up: async () => {},
    down: async () => {},
  },
})
