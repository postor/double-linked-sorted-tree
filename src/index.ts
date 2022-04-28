export interface INode<T = undefined> {
  parent?: Node<T>
  left?: Node<T>
  right?: Node<T>
  prev: Node<T>
  next: Node<T>
  value: number
  source?: T
}

class Node<T = undefined> implements INode<T> {
  public parent?: Node<T>
  public left?: Node<T>
  public right?: Node<T>
  // @ts-ignore
  public prev: Node<T>
  // @ts-ignore
  public next: Node<T>

  public value: number = 0
  public source?: T

  constructor(
    value: number,
    source?: T
  ) {
    this.value = value
    this.source = source
  }
}

export class DLSTree<T = undefined> {
  private root?: INode<T>
  private begin: INode<T> = new Node(0)
  private end: INode<T> = new Node(0)
  private _size = 0

  constructor() {
    this.begin.next = this.end
    this.end.prev = this.begin
  }


  add(...args: T extends undefined ? [value: number] : [value: number, source: T]): void {
    let [value, source = undefined] = args
    this._size++
    let n = new Node(value, source)

    let { prev } = this.end
    n.prev = prev
    n.next = this.end
    prev.next = this.end.prev = n
    this.treeAdd(n)
  }

  private treeAdd(node: INode<T>) {
    node.left = node.right = undefined
    this.root = add(node, this.root)

    function add(n: INode<T>, cur?: INode<T>): INode<T> {
      // console.log({ n: n.value, cur: cur?.value })
      if (!cur) return n
      if (n.value > cur.value) {
        cur.right = add(n, cur.right)
        cur.right.parent = cur
      } else {
        cur.left = add(n, cur.left)
        cur.left.parent = cur
      }
      return cur
    }
  }

  remove(node: INode<T>) {
    this._size--
    let { prev, next } = node
    prev.next = next
    next.prev = prev
    this.treeRemove(node)
  }

  private treeRemove(node: INode<T>) {
    let { parent } = node
    if (!parent) {
      let { left, right } = this.root as INode<T>
      this.root = restruct(undefined, left, right)
      return
    }

    if (parent.left === node) {
      parent.left = restruct(parent, node.left, node.right)
    } else {
      parent.right = restruct(parent, node.left, node.right)
    }

    function restruct(p?: INode<T>, l?: INode<T>, r?: INode<T>): INode<T> | undefined {
      let rtn = (l && r)
        ? (() => {
          l.left = restruct(l, l.left, l.right)
          l.right = r
          r.parent = l
          return l
        })()
        : l
          ? l
          : r

      if (!rtn) return

      rtn.parent = p
      return rtn
    }
  }

  popMin(): INode<T> | undefined {
    // console.log({ root: this.root?.value })
    let t = this.root
    if (!t) return
    while (t.left) {
      // console.log({ t: t.value })
      t = t.left
    }
    // console.log({ min: t.value })
    this.remove(t)
    return t
  }

  popMax(): INode<T> | undefined {
    // console.log({ root: this.root?.value })
    let t = this.root
    if (!t) return
    while (t.right) {
      // console.log({ t: t.value })
      t = t.right
    }
    // console.log({ max: t.value })
    this.remove(t)
    return t
  }

  * iterate() {
    let cur = this.begin.next
    while (cur !== this.end) {
      // console.log({cur,end:this.end})
      yield cur
      cur = cur.next
    }
  }

  getHead(): INode<T> | undefined {
    return this.begin.next === this.end ? undefined : this.begin.next
  }

  getTail(): INode<T> | undefined {
    return this.end.prev === this.begin ? undefined : this.end.prev
  }

  getRoot(): INode<T> | undefined {
    return this.root
  }

  size() {
    return this._size
  }

  updateNodeValue(node: INode<T>, value: number) {
    this.treeRemove(node)
    // this.printTree()
    node.value = value
    this.treeAdd(node)
  }

  // printTree() {
  //   let q = [this.root], rtn = []
  //   while (q.length) {
  //     let n = q.shift()
  //     rtn.push(n ? n.value : '#')
  //     if (n) q.push(n.left, n.right)
  //   }
  //   // console.log(rtn)
  // }
}

export default DLSTree