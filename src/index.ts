import * as net from 'net';
import { serverListner } from './serverlistner';

const clientMap: Map<string, net.Socket> = new Map()
const clientInfo: Map<string, {
    address: net.AddressInfo | {
        address?: string
    }
    remoteAddress: string
    remotePort: number
}> = new Map()

net.createServer(serverListner)

export { clientMap, clientInfo }