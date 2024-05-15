/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  const units = [
    [
      [9, 'IX'],
      [5, 'V'],
      [4, 'IV'],
      [1, 'I'],
    ],
    [
      [9, 'XC'],
      [5, 'L'],
      [4, 'XL'],
      [1, 'X'],
    ],
    [
      [9, 'CM'],
      [5, 'D'],
      [4, 'CD'],
      [1, 'C'],
    ],
    [[1, 'M']],
  ];

  let roman = '';
  let cur = 0;
  let unit = 0;
  let curRoman;

  while (num > 0) {
    cur = num % 10;
    curRoman = [];

    units[unit].forEach(([key, value], idx) => {
      if (cur >= key) {
        curRoman.push(value);
        cur -= key;
      }

      if (idx === units[unit].length - 1) {
        for (let i = 0; i < cur; i++) {
          curRoman.push(value);
        }
      }
    });

    roman = curRoman.join('') + roman;
    num = Math.floor(num / 10);
    unit += 1;
  }

  return roman;
};

console.log(intToRoman(1994));
