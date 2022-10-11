import * as net from "net";
import { clientMap, clientInfo } from "..";
import { MathPlus } from "../util/math"
import { packet } from "./packet"

class authPacket implements packet {

    static type = 0;

    phrase(id: number, payload: Buffer, socket?: net.Socket) {
        const clName = payload.subarray(1, 1 + payload[0]).toString('ascii')

        if (clientMap.has(clName)) {
            socket.write(Buffer.from([2]))
            socket.end()
        }

        clientMap.set(clName, socket)
        clientInfo.set(clName, {
            address: socket.address(),
            remoteAddress: socket.remoteAddress,
            remotePort: socket.remotePort,
        })

        socket.once('end', () => {
            clientMap.delete(clName)
            clientInfo.delete(clName)
        })

        socket.write(Buffer.from([]))
    }

}

export { authPacket }