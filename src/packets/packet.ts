import * as net from "net"

interface packet {
    phrase(id: number, payload: Buffer, socket?: net.Socket): void
}

export { packet }