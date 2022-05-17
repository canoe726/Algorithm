/**
 * https://m.blog.naver.com/alwaysneoi/100151898175
 * https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=baboedition&logNo=220933436576
 * 
 *      중복비허용 중복허용
 * 순서고려 순열(P) 중복순열(파이)
 * 순서무시 조합(C) 중복조합(H)
 * 
 * ex) 1, 2, 3
 * 순열: (1, 2), (2, 1), (1, 3), (3, 1), (2, 3), (3, 2) = 3P2 = 6
 * 조합: (1, 2), (1, 3), (2, 3) = 3C2 = 3
 * 중복순열: (1, 1), (1, 2), (2, 1), (2, 2), (1, 3), (3, 1), (3, 3), (2, 3), (3, 2) = 3파이2 = 9
 * 중복조합: (1, 1), (1, 2), (2, 2), (1, 3), (3, 3), (2, 3) = 3H2 = 6 = (2+2)C(2) = 6
 * => aHb = a종류에서 b개 뽑기, 종류를 나누는 칸막이 개수 = 종류 개수 - 1
 * (칸막이 개수 + 뽑는 개수)C(칸막이 개수)
 */
const number = [1, 2, 3];

/** 순열 */
function permutation (num, pick) {
  const perm = [];
  const visited = Array.from({ length: num.length }, () => false);

  function getPerm (p) {
    if (p.length == pick) {
      perm.push(p);
      return;
    }

    for (let i = 0; i < num.length; i++) {
      if (!visited[i]) {
        const nextPerm = p.slice()
        visited[i] = true;
        nextPerm.push(num[i]);
        getPerm(nextPerm, i);
        visited[i] = false;
      }
    }

  }
  getPerm([]);
  return perm;
}
// const perm = permutation(number, 2);
// console.log('permutation: ', perm);

/** 조합 */
function combination (num, pick) {
  const comb = [];

  function getComb (c, idx) {
    if (c.length == pick) {
      comb.push(c);
      return;
    }

    for (let i = idx + 1; i < num.length; i++) {
      const nextComb = c.slice()
      nextComb.push(num[i]);
      getComb(nextComb, i);
    }

  }
  getComb([], -1);
  return comb;
}
// const comb = combination(number, 2);
// console.log('combination: ', comb);

/** 중복 순열 */
function permutationWithRep (num, pick) {
  const permWithRep = [];

  function getPermWithRep (p) {
    if (p.length == pick) {
      permWithRep.push(p);
      return;
    }
    for (let i = 0; i < num.length; i++) {
      const nextPermWithRep = p.slice();
      nextPermWithRep.push(num[i]);
      getPermWithRep(nextPermWithRep);
    }
  }
  getPermWithRep([]);
  return permWithRep;
}
// const permWithRep = permutationWithRep(number, 2);
// console.log('permutationWithRep: ', permWithRep);

/** 중복 조합 */
function combintaionWithRep (num, pick) {
  const combWithRep = [];
  
  function getCombWithRep (c, idx) {
    if (c.length == pick) {
      combWithRep.push(c);
      return;
    }
    for (let i = idx; i < num.length; i++) {
      const nextCombWithRep = c.slice();
      nextCombWithRep.push(num[i]);
      getCombWithRep(nextCombWithRep, i);
    }
  }
  getCombWithRep([], 0);
  return combWithRep;
}
// const combWithRep = combintaionWithRep(arrow, 10);
// console.log('combinationWithRep: ', combWithRep, combWithRep.length);
