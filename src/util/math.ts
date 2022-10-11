

class MathPlus {

    static spliceInt(n: number, base: number = 2) {

    }
    static mergeInt(n: number[] | Buffer, base: number = 2) {
        var x = 0, p = 0;
        while (p < n.length) {
            x += (n[n.length - p - 1] * Math.pow(base, p));
            p++;
        }
        return x
    }
}

export { MathPlus }