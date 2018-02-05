function fizzBuzz() {
  for (let i = 1; i <= 100; i++) {
    let fb = ''

    if (i % 3 === 0)
      fb += 'Fizz'

    if (i % 5 === 0)
      fb += 'Buzz'

    console.log(fb || i)
  }
}

function min(a, b) {
  return a < b ? a : b
}

function isEven(number) {
  if (number <= 1)
    return number === 0

  return isEven(number - 2)
}

function range(start, end) {
  const a = []

  for (let i = 0; i <= (end - start); i++) {
    a.push(start + i)
  }

  return a
}

function sum(a) {
  return a.reduce((acc, x) => acc + x, 0)
}

function arrayToList(array) {
  return arrayToListRecursive(array, 0)
}

function arrayToListRecursive(array, index) {
  if (index < array.length) {
    return {
      value: array[index],
      rest: arrayToListRecursive(array, index + 1)
    }
  } else {
    return null
  }
}

function listToArray(list) {
  let array = []
  listToArrayRecursive(array, list)
  return array
}

function listToArrayRecursive(array, listObj) {
  if (!listObj)
    return

  array.push(listObj.value)
  listToArrayRecursive(array, listObj.rest)
}

function prepend(elem, list) {
  return {
    value: elem,
    rest: list
  }
}

function nth(list, pos) {
  let l = list

  for (let i = 0; i < pos; i++) {
    l = l.rest
  }

  return l.value
}

fizzBuzz()

console.log(min(0, 10))
console.log(min(0, -10))

console.log(isEven(50))
console.log(isEven(75))

console.log(range(2, 8))
console.log(sum(range(1, 10)))

console.log(arrayToList([10, 20]))
console.log(listToArray({ value: 10, rest: { value: 20, rest: null } }))
console.log(prepend(10, prepend(20, null)))
console.log(nth(arrayToList([10, 20, 30]), 1))