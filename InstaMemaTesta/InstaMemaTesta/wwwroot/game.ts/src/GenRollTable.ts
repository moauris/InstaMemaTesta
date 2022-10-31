
export function genTable(target: number, from: number, to: number) : Array<number>
{
    let result : Array<number> = [];
    for(let i = from; i <= to; i++)
    {
        if (countOnesinNumber(i) === target) {
            result.push(i);
        }
    }

    return result;
}

export function countOnesinNumber(target: number): number
{
    let result: number = 0;
    while (target > 0) {
        if((1 & target) === 1) result++;
        target = target >> 1;
    }

    return result;
}