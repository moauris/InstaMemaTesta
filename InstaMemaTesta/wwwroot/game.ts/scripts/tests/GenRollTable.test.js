const GenRoll = require('../src/GenRollTable.js');

test('countOnesinNumber with 0', () => {
    let actual = GenRoll.countOnesinNumber(0)
    expect(actual).toBe(0)
});
test('countOnesinNumber with 1', () => {
    let actual = GenRoll.countOnesinNumber(1)
    expect(actual).toBe(1)
});
test('countOnesinNumber with 2', () => {
    let actual = GenRoll.countOnesinNumber(2)
    expect(actual).toBe(1)
});
test('countOnesinNumber with 3', () => {
    let actual = GenRoll.countOnesinNumber(3)
    expect(actual).toBe(2)
});
test('countOnesinNumber with 511', () => {
    let actual = GenRoll.countOnesinNumber(511)
    expect(actual).toBe(9)
});