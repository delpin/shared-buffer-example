onmessage = (event) => {
    const chunk = event.data.chunk;
    const sharedData = event.data.sharedData;
    const sum = chunk.reduce((res, el) => res + el, 0);

    Atomics.add(sharedData, 0, sum);

    postMessage(sum);
}