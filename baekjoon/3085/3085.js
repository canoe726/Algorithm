const [n, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
  .toString()
  .trim()
  .split('\n');

function getRowMax (n, arr) {
    let rowMax = 0
    for (let y = 0; y < n; y++) {
        let max = 1

        for (let x = 0; x < n - 1; x++) {
            if (arr[y][x] === arr[y][x + 1]) {
                max += 1
            }
        }
        if (max > rowMax) {
            rowMax = max
        }
    }
    return rowMax
}

function getColumnMax (n, arr) {
    let columnMax = 0
    for (let x = 0; x < n; x++) {
        let max = 1

        for (let y = 0; y < n - 1; y++) {
            if (arr[y][x] === arr[y + 1][x]) {
                max += 1
            }
        }
        if (max > columnMax) {
            columnMax = max
        }
    }
    return columnMax
}

function deepClone (arr) {
    const newArr = []
    for (let i = 0; i < arr.length; i++) {
        newArr[i] = arr[i].slice()
    }
    return newArr
}

function getSwappedArr (n, arr, pos1, pos2) {
    const newArr = deepClone(arr)
    const [px1, py1] = pos1
    const [] = pos2

    newArr[]

}

function main(n, arr) {
    let answer = 0
    
    // horizontal
    for (let y = 0; y < n; y++) {
        for (let x = 0; x < n - 1; x++) {
            const swapArr = getSwappedArr(n, arr, [y, x], [y, x + 1])
            const maxValue = Math.max(getRowMax(n, swapArr), getColumnMax(n, swapArr))
            answer = maxValue
        }
    }
    // vertical

    console.log(getRowMax(n, arr), getColumnMax(n, arr))
}

const response = main(n, arr)
console.log(response)