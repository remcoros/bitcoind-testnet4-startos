import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { i2pUiPort } from '../utils'

const iniNumber = z.union([z.string().transform(Number), z.number()])

const iniBoolean = z.union([
  z.string().transform((s) => !!Number(s)),
  z.number().transform((n) => !!n),
  z.boolean(),
])

export const shape = z.looseObject({
  log: z.literal('stdout').catch('stdout'),
  loglevel: z
    .enum(['none', 'critical', 'error', 'warn', 'info', 'debug'])
    .catch('critical'),
  port: iniNumber.catch(14096),
  ipv4: iniBoolean.catch(true),
  ipv6: iniBoolean.catch(false),
  bandwidth: z.enum(['L', 'O', 'P']).catch('L'),
  share: iniNumber.catch(100),
  notransit: iniBoolean.catch(false),
  floodfill: iniBoolean.catch(false),
  ntcp2: z
    .looseObject({
      enabled: iniBoolean.catch(true),
      published: iniBoolean.catch(true),
    })
    .catch({ enabled: true, published: true }),
  ssu2: z
    .looseObject({
      enabled: iniBoolean.catch(true),
      published: iniBoolean.catch(true),
    })
    .catch({ enabled: true, published: true }),
  http: z
    .looseObject({
      enabled: iniBoolean.catch(false),
      address: z.string().catch('0.0.0.0'),
      port: iniNumber.catch(i2pUiPort),
      strictheaders: iniBoolean.catch(false),
    })
    .catch({
      enabled: false,
      address: '0.0.0.0',
      port: i2pUiPort,
      strictheaders: false,
    }),
  httpproxy: z
    .looseObject({
      enabled: iniBoolean.catch(false),
    })
    .catch({ enabled: false }),
  socksproxy: z
    .looseObject({
      enabled: iniBoolean.catch(false),
    })
    .catch({ enabled: false }),
  sam: z
    .looseObject({
      enabled: iniBoolean.catch(true),
    })
    .catch({ enabled: true }),
  i2pcontrol: z
    .looseObject({
      enabled: iniBoolean.catch(true),
      address: z.literal('127.0.0.1').catch('127.0.0.1'),
      port: iniNumber.catch(7650),
      password: z.string().catch('itoopie'),
    })
    .catch({
      enabled: true,
      address: '127.0.0.1',
      port: 7650,
      password: 'itoopie',
    }),
  upnp: z
    .looseObject({
      enabled: iniBoolean.catch(false),
    })
    .catch({ enabled: false }),
  reseed: z
    .looseObject({
      verify: iniBoolean.catch(true),
    })
    .catch({ verify: true }),
  limits: z
    .looseObject({
      transittunnels: iniNumber.catch(10000),
    })
    .catch({ transittunnels: 10000 }),
})

export const i2pdConfFile = FileHelper.ini(
  {
    base: sdk.volumes.i2pd,
    subpath: '/data/i2pd.conf',
  },
  shape,
)
