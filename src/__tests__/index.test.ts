import DLSTree, { INode } from ".."

test(`iterate`, () => {
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

  let t = new DLSTree<{ x: number }>()
  arr.forEach(x => t.add(x, { x }))

  let result = [...t.iterate()].map(x => x.source?.x)
  expect(result).toStrictEqual(arr)
})


test(`size`, () => {
  let t = new DLSTree()
  expect(t.size()).toStrictEqual(0)
  t.add(10)
  t.add(1)
  t.add(100)
  t.add(88)
  expect(t.size()).toStrictEqual(4)
  t.popMax()
  t.popMin()
  expect(t.size()).toStrictEqual(2)
  let head = t.getHead()
  // console.log({ head })
  t.remove(head as any)
  expect(t.size()).toStrictEqual(1)
})


test(`getRoot`, () => {
  let t = new DLSTree()
  expect(t.getRoot()).toBeUndefined()
  t.add(10)
  t.add(1)
  expect(t.getRoot()).not.toBeUndefined()
  t.popMax()
  expect(t.getRoot()).not.toBeUndefined()
  t.popMax()
  expect(t.getRoot()).toBeUndefined()
})


test(`getHead`, () => {
  let t = new DLSTree()
  expect(t.getHead()).toBeUndefined()
  t.add(1)
  expect(t.getHead()).not.toBeUndefined()
  t.popMax()
  expect(t.getHead()).toBeUndefined()
})

test(`getTail`, () => {
  let t = new DLSTree()
  expect(t.getTail()).toBeUndefined()
  t.add(1)
  expect(t.getTail()).not.toBeUndefined()
  t.popMax()
  expect(t.getTail()).toBeUndefined()
})


test(`remove`, () => {
  let t = new DLSTree()
  t.add(100)
  t.add(50)
  t.add(25)
  t.add(75)
  t.add(150)
  t.add(125)
  t.add(175)
  t.remove(t.getRoot() as INode)
  expect([...t.iterate()].map(x => x.value))
    .toStrictEqual([50, 25, 75, 150, 125, 175])
})

test(`updateNodeValue`, () => {
  let t = new DLSTree()
  t.add(1)
  t.add(2)
  t.add(3)
  let n = t.getHead() as INode
  // console.log(n)
  t.updateNodeValue(n, 100)
  expect(t.popMax()?.value).toBe(100)

})