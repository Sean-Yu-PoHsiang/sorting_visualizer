"use strict"

const model = {
  randomArray: [],
  dataSize: 0,
  sortingSpeed: 0,
  stopSign: "run",
  generateArray(n, min, max) {
    const number = []
    for (let i = 0; i < n; i++) {

      number.push(Math.floor(Math.random() * (max - min + 1) + min))
    }
    return number
  }
}

const view = {
  renderArray(array, currentI, currentMinIndex, currentJ) {
    const panel = document.querySelector('.array-container')
    let rawHTML = ''
    for (let i = 0; i < array.length; i++) {
      let heightPercentage = (array[i] / 300) * 100
      let widthPercentage = (1 / array.length) * 100

      if (currentI === undefined) {
        rawHTML += `
          <div class="array-bar-shell" style="width: ${widthPercentage}%">
            <div class="array-bar" style="height: ${heightPercentage}%"></div>
          </div>`
      } else {
        if (i === currentMinIndex || i === currentJ) {
          rawHTML += `
            <div class="array-bar-shell" style="width: ${widthPercentage}%">
              <div class="array-bar sorting" style="height: ${heightPercentage}%"></div>
            </div>`
        } else if (i < currentI) {
          rawHTML += `
            <div class="array-bar-shell" style="width: ${widthPercentage}%">
              <div class="array-bar sorted" style="height: ${heightPercentage}%"></div>
            </div>`
        } else if (currentMinIndex === undefined || currentJ === undefined) {
          rawHTML += `
            <div class="array-bar-shell" style="width: ${widthPercentage}%">
              <div class="array-bar sorted" style="height: ${heightPercentage}%"></div>
            </div>`
        } else {
          rawHTML += `
            <div class="array-bar-shell" style="width: ${widthPercentage}%">
              <div class="array-bar" style="height: ${heightPercentage}%"></div>
            </div>`
        }
      }
    }
    panel.innerHTML = rawHTML
    // console.log(currentI, currentMinIndex, currentJ)
  },
  renderArrayBubbleSort(array, currentI, currentMinIndex, currentJ) {
    const panel = document.querySelector('.array-container')
    let rawHTML = ''
    for (let i = 0; i < array.length; i++) {
      let heightPercentage = (array[i] / 300) * 100
      let widthPercentage = (1 / array.length) * 100

      if (currentI === undefined) {
        rawHTML += `
          <div class="array-bar-shell" style="width: ${widthPercentage}%">
            <div class="array-bar" style="height: ${heightPercentage}%"></div>
          </div>`
      } else {
        if (i === currentMinIndex || i === currentJ) {
          rawHTML += `
            <div class="array-bar-shell" style="width: ${widthPercentage}%">
              <div class="array-bar sorting" style="height: ${heightPercentage}%"></div>
            </div>`
        } else if (i > currentI) {
          rawHTML += `
            <div class="array-bar-shell" style="width: ${widthPercentage}%">
              <div class="array-bar sorted" style="height: ${heightPercentage}%"></div>
            </div>`
        } else if (currentMinIndex === undefined || currentJ === undefined) {
          rawHTML += `
            <div class="array-bar-shell" style="width: ${widthPercentage}%">
              <div class="array-bar sorted" style="height: ${heightPercentage}%"></div>
            </div>`
        } else {
          rawHTML += `
            <div class="array-bar-shell" style="width: ${widthPercentage}%">
              <div class="array-bar" style="height: ${heightPercentage}%"></div>
            </div>`
        }
      }
    }
    panel.innerHTML = rawHTML
    console.log(currentI, currentMinIndex, currentJ)
  },
  renderNotification() {
    document.querySelector(".navigator").innerHTML = `<h5>Computing... refresh page to reset</h5>`
  },
  renderStopBtn() {
    document.querySelector(".navigator").innerHTML = `<button type="button" class="btn btn-danger btn-sort" id="stopBtn">Stop</button>`
  },
  renderSortingBtn() {
    document.querySelector(".navigator").innerHTML = `
      <h5>Choose an Sorting Algorithm</h5>
      <button type="button" class="btn btn-warning btn-sort" id="selectionSort">Selection Sort</button>
      <button type="button" class="btn btn-warning btn-sort" id="InsertionSort">Insertion Sort</button>
      <button type="button" class="btn btn-warning btn-sort" id="bubbleSort">Bubble Sort</button>
      <button type="button" class="btn btn-dark btn-sort" id="quickSort">Quick Sort</button>
      <button type="button" class="btn btn-dark btn-sort" id="mergeSort">Merge Sort</button>`
  }
}

