onmessage = (event) => {
    const number = event.data.number;
    const sharedData = event.data.sharedData;

    for (let i = 0; i < number; i++) {
        Atomics.add(sharedData, i,  Math.floor(Math.random() * 1000));
    }



    postMessage(sharedData);
}