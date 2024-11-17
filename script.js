let arraySize = 10;
let array = [];
let bars = [];
let barWidth;
let barMargin;
let speed = 500;
let paused = false;
let sortAlg;
const speedSlider = document.getElementById("speedSlider");
const barsSlider = document.getElementById("barsSlider");
const barsNumberLabel = document.getElementById("barsNumber");
const playBtn = document.getElementById("playBtn");
const initBtn = document.getElementById("initBtn");
const bubbleSortBtn = document.getElementById("bubbleSortBtn");
const insertionSortBtn = document.getElementById("insertionSortBtn");

function init(){
    paused = true;
    bars = [];
    stage.innerHTML = "";
    const stageElement = document.getElementById('stage');
    switch (true){
        case (arraySize >= 35):
            barMargin = 1;
            break;
        case (arraySize >= 20):
            barMargin = 5;
            break;
        case (arraySize >= 10):
            barMargin = 10;
            break;
        case (arraySize <= 10):
            barMargin = 20;
            break;
    }
    barWidth = ( stageElement.getBoundingClientRect().width - arraySize*barMargin) / arraySize;

    for (let i=0; i < arraySize; i++){
        array[i] = Math.random();
        const bar = document.createElement("div");
        bar.style.height = array[i]*100+"%";
        bar.style.width = `${barWidth}px`;
        bar.style.left = `${ i*(barWidth + barMargin) }px`;
        bar.classList.add("bar");
        stage.appendChild(bar);
        bars.push(bar);
    }
}

async function play() {
    paused = false;
    playBtn.disabled = true;
    const swaps = sortAndGenerateSwaps(array, arraySize, sortAlg);
    if (swaps.length === 0){
        for(let i = 0; i < bars.length; i++){
            bars[i].classList.add("activate");
        }
        await sleep();
        for(let i = 0; i < bars.length; i++){
            bars[i].classList.remove("activate");
        }
    }
    else for (let i = 0; i < swaps.length; i++) {
        if (paused) break;
        const [left, right] = swaps[i];
        await animateSwap(left, right);
    }
    playBtn.disabled = false;
}

function sortAndGenerateSwaps(arr, n, alg){
    switch (alg){
        case "Bubble Sort":
            return bubbleSort(arr, n);
        case "Insertion Sort":
            return insertionSort(arr);
    }

}

async function animateSwap(i,j){
    bars[i].style.left = `${j*(barWidth + barMargin)}px`;
    bars[i].classList.add('activate');
    bars[j].style.left = `${i*(barWidth + barMargin)}px`;
    bars[j].classList.add('activate');
    await sleep();
    bars[i].classList.remove('activate');
    bars[j].classList.remove('activate');
    [bars[i], bars[j]] = [bars[j], bars[i]];
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

function insertionSort(arr) {
    let swaps = [];
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            swaps.push( [j+1, j] );
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return swaps;
}

function sleep() {
    return new Promise(resolve => setTimeout(resolve, speed));
}

speedSlider.addEventListener('input',() => {
    speed = 1010 - speedSlider.value * 100;
})

barsSlider.addEventListener('input', () => {
    barsNumberLabel.innerText = barsSlider.value;
    arraySize = barsSlider.value;
})

initBtn.addEventListener('click', () => btnClick(initBtn));
playBtn.addEventListener('click', () => btnClick(playBtn));
bubbleSortBtn.addEventListener('click', () => sortBtnClick(bubbleSortBtn));
insertionSortBtn.addEventListener('click', () => sortBtnClick(insertionSortBtn));

function btnClick(btn){
    btn.classList.add('clicked');
    setTimeout(() => {
        btn.classList.remove('clicked');
    }, 200);
}

function sortBtnClick(btn){
    bubbleSortBtn.className = "button";
    insertionSortBtn.className = "button";

    btn.classList.add("sortClicked");
    sortAlg = btn.innerText;
}

