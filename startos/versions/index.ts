import { VersionGraph } from '@start9labs/start-sdk'
import { v_30_2_7 } from './v30.2.7'
import { v_31_0_1 } from './v31.0.1'

export const versionGraph = VersionGraph.of({
  current: v_31_0_1,
  other: [v_30_2_7],
})
