import * as net from "net";
import { packetTypes, packets, responseCodes } from "./packets/manager"
import { MathPlus } from "./util/math"

function serverListner(socket: net.Socket) {

    socket.on('data', (data) => {
        const pktTyp = data[0]
        const pktID = MathPlus.mergeInt(data.subarray(1, 5), 256)
        const pktLen = MathPlus.mergeInt(data.subarray(5, 9), 256)

        if ((data.length - 9) != pktLen) {
            socket.write(Buffer.concat([
                Buffer.from([packetTypes.error]),
                data.subarray(1, 5),
                Buffer.from([0, 0, 0, 1, responseCodes["invalid packet"]])
            ]))
            return socket.end()
        }

        packets[pktTyp].phrase(pktID, data.subarray(9, 9 + pktLen), socket)
    })
}

export { serverListner }

/* 

STANDARD: [ TYPE, ID, ID, ID, ID, LEN, LEN, LEN, LEN, ...PAYLOAD ]
PAYLOADS: 
    AUTH            : [ NAMELEN, ...NAME ] ✅
    AUTH-RES        : [ SUCESS ] ✅
    LIST-CLIENTS    : [  ] ✅
    LIST-CLIENTS-RES: [ CLIENTLEN, ...[ CLIENTNAMELEN, ..CLIENTNAME, CLIENTADDRID, ...CLIENTADDR ] ] ✅
    LOG             : [ MESAGELEN, MESAGELEN, ...MESSAGE ] ✅


[
  1, 
  0, 0, 0,  0,
  1, 3, 101,3, 
  58
]
*/