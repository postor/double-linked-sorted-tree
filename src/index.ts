class Node<T> {
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

export class DLSTree<T> {
  private root?: Node<T>
  private begin: Node<T> = new Node(0)
  private end: Node<T> = new Node(0)

  constructor() {
    this.begin.next = this.end
    this.end.prev = this.begin
  }

  add(value: number, source?: T) {
    let n = new Node(value, source)

    let { prev } = this.end
    n.prev = prev
    n.next = this.end
    prev.next = this.end.prev = n
    this.root = treeAdd(n, this.root)

    function treeAdd(n: Node<T>, cur?: Node<T>): Node<T> {
      if (!cur) return n
      if (n.value > cur.value) {
        cur.right = treeAdd(n, cur.right)
        cur.right.parent = cur
      } else {
        cur.left = treeAdd(n, cur.left)
        cur.left.parent = cur
      }
      return cur
    }
  }

  remove(n: Node<T>) {
    let { prev, next, parent } = n
    prev.next = next
    next.prev = prev

    if (!parent) {
      let { left, right } = this.root as Node<T>
      return this.root = n == left ? right : left
    }

    move(parent, n)

    function move(p: Node<T>, n: Node<T>) {
      if (p.left === n) {
        p.left = restruct(p, n.left, n.right)
      } else {
        p.right = restruct(p, n.left, n.right)
      }

      function restruct(p: Node<T>, l?: Node<T>, r?: Node<T>): Node<T> | undefined {
        let rtn = (l && r)
          ? (() => {
            l.left = restruct(l, l.left, l.right)
            l.right = r
            r.parent = l
            return l
          })()
          : (!l)
            ? r
            : undefined

        if (!rtn) return

        rtn.parent = p
        return rtn
      }
    }
  }

  popMin(): Node<T> | undefined {
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

  popMax(): Node<T> | undefined {
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
}

export default DLSTree