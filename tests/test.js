const net = require('net')

var connection = net.createConnection({
    port: 2000,
    host: "localhost"
})
    .on('connect', async () => {
        connection.write(Buffer.from([
            /* auth packet */
            0,
            /* packet id */
            0, 0, 0, 1,
            /* payload len */
            0, 0, 0, 5,
            /* name len */
            4,
            /* test */
            116, 101, 115, 116
        ]))
        await new Promise((res) => setTimeout(res, 1000))

        connection.write(Buffer.from([
            /* log packet */
            10,
            /* packet id */
            0, 0, 0, 2,
            /* payload len */
            0, 0, 0, 14,
            /* msg len */
            0, 12,
            /* Hello World! */
            72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33
        ]))

        await new Promise((res) => setTimeout(res, 1000))

        connection.write(Buffer.from([
            /* descovery packet */
            3,
            /* packet id */
            0, 0, 0, 3,
            /* payload len */
            0, 0, 0, 0
        ]))
    })
    .on('data', (data) => {
        console.log(data.toString('ascii'))
    })