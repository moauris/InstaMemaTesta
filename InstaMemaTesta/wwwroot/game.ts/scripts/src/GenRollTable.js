export function genTable(target, from, to) {
    let result = [];
    for (let i = from; i <= to; i++) {
        if (countOnesinNumber(i) === target) {
            result.push(i);
        }
    }
    return result;
}
export function countOnesinNumber(target) {
    let result = 0;
    while (target > 0) {
        if ((1 & target) === 1)
            result++;
        target = target >> 1;
    }
    return result;
}
