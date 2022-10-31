"use strict";
class Game {
    /**
     *
     */
    constructor(maxRound) {
        this.numbersGuessed = [];
        this.selectIndex = 0;
        this.maxRound = maxRound;
        this.currentRound = 1;
        this.difficulty = 4;
        this.GuessNumbers = [];
    }
    initRound(difficulty = 4) {
        if (difficulty !== void 0 && difficulty !== this.difficulty) {
            this.difficulty = difficulty;
        }
        let lower = Game.randLowerBounds[this.difficulty - 4];
        let upper = Game.randUpperBounds[this.difficulty - 4];
        let comboIndex = this.GetRandom(lower, upper);
        let comboBin = Game.randomRollTable[comboIndex];
        this.GuessNumbers =
            this.getNumArrFromBinary(comboBin, this.difficulty === 5);
        this.numbersGuessed = new Array(this.difficulty);
        for (let i = 0; i < this.difficulty; i++) {
            this.numbersGuessed[i] = false;
        }
        ;
        this.selectIndex = 0;
    }
    Selected(x) {
        let Answer = this.GuessNumbers[this.selectIndex];
        this.numbersGuessed[this.selectIndex] = x === Answer;
        this.selectIndex++;
    }
    getNumArrFromBinary(binary, needReverse = false) {
        let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let res = [];
        let i = 0;
        if (needReverse) {
            binary = ~binary & 511;
        }
        while (binary > 0) {
            if ((1 & binary) === 1) {
                res.push(nums[i]);
            }
            i++;
            binary >>= 1;
        }
        return res;
    }
    GetRandom(lower, upper) {
        let rand = Math.random() * (upper - lower) + lower;
        return Math.floor(rand);
    }
}
Game.randLowerBounds = [0, 0, 126, 210, 246, 255];
Game.randUpperBounds = [125, 125, 209, 245, 254, 256];
Game.randomRollTable = [
    // 0 - 125 (126), draw of 4 (or 5)
    15, 23, 27, 29, 30, 39, 43, 45, 46, 51, 53, 54, 57, 58, 60, 71,
    75, 77, 78, 83, 85, 86, 89, 90, 92, 99, 101, 102, 105, 106,
    108, 113, 114, 116, 120, 135, 139, 141, 142, 147, 149, 150,
    153, 154, 156, 163, 165, 166, 169, 170, 172, 177, 178, 180,
    184, 195, 197, 198, 201, 202, 204, 209, 210, 212, 216, 225,
    226, 228, 232, 240, 263, 267, 269, 270, 275, 277, 278, 281,
    282, 284, 291, 293, 294, 297, 298, 300, 305, 306, 308, 312,
    323, 325, 326, 329, 330, 332, 337, 338, 340, 344, 353, 354,
    356, 360, 368, 387, 389, 390, 393, 394, 396, 401, 402, 404,
    408, 417, 418, 420, 424, 432, 449, 450, 452, 456, 464, 480,
    // 126 - 209 (84), draw of 6
    63, 95, 111, 119, 123, 125, 126, 159, 175, 183, 187, 189,
    190, 207, 215, 219, 221, 222, 231, 235, 237, 238, 243, 245,
    246, 249, 250, 252, 287, 303, 311, 315, 317, 318, 335, 343,
    347, 349, 350, 359, 363, 365, 366, 371, 373, 374, 377, 378,
    380, 399, 407, 411, 413, 414, 423, 427, 429, 430, 435, 437,
    438, 441, 442, 444, 455, 459, 461, 462, 467, 469, 470, 473,
    474, 476, 483, 485, 486, 489, 490, 492, 497, 498, 500, 504,
    // 210 - 245 (36), draw of 7
    127, 191, 223, 239, 247, 251, 253, 254, 319, 351, 367, 375,
    379, 381, 382, 415, 431, 439, 443, 445, 446, 463, 471, 475,
    477, 478, 487, 491, 493, 494, 499, 501, 502, 505, 506, 508,
    // 246 - 254 (9), draw of 8
    255, 383, 447, 479, 495, 503, 507, 509, 510,
    // 255, draw of 9
    511
];
