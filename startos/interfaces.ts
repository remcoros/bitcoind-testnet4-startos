import { bitcoinConfFile } from './fileModels/bitcoin.conf'
import { i2pdConfFile } from './fileModels/i2pd.conf'
import { i18n } from './i18n'
import { sdk } from './sdk'
import {
  i2pConsoleHostId,
  i2pUiPort,
  peerHostId,
  peerInterfaceId,
  peerPortExternal,
  peerPortInternal,
  rpcHostId,
  rpcInterfaceId,
  rpcPort,
  zmqBlockInterfaceId,
  zmqHostId,
  zmqPortBlock,
  zmqPortTransaction,
  zmqTxInterfaceId,
} from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const bitcoinConf = await bitcoinConfFile.read().const(effects)
  if (!bitcoinConf) return []

  const rpcOrigin = await sdk.MultiHost.of(effects, rpcHostId).bindPort(
    rpcPort,
    { protocol: 'http', preferredExternalPort: rpcPort },
  )
  const rpc = sdk.createInterface(effects, {
    name: i18n('RPC Interface'),
    id: rpcInterfaceId,
    description: i18n('Listens for JSON-RPC commands'),
    type: 'api',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })
  const receipts = [await rpcOrigin.export([rpc])]

  const peerOrigin = await sdk.MultiHost.of(effects, peerHostId).bindPort(
    peerPortInternal,
    {
      protocol: null,
      preferredExternalPort: peerPortExternal,
      addSsl: null,
      secure: { ssl: false },
    },
  )
  const peer = sdk.createInterface(effects, {
    name: i18n('Peer Interface'),
    id: peerInterfaceId,
    description: i18n(
      'Listens for incoming connections from peers on the bitcoin network',
    ),
    type: 'p2p',
    masked: false,
    schemeOverride: { ssl: null, noSsl: null },
    username: null,
    path: '',
    query: {},
  })
  receipts.push(await peerOrigin.export([peer]))

  if (bitcoinConf.zmqEnabled) {
    const zmqHost = sdk.MultiHost.of(effects, zmqHostId)
    const blockOrigin = await zmqHost.bindPort(zmqPortBlock, {
      preferredExternalPort: zmqPortBlock,
      addSsl: null,
      secure: { ssl: false },
      protocol: null,
    })
    const block = sdk.createInterface(effects, {
      name: i18n('ZeroMQ Interface'),
      id: zmqBlockInterfaceId,
      description: i18n(
        'Streams real-time Bitcoin block and transaction notifications (hashes and raw data)',
      ),
      type: 'api',
      masked: false,
      schemeOverride: null,
      username: null,
      path: '',
      query: {},
    })
    receipts.push(await blockOrigin.export([block]))

    const txOrigin = await zmqHost.bindPort(zmqPortTransaction, {
      preferredExternalPort: zmqPortTransaction,
      addSsl: null,
      secure: { ssl: false },
      protocol: null,
    })
    const tx = sdk.createInterface(effects, {
      name: i18n('ZeroMQ Interface'),
      id: zmqTxInterfaceId,
      description: i18n(
        'Streams real-time Bitcoin block and transaction notifications (hashes and raw data)',
      ),
      type: 'api',
      masked: false,
      schemeOverride: null,
      username: null,
      path: '',
      query: {},
    })
    receipts.push(await txOrigin.export([tx]))
  }

  const i2pConsoleEnabled = await i2pdConfFile
    .read((value) => value.http.enabled)
    .const(effects)
  if (bitcoinConf.raw?.i2psam && i2pConsoleEnabled) {
    const origin = await sdk.MultiHost.of(effects, i2pConsoleHostId).bindPort(
      i2pUiPort,
      { protocol: 'http' },
    )
    const iface = sdk.createInterface(effects, {
      name: i18n('I2P Daemon Console'),
      id: i2pConsoleHostId,
      description: i18n('Interface to access the embedded I2P daemon console'),
      type: 'ui',
      masked: false,
      schemeOverride: null,
      username: null,
      path: '',
      query: {},
    })
    receipts.push(await origin.export([iface]))
  }

  return receipts
})
