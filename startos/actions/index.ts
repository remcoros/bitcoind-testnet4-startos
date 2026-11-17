import { sdk } from '../sdk'
import { autoconfig } from './config/autoconfig'
import { mempoolConfig } from './config/mempool'
import { otherConfig } from './config/other'
import { peerConfig } from './config/peers'
import { rpcConfig } from './config/rpc'
import { deleteBlockFilterIndex } from './deleteBlockFilterIndex'
import { deleteCoinstatsIndex } from './deleteCoinstatsIndex'
import { deletePeers } from './deletePeers'
import { deleteRpcAuth } from './deleteRpcAuth'
import { deleteTxIndex } from './deleteTxIndex'
import { generateRpcUser } from './generateRpcUser'
import { generateRpcUserDependent } from './generateRpcUserDependent'
import { reindexBlockchain } from './reindexBlockchain'
import { reindexChainstate } from './reindexChainstate'
import { runtimeInfo } from './runtimeInfo'
export const actions = sdk.Actions.of()
  .addAction(mempoolConfig)
  .addAction(peerConfig)
  .addAction(rpcConfig)
  .addAction(deleteRpcAuth)
  .addAction(generateRpcUser)
  .addAction(generateRpcUserDependent)
  .addAction(otherConfig)
  .addAction(runtimeInfo)
  .addAction(autoconfig)
  .addAction(deleteBlockFilterIndex)
  .addAction(deleteCoinstatsIndex)
  .addAction(deletePeers)
  .addAction(deleteTxIndex)
  .addAction(reindexBlockchain)
  .addAction(reindexChainstate)
