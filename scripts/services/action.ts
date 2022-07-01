import { exists, types as T } from '../dependencies.ts'

export const action = {
    async "delete-txindex"(effect: T.Effects, _input?: T.Config): Promise<T.ResultType<T.ActionResult>> {
        const txinfoLocation = {
            path: "indexes/txindex",
            volumeId: "main",
        }
        if (await exists(effect, txinfoLocation) === false) {
            return {
                result: {
                    copyable: false,
                    message: "Txindex doesn't exist",
                    version: "0",
                    qr: false,
                }
            }
        }
        await effect.removeDir(txinfoLocation);
        return {
            result: {
                copyable: false,
                message: "Deleted txindex",
                version: "0",
                qr: false,
            }
        }
    }
}