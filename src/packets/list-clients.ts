import * as net from "net";
import { clientMap, clientInfo } from "..";
import { MathPlus } from "../util/math"
import { packet } from "./packet"

class descoveryPacket implements packet {

    static type = 3;

    phrase(id: number, payload: Buffer, socket?: net.Socket) {
        var packet = [1]
        var response: Array<number> = []
        var pkid = MathPlus.spliceInt(id, 256)
        for (let i = 3; i > -1; i--) {
            packet.push(pkid[i] ?? 0)
        }

        var clients = Array.from(clientInfo.entries())
        response.push(clients.length)
        clients.forEach(t => {
            response.push(t[0].length)
            response.push(...Array.from(t[0]).map(n => n.charCodeAt(0)))

            response.push(t[1]?.address.address.length)
            response.push(...Array.from(t[1]?.address.address).map(n => n.charCodeAt(0)))
        })

        var pklen = MathPlus.spliceInt(response.length, 256)
        for (let i = 3; i > -1; i--) {
            packet.push(pklen[i] ?? 0)
        }

        socket.write(Buffer.from(packet.concat(response)))
    }

}

export { descoveryPacket }