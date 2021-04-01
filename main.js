"use strict"

const utility = {
  generateArray(n, min, max) {
    const number = []
    for (let i = 0; i < n; i++) {
      number.push(Math.floor(Math.random() * (max - min + 1) + min))
    }
    return number
  },
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  isArraySorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false
      }
    }
    return true
  },
}

const model = {
  array: [],
  isProcessing: false,
  dataSize: document.querySelector("#data-size").value,
  sortingSpeed: document.querySelector("#sorting-speed").value,
  generateBtn: document.querySelector('#generateBtn'),
  dataSizeInput: document.querySelector("#data-size"),
  sortingSpeedInput: document.querySelector("#sorting-speed"),
  sortingBtn: document.querySelector("#navigator"),
  stopSign: document.querySelector(".stop-sign")
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
  },
  renderArrayMergeSort(array, currentI, currentJ) {
    const panel = document.querySelector('.array-container')
    let rawHTML = ''
    for (let i = 0; i < array.length; i++) {
      let heightPercentage = (array[i] / 300) * 100
      let widthPercentage = (1 / array.length) * 100

      if (currentI === i || currentJ === i) {
        rawHTML += `
          <div class="array-bar-shell" style="width: ${widthPercentage}%">
            <div class="array-bar sorting" style="height: ${heightPercentage}%"></div>
          </div>`
      } else {
        rawHTML += `
          <div class="array-bar-shell" style="width: ${widthPercentage}%">
            <div class="array-bar" style="height: ${heightPercentage}%"></div>
          </div>`
      }
    }
    panel.innerHTML = rawHTML
  },
  disabledBtn() {
    for (let i = 0; i < 5; i++) {
      model.sortingBtn.children[i].disabled = true
    }
    model.generateBtn.disabled = true
  },
  enabledBtn() {
    for (let i = 0; i < 5; i++) {
      model.sortingBtn.children[i].disabled = false
    }
    model.generateBtn.disabled = false
  },
  toggleStopSign() {
    model.stopSign.classList.toggle('d-none')
  }
}

