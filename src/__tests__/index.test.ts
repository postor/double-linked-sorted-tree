import DLSTree from ".."

test(`basic`, () => {
  let arr = [100, 1, 11, 30, 10, 4]

  let t = new DLSTree()
  arr.forEach(x => t.add(x))

  let result = [...t.iterate()].map(x => x.value)
  expect(result).toStrictEqual(arr)

})


test(`popMax`, () => {
  let arr = [100, 1, 11, 30, 10, 4]

  let t = new DLSTree()
  arr.forEach(x => t.add(x))
  expect(t.popMax()?.value).toBe(100)
  expect(t.popMax()?.value).toBe(30)

  let target = [1, 11, 10, 4]
  // console.log()
  let result = [...t.iterate()].map(x => x.value)
  expect(result).toStrictEqual(target)
})



test(`popMin`, () => {
  let arr = [100, 1, 11, 30, 10, 4]

  let t = new DLSTree()
  arr.forEach(x => t.add(x))
  expect(t.popMin()?.value).toBe(1)
  expect(t.popMin()?.value).toBe(4)

  let target = [100, 11, 30, 10]
  // console.log()
  let result = [...t.iterate()].map(x => x.value)
  expect(result).toStrictEqual(target)
})


test(`ref source`, () => {
  let arr = [100, 1, 11, 30, 10, 4]

  let t = new DLSTree<{x:number}>()
  arr.forEach(x => t.add(x,{x}))

  let result = [...t.iterate()].map(x => x.source?.x)
  expect(result).toStrictEqual(arr)
})

