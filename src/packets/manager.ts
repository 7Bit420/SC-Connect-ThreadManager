import { authPacket } from "./auth"

const packets = {
    "auth": new authPacket()
}
const packetTypes = {
    auth: 0,
    response: 1,
    error: 2,
    log: 10,
}
const responseCodes = {
    "Sucess": 0,
    "invalid packet": 1,
    "Allready Regastared": 2,
}

export { packets, packetTypes, responseCodes }