const controller = {
  appStart() {
    model.array = utility.generateArray(model.dataSize, 1, 300)
    view.renderArray(model.array)
    this.setGenerateBtnEventListener()
    this.setInputEventListener()
    this.setSortingBtnEventListener()
  },
  setGenerateBtnEventListener() {
    model.generateBtn.addEventListener("click", function (event) {
      model.array = utility.generateArray(model.dataSize, 1, 300)
      view.renderArray(model.array)
    })
  },
  setInputEventListener() {
    model.dataSizeInput.addEventListener("input", function (event) {
      model.dataSize = event.target.value
      model.array = utility.generateArray(model.dataSize, 1, 300)
      view.renderArray(model.array)
    })
    model.sortingSpeedInput.addEventListener("input", event => {
      model.sortingSpeed = event.target.value
    })
  },
  setSortingBtnEventListener() {
    model.sortingBtn.addEventListener("click", function (event) {
      if (event.target.matches("button")) {
        view.disabledBtn()
        view.toggleStopSign()
      }
      if (event.target.matches("#selectionSort")) {
        controller.selectionSort(model.array)
      } else if (event.target.matches("#InsertionSort")) {
        controller.insertionSort(model.array)
      } else if (event.target.matches("#bubbleSort")) {
        controller.bubbleSort(model.array)
      } else if (event.target.matches('#quickSort')) {
        controller.quickSort(model.array)
      } else if (event.target.matches('#mergeSort')) {
        controller.mergeSort(model.array)
      }
    })
  },

  //sorting algorithm
  selectionSort: async function selectionSort(array) {
    for (let i = 0; i < array.length; i++) {
      let minIndex = i
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j
        }
        if (model.stop) {
          model.stop = false
          return
        }

        view.renderArray(array, i, minIndex, j)
        await utility.sleep((1 - (model.sortingSpeed / 1000)) * 100)
      }
      ;[array[i], array[minIndex]] = [array[minIndex], array[i]]

      view.renderArray(array, i)
    }
    view.enabledBtn()
    view.toggleStopSign()
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
      view.renderArray(array, i, -1, j)
    }
    view.renderArray(array, array.length + 1)
    view.enabledBtn()
    view.toggleStopSign()
  },
  bubbleSort: async function bubbleSort(array) {
    for (let i = array.length; i > 0; i--) {
      let swap = 0
      for (let j = 0; j < i; j++) {
        view.renderArrayBubbleSort(array, i - 1, j, j + 1)
        await utility.sleep((1 - (model.sortingSpeed / 1000)) * 100)
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]]
          swap++
        }
      }
      if (swap === 0) {
        view.renderArrayBubbleSort(array, i, -1)
        view.enabledBtn()
        view.toggleStopSign()
        return
      }
    }
  },
  quickSort: async function quickSort(arr) {
    const stack = []
    stack.push(0)
    stack.push(arr.length - 1)

    while (stack[stack.length - 1] >= 0) {
      const end = stack.pop()
      const start = stack.pop()

      let pivotIndex = start
      const pivotValue = arr[end]

      for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
          ;[arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]]
          pivotIndex++
          await utility.sleep((1 - (model.sortingSpeed / 1000)) * 100)
          view.renderArrayMergeSort(arr, i, pivotIndex)
        }
        await utility.sleep((1 - (model.sortingSpeed / 1000)) * 100)
        view.renderArrayMergeSort(arr, i, pivotIndex)
      }

      [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]

      if (pivotIndex - 1 > start) {
        stack.push(start)
        stack.push(pivotIndex - 1)
      }

      if (pivotIndex + 1 < end) {
        stack.push(pivotIndex + 1)
        stack.push(end)
      }
    }

    view.renderArray(arr, 0, undefined, undefined)
    view.enabledBtn()
    view.toggleStopSign()
    return arr
  },
  mergeSort: async function mergeSort(arr) {
    let sorted = [...arr]
    let n = sorted.length
    let buffer = []

    for (let size = 1; size < n; size *= 2) {
      for (let leftStart = 0; leftStart < n; leftStart = leftStart + 2 * size) {
        let left = leftStart
        let right = Math.min(left + size, n)
        let leftLimit = right
        let rightLimit = Math.min(right + size, n)
        let i = left

        while (left < leftLimit && right < rightLimit) {
          if (sorted[left] <= sorted[right]) {
            buffer[i] = sorted[left]
            model.array[i] = buffer[i]
            i++
            left++
            await utility.sleep((1 - (model.sortingSpeed / 1000)) * 100)
            view.renderArrayMergeSort(model.array, left, right)
          } else {
            buffer[i] = sorted[right]
            model.array[i] = buffer[i]
            i++
            right++
            await utility.sleep((1 - (model.sortingSpeed / 1000)) * 100)
            view.renderArrayMergeSort(model.array, left, right)
          }
        }
        while (left < leftLimit) {
          buffer[i] = sorted[left]
          model.array[i] = buffer[i]
          i++
          left++
          await utility.sleep((1 - (model.sortingSpeed / 1000)) * 100)
          view.renderArrayMergeSort(model.array, left, right)
        }
        while (right < rightLimit) {
          buffer[i] = sorted[right]
          model.array[i] = buffer[i]
          i++
          right++
          await utility.sleep((1 - (model.sortingSpeed / 1000)) * 100)
          view.renderArrayMergeSort(model.array, left, right)
        }
      }

      sorted = [...buffer]
      await utility.sleep((1 - (model.sortingSpeed / 1000)) * 100)
      view.renderArrayMergeSort(model.array)
    }

    view.renderArray(model.array, 0, undefined, undefined)
    view.enabledBtn()
    view.toggleStopSign()
    return sorted
  }
}

controller.appStart()