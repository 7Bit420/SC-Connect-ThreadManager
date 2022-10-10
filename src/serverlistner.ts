import * as net from "net";
import { Math } from "./util/math.ts"

function serverListner(socket: net.Socket) {

    socket.on('data', (data) => {
        const pktTyp = data[0]
        const pktID = 
    })
}

export { serverListner }