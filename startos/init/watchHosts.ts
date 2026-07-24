import { bitcoinConfFile } from '../fileModels/bitcoin.conf'
import { sdk } from '../sdk'
import { peerHostId, peerInterfaceId } from '../utils'

export const watchHosts = sdk.setupOnInit(async (effects) => {
  const externalip = await sdk.host
    .getOwn(effects, peerHostId, (host) => {
      const iface =
        host &&
        Object.values(host.bindings)
          .flatMap((binding) => Object.values(binding.interfaces))
          .find((candidate) => candidate.id === peerInterfaceId)
      if (!iface) return undefined

      const publicInfo = iface.addressInfo.public.filter({
        exclude: { kind: 'domain' },
      })
      return [
        ...publicInfo
          .filter({
            predicate: ({ metadata }) =>
              metadata.kind === 'plugin' && metadata.packageId === 'tor',
          })
          .format(),
        ...publicInfo.filter({ kind: 'ipv4' }).format(),
      ]
    })
    .const()

  if (!externalip) return

  await bitcoinConfFile.merge(
    effects,
    { raw: { externalip: externalip.length ? externalip : undefined } },
    { allowWriteAfterConst: true },
  )
})
