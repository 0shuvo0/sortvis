var arr = [];
var chart = document.querySelector('.chart');
var numEl = window.innerWidth / 10;
var barWidth = 100 / numEl;
var bars = [];
var isRunning = false;

function init(numEl, barWidth){
	bars = [];
	arr = [];
	chart.innerHTML = "";
	for(var i = 0; i < numEl; i++){
		var val = Math.round(Math.random() * 100);
		arr.push(val);
		var bar = document.createElement('div');
		bar.classList.add('bar');
		bar.style.width = barWidth + "%";
		bar.style.height = val + "%";
		chart.appendChild(bar);
		bars.push(bar)
	}
	draw(arr);
}

function draw(arr){
	for(var i = 0; i < arr.length; i++){
		bars[i].style.left = barWidth * i + "%";
	}
}

function swap(arr, a, b){
	var temp = arr[b];
	arr[b] = arr[a];
	arr[a] = temp;
}
function swapBars(arr, a, b){
	var temp = arr[b];
	arr[b] = arr[a];
	arr[a] = temp;
	arr[a].style.left = barWidth * a + "%";
	arr[b].style.left = barWidth * b + "%";
	arr[a].style.animation = "0.2s colorize";
	arr[b].style.animation = "0.2s colorizeB";
}

function bubbleSort(arr, i = 0){
	for(var j = i; j > 0; j--){
		if(arr[j] < arr[j - 1]){
			swap(arr, j, j - 1);
			swapBars(bars, j, j - 1);
		}
	}
	i++;
	if(i < arr.length){
		setTimeout(function(){
			bubbleSort(arr, i);
		}, 200);
	}else{
		isRunning = false;
	}
}

function partition(arr, start, end){
	var pivotIndex = start;
	var pivotValue = arr[end];
	for(var i = start; i < end; i++){
		if(arr[i] < pivotValue){
			swap(arr, i, pivotIndex);
			swapBars(bars, i, pivotIndex);
			pivotIndex++;
		}
	}
	swap(arr, pivotIndex, end);
	swapBars(bars, pivotIndex, end);
	return pivotIndex;
}
function quickSort(arr, start, end){
	if(start >= end){
		isRunning = false;
		return
	}
	var index = partition(arr, start, end);
	setTimeout(function(){
		quickSort(arr, start, index - 1);
		quickSort(arr, index  + 1, end);
	}, 200);
}

function insertionSort(arr, i = 0){
	var value = arr[i], hole = i;
	var _v = bars[i]
	while(hole > 0 && arr[hole - 1] > value){
			arr[hole] = arr[hole - 1];
			bars[hole] = bars[hole - 1];
			bars[hole].style.animation = "0.2s colorizeB";
			hole--;
	}
	arr[hole] = value;
	bars[hole] = _v;
	bars[hole].style.animation = "0.2s colorizeB";
	draw(arr);
	
	i++;
	if(i < arr.length){
		setTimeout(function(){
			insertionSort(arr, i);
		}, 200);
	}else{
		isRunning = false;
	}
}

function sort(v){
	if(isRunning) return;
	init(numEl, barWidth);
	if(v === "bubbleSort"){
		bubbleSort(arr);
	}else if(v === "insertionSort"){
		insertionSort(arr);
	}else{
		quickSort(arr, 0, numEl - 1);
	}
	isRunning = true;
}