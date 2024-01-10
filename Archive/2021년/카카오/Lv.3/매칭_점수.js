function getMyUrl (page) {
    const headStart = page.indexOf('<head>');
    const headEnd = page.indexOf('</head>');
    page = page.slice(headStart, headEnd);
    page = page.split('\n');
    
    const prefix = `<meta property="og:url" content="`;
    const metaRegex = new RegExp(/<meta property="og:url" content="https:\S*"/);
    const url = page
        .flatMap(str => str.match(metaRegex))
        .filter(item => item)
        .map(item => item.slice(prefix.length, item.length - 1));
    return url[0];
}

function getExternalLinks (page) {
    const bodyStart = page.indexOf('<body>');
    const bodyEnd = page.indexOf('</body>');
    page = page.slice(bodyStart, bodyEnd);
    page = page.split('\n');
    
    const linksRegex = new RegExp(/<a href="https:\S*"/, 'gi');
    const externalLinks = page
        .flatMap(str => str.match(linksRegex))
        .filter(item => item)
        .map(item => item.slice(9, item.length - 1));
    
    return externalLinks;
}

function getBaseScore (word, page) {
    word = word.toLowerCase();
    page = page.toLowerCase();
    
    const bodyStart = page.indexOf('<body>');
    const bodyEnd = page.indexOf('</body>');
    page = page.slice(bodyStart, bodyEnd);
    page = page.split('\n');
    
    const wordRegex = new RegExp(/[\d|\W]/);
    let baseScore = 0;
    baseScore = page.flatMap(str => str.toLowerCase().split(wordRegex)).filter(e => e == word).length;
    return baseScore;
}

function getLinkScore (webpages, curIdx) {
    const externalLinks = webpages[curIdx].externalLinks;
    externalLinks.forEach(externalLink => {
        const fIdx = webpages.findIndex(item => item.url == externalLink);
        if (fIdx >= 0 && webpages[curIdx].externalLinks.length > 0) {
            webpages[fIdx].linkScore += (webpages[curIdx].baseScore / webpages[curIdx].externalLinks.length);
        }
    });
}

function getMatchingScore (webpages, curIdx) {
    webpages[curIdx].matchingScore = (webpages[curIdx].baseScore + webpages[curIdx].linkScore);
}

function solution(word, pages) {
    let answer = 0;
    
    const webpages = [];
    for (let i = 0; i < pages.length; i++) {
        webpages.push({
            index: i,
            url: '',
            externalLinks: [],
            baseScore: 0,
            linkScore: 0,
            matchingScore: 0,
        });
    }
    
    for (let i = 0; i < pages.length; i++) {
        const url = getMyUrl(pages[i]);
        const externalLinks = getExternalLinks(pages[i]);
        const baseScore = getBaseScore(word, pages[i]);
        
        webpages[i].url = url;
        webpages[i].externalLinks = externalLinks;
        webpages[i].baseScore = baseScore;
    }
    for (let i = 0; i < pages.length; i++) {
        getLinkScore(webpages, i);
    }
    for (let i = 0; i < pages.length; i++) {
        getMatchingScore(webpages, i);
    }
    const scores = webpages.map(webpage => webpage.matchingScore);
    const maxScores = Math.max(...scores);
    const maxPages = webpages.filter(webpage => webpage.matchingScore == maxScores);
    maxPages.sort((a, b) => a.index - b.index);
    return maxPages[0].index;
}
