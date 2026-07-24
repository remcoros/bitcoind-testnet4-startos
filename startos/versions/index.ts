import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_30_2_7 } from './v30.2.7'
import { v_31_0_1 } from './v31.0.1'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_31_0_1, v_30_2_7],
})
