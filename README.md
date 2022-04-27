# double-linked-sorted-tree
double linked list + sorted tree | 双向链表 + 排序树

## feature | 特性

- keep order for added value | 保持添加的顺序
- log(n) add 
- log(n) popMax/popMin

## usage | 使用

types

```
interface INode<T = undefined> {
    parent?: Node<T>;
    left?: Node<T>;
    right?: Node<T>;
    prev: Node<T>;
    next: Node<T>;
    value: number;
    source?: T;
}

export declare class DLSTree<T = undefined> {
    constructor();
    add(value: number, source?: T): void;
    remove(n: INode<T>): void;
    popMin(): INode<T> | undefined;
    popMax(): INode<T> | undefined;
    iterate(): Generator<Node<T>, void, unknown>;
    getHead(): INode<T> | undefined;
    getRoot(): INode<T> | undefined;
    size(): number;
}
```

code example
```
import DLSTree from 'double-linked-sorted-tree'

let arr = [100, 1, 11, 30, 10, 4]

let t = new DLSTree()
arr.forEach(x => t.add(x))

t.popMax().value // 100
t.popMax().value // 30

[...t.iterate()].map(x => x.value) //[1, 11, 10, 4]
```
