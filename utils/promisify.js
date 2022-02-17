// #1
async function asyncPlus(a, b) {
	return a + b;
}
asyncPlus(1, 2).then((res) => console.log(res));

// #2
function makeAsync(func) {
	return new Promise((resolve, reject) => {
		resolve(func);
	});
}

function plus(a, b) {
	return a + b;
}

makeAsync(plus(1, 2)).then((res) => console.log(res));

// Promise 전달 함수
let newPipe = (...args) => Promise.resolve(plus).then((res) => {
        console.log('res : ', res(...args));
});
newPipe(1, 2);

