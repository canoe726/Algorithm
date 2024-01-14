const camping = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
  .toString()
  .trim()
  .split('\n');

function main(camping) {
  for (let i = 0; i < camping.length; i++) {
    let answer = 0;
    let days = 0;
    const test = camping[i].split(' ');
    const [L, P, V] = test.map((t) => Number(t));

    let isCamping = true;
    while (true) {
      if (isCamping) {
        days += L;
        answer += L;
      } else {
        days += P - L;
      }

      if (days >= V) {
        if (isCamping) {
          const gap = days - V;
          answer -= gap;
        }

        break;
      }

      isCamping = !isCamping;
    }

    if (L === 0 && P === 0 && V === 0) {
      break;
    }
    console.log(`Case ${i + 1}: ${answer}`);
  }
}

main(camping);
