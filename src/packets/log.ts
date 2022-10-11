import * as net from "net";
import { clientMap, clientInfo } from "..";
import { MathPlus } from "../util/math"
import { packet } from "./packet"

class logPacket implements packet {

    static type = 10;

    phrase(id: number, payload: Buffer, socket?: net.Socket) {
        console.log(payload.subarray(1, 1 + MathPlus.mergeInt(payload.subarray(0, 1))).toString('ascii'))
    }

}

export { logPacket }