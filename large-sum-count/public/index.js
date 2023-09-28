const sharedData = new SharedArrayBuffer(4);
const sharedResult = new Int32Array(sharedData);

const arrLength = 1000000;

const sharedArrayData = new SharedArrayBuffer(4 * arrLength);
const sharedArrayResult = new Int32Array(sharedArrayData);

const generated = new Promise((res) => {

    let arrayWorker = new Worker('./worker-create-array.js');
    arrayWorker.onmessage = () => {
        res();
        arrayWorker.terminate();
    }
    arrayWorker.postMessage({number: arrLength, sharedData: sharedArrayResult})
})

generated.then(() => {
    const numWorkers = 5;
    const workers = [];
    const defaultArray = Array.from(sharedArrayResult);
    console.time('start all')
    for(let i of Array(numWorkers).keys()) {
        console.time('start worker' + i);
        workers[i] = new Worker('./worker.js');
        workers[i].onmessage = (event) => {
            console.log(sharedResult[0], event.data);
            console.timeEnd('start worker' + i);
        }
    }


    const chunkSize = Math.ceil(defaultArray.length / numWorkers)
    for(let i of Array(numWorkers).keys()) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, defaultArray.length);
        const chunk = defaultArray.slice(start, end);
        workers[i].postMessage({chunkIndex: i, chunk, sharedData: sharedResult })
    }


    console.timeEnd('start all')
})

