function getCombination(lang, field, career, soulfood) {
    let result = [];
    
    for (let lIdx = 0; lIdx < lang.length; lIdx++) {
        for (let fIdx = 0; fIdx < field.length; fIdx++) {
            for (let cIdx = 0; cIdx < career.length; cIdx++) {
                for (let sIdx = 0; sIdx < soulfood.length; sIdx++) {
                    result.push({
                        lang: lang[lIdx],
                        field: field[fIdx],
                        career: career[cIdx],
                        soulfood: soulfood[sIdx],
                        score: []
                    });
                }
            }
        }
    }
    return result;
}

function getInfoTable() {
    const lang = ['cpp', 'java', 'python'];
    const field = ['backend', 'frontend'];
    const career = ['junior', 'senior'];
    const soulfood = ['chicken', 'pizza'];
    return getCombination(lang, field, career, soulfood);
}

function insertScoreToTable(info, table) {
    let tTable = table.slice();
    
    info.forEach(infoItem => {
        // 0: lang, 1: field, 2: career, 3: soulfood, 4: score
        const parsedInfo = infoItem.split(' ');
        for (let tIdx = 0; tIdx < tTable.length; tIdx++) {
            if (tTable[tIdx].lang == parsedInfo[0] &&
                tTable[tIdx].field == parsedInfo[1] &&
                tTable[tIdx].career == parsedInfo[2] &&
                tTable[tIdx].soulfood == parsedInfo[3]) {
                
                tTable[tIdx].score.push(parseInt(parsedInfo[4]));
                break;
            }
        }
    });
    
    tTable = tTable.map(item => {
        return {
            ...item,
            score: item.score.sort((a, b) => a - b)
        };
    });
    return tTable;
}

function parseQuery(query) {
    let parsed = query;
    parsed = parsed.replace(/ and/g, '');
    parsed = parsed.split(' ');
    return parsed;
}

function lbBinarySearch(arr, val, start, end) {
    let ret = arr.length;
    let mid = parseInt((start + end) / 2);
    
    if (start > end) return ret;
    if (arr[mid] < val) {
        return Math.min(ret, lbBinarySearch(arr, val, mid + 1, end));
    }
    return Math.min(mid, lbBinarySearch(arr, val, start, mid - 1));
}

function queryToTable(parsedItem, filledTable) {
    let totalCnt = 0;
    let nTable = filledTable.slice();
    
    // lang
    if (parsedItem[0] != '-') {
        nTable = nTable.filter(item => item.lang == parsedItem[0]);
    }
    // field
    if (parsedItem[1] != '-') {
        nTable = nTable.filter(item => item.field == parsedItem[1]);
    }
    // career
    if (parsedItem[2] != '-') {
        nTable = nTable.filter(item => item.career == parsedItem[2]);
    }
    // soulfood
    if (parsedItem[3] != '-') {
        nTable = nTable.filter(item => item.soulfood == parsedItem[3]);
    }
    
    nTable.forEach(table => {
        if (table.score.length > 0) {
            const start = lbBinarySearch(table.score, parseInt(parsedItem[4]), 0, table.score.length);
            const cnt = (table.score.length) - start;
            totalCnt += cnt;
        }
    });
    return totalCnt;
}

function solution(info, query) {
    const table = getInfoTable();
    const filledTable = insertScoreToTable(info, table);
    
    let answer = [];
    query.forEach(queryItem => {
        const parsedItem = parseQuery(queryItem);
        const cnt = queryToTable(parsedItem, filledTable);
        answer.push(cnt);
    });
    return answer;
}
