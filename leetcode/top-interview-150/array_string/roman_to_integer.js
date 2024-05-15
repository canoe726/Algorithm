/**
 * @param {string} s
 * @return {number}
 */

function prefillRoman(roman) {
  let sym = [1, 5, 10, 50, 100, 500, 1000];
  roman[1] = 'I';
  roman[4] = 'IV';
  roman[5] = 'V';
  roman[9] = 'IX';
  roman[10] = 'X';
  roman[40] = 'XL';
  roman[50] = 'L';
  roman[90] = 'XC';
  roman[100] = 'C';
  roman[400] = 'CD';
  roman[500] = 'D';
  roman[900] = 'CM';
  roman[1000] = 'M';

  for (let i = 0; i < sym.length; i++) {
    if (i % 2 === 0) {
      let base = roman[sym[i]];
      for (let j = 2; j < 4; j++) {
        let next = sym[i] * j;
        let temp = base.repeat(j);
        roman[next] = temp;
      }

      if (sym[i] >= 1000) {
        break;
      }

      let five = 5;
      let mid = roman[five * sym[i]];
      for (let j = 6; j < 9; j++) {
        let next = sym[i] * j;
        let temp = mid + base.repeat(j - five);
        roman[next] = temp;
      }
    }
  }
}

var romanToInt = function (s) {
  let size = 4000;
  let roman = new Array(size).fill(null);
  prefillRoman(roman);

  let base = -1;
  for (let i = 10; i < size; i++) {
    if (Math.log10(i) % 1 === 0) {
      base = i;
    }

    if (roman[i] === null) {
      let prefix = roman[base * Math.floor(i / base)];
      let postfix = roman[i % base];
      roman[i] = prefix + postfix;
    }
  }

  for (let i = 1; i < size; i++) {
    if (roman[i] === s) {
      return i;
    }
  }

  return null;
};

romanToInt('MMCCCXCIX');