const controller = {
  default() {
    //generate new array
    model.dataSize = document.querySelector("#data-size").value
    model.randomArray = model.generateArray(model.dataSize, 1, 300)
    //set regenerate btn
    this.setRegenerateBtn()
    //set event listener on input
    this.setInputEventListener()
    //rendering array on panel
    view.renderArray(model.randomArray)
  },
  setSortingBtn() {
    const startBtn = document.querySelector(".navigator")
    startBtn.addEventListener("click", function (event) {
      model.sortingSpeed = document.querySelector("#sorting-speed").value
      if (event.target.matches("#selectionSort")) {
        view.renderNotification()
        controller.selectionSort(model.randomArray)
      } else if (event.target.matches("#InsertionSort")) {
        view.renderNotification()
        controller.insertionSort(model.randomArray)
      } else if (event.target.matches("#bubbleSort")) {
        view.renderNotification()
        controller.bubbleSort(model.randomArray)
      }
    })
  },
  setStopBtn() {
    const stopBtn = document.querySelector("#stopBtn")
    stopBtn.addEventListener("click", () => {
      model.stopSign = "stop"
      view.renderSortingBtn()
      controller.setSortingBtn()
    })
  },
  setRegenerateBtn() {
    const regenarateBtn = document.querySelector("#regenerateBtn")
    regenarateBtn.addEventListener("click", function (event) {
      model.randomArray = model.generateArray(model.dataSize, 1, 300)
      view.renderArray(model.randomArray)
    })
  },
  setInputEventListener() {
    const adjustParameter = document.querySelector("#data-size")
    adjustParameter.addEventListener("input", function (event) {
      model.dataSize = document.querySelector("#data-size").value
      model.randomArray = model.generateArray(model.dataSize, 1, 300)
      view.renderArray(model.randomArray)
    })
  },
  selectionSort: async function selectionSort(array) {
    for (let i = 0; i < array.length; i++) {
      let minIndex = i
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j
        }

        //rendering bar, constant changing
        view.renderArray(array, i, minIndex, j)
        //pause loop
        await utility.sleep((1 - (model.sortingSpeed / 1000)) * 100)
      }
      ;[array[i], array[minIndex]] = [array[minIndex], array[i]]

      //final rendering
      view.renderArray(array, i)
    }
    view.renderSortingBtn()
    return array
  },
  insertionSort: async function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
      let j = 0
      while (array[i] > array[j]) {
        view.renderArray(array, i, i, j)
        await utility.sleep((1 - (model.sortingSpeed / 1000)) * 100)
        j++
      }
      array.splice(j, 0, array[i])
      array.splice(i + 1, 1)
      //rendering bar, constant changing
      view.renderArray(array, i, -1, j)
      //pause loop
    }
    view.renderArray(array, array.length + 1)
    view.renderSortingBtn()
    return array
  },
  bubbleSort: async function bubbleSort(array) {
    for (let i = array.length; i > 0; i--) {
      let swap = 0
      for (let j = 0; j < i; j++) {
        view.renderArrayBubbleSort(array, i - 1, j, j + 1)
        // await utility.sleep(1000)
        await utility.sleep((1 - (model.sortingSpeed / 1000)) * 100)
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]]
          swap++
        }
      }
      if (swap === 0) {
        view.renderArrayBubbleSort(array, i, -1)
        view.renderSortingBtn()
        return array
      }
    }
    return array
  },
  quickSort: async function mergeSort() {

  },
  mergeSort: async function mergeSort() {

  }
}

const utility = {
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  sortArrayByJS(array) {
    return array.sort((a, b) => a - b)
  },
  checkArrayEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) {
      return false
    }
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false
      }
    }
    return true
  },
  checkArrayTimes(n) {
    for (let i = 0; i < n; i++) {
      let testArray = model.generateArray(300, 10, 300)
      let result = this.checkArrayEqual(this.sortArrayByJS(testArray), mergeSort(testArray))
      console.log(result)
    }
  }
}

controller.default()
controller.setSortingBtn()

function merge(left, right) {
  var result = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  return result.concat(left, right);
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  var middle = Math.floor(arr.length / 2);
  var left = arr.slice(0, middle);
  var right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}