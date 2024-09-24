let arraySize = 15;
let array = [];

function init(){
    for (let i=0; i < arraySize; i++) {
        array[i] = Math.random();
    }
    showBars();
}

function showBars(indices){
    container.innerHTML = "";
    for (let i=0; i<arraySize; i++){
        const bar = document.createElement("div");
        bar.style.height = array[i]*100+"%";
        bar.classList.add("bar");
        if (indices && indices.includes(i))
            bar.style.backgroundColor = "red";
        container.appendChild(bar);
    }
}

function play(){
    const copy = [...array];
    swaps = bubbleSort(copy, arraySize);
    animate(swaps);
}

function animate(swaps){
    if (swaps.length == 0){
        showBars();
        return;
    }
    const [i,j] = swaps.shift();
    [array[i], array[j]] = [array[j], array[i]];
    showBars([i,j]);
    setTimeout(function(){
        animate(swaps);
    },50);
}

function bubbleSort(arr, n)
{
    let swaps = [];
    let swapped;
    for (let i = 0; i < n - 1; i++){
        swapped = false;
        for (let j = 0; j < n - i - 1; j++){
            if (arr[j] > arr[j + 1]){
                swaps.push( [j, j+1] );
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                swapped = true;
            }
        }
        if (swapped == false)
            break;
    }
    return swaps;
}