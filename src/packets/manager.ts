import { descoveryPacket } from "./list-clients"
import { logPacket } from "./log"
import { authPacket } from "./auth"

const packets = {
    0: new authPacket(),
    3: new descoveryPacket(),
    10: new logPacket()
}
const packetTypes = {
    auth: 0,
    response: 1,
    error: 2,
    descovery: 3,
    log: 10,
}
const responseCodes = {
    "Sucess": 0,
    "invalid packet": 1,
    "Allready Regastared": 2,
}

export { packets, packetTypes, responseCodes }