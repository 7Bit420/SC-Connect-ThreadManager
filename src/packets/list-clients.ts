import * as net from "net";
import { clientMap, clientInfo } from "..";
import { MathPlus } from "../util/math"
import { packet } from "./packet"

class descoveryPacket implements packet {

    static type = 3;

    phrase(id: number, payload: Buffer, socket?: net.Socket) {
        var packet = [1]
        var pkid = MathPlus.spliceInt(id, 256)
        for (let i = 0; i < 4; i++) { packet[i + 1] = pkid[i] ?? 0 }

        var clients = Array.from(clientInfo.entries())
        packet.push(clients.length)
        clients.forEach(t => {
            packet.push(t[0].length)
            packet.push(...Array(t[0]).map(n => n.charCodeAt(0)))

            packet.push(t[1]?.address.address.length)
            packet.push(...Array(t[1]?.address.address).map(n => n.charCodeAt(0)))
        })

        socket.write(Buffer.from(packet))
    }

}

export { descoveryPacket }