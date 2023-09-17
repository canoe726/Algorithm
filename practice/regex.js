// 시작, 끝 문자 기준으로 단어 구분
// 시작문자 : '${', 끝문자 : '}'
const str1 = '${spec_common_0} - ${spec_4} [필터]cm';
const res1 = str1.match(/\$\{(.*?)\}/g);
