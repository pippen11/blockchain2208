// 탐색에 있어서는 배열이 list보다 효율적이다.
// 부모 자식 관계가 재귀적으로 반복되는 것이 트리구조이다.

// 이진트리
// BST : Binary Search Tree , 이진탐색트리
// 부모 노드보다 작은 것은 left child , 부모 노드보다 큰 것은 right child
// 이진 탐색 트리에는 중복된 데이터를 넣을 수 없다.

// 이진 탐색 트리는 데이터가 추가될 때 미리 정해놓은 규칙 아래 정렬되는 구조.
// 시간 복잡도는 log(N)
// 이진 탐색 트리를 사용하면 데이터를 탐색할 때 탐색할 데이터의 양이 절반씩 감소한다.

class TreeNode {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }

    preorder(cb) {
        // Root
        cb(this.data)

        // left
        if (this.leftChild) {
            this.leftChild.preorder(cb)
        }

        // right
        if (this.rightChild) {
            this.rightChild.preorder(cb)
        }

    }

    inorder(cb) {
        // left
        if (this.leftChild) {
            this.leftChild.inorder(cb)
        }

        // Root
        cb(this.data)

        // right
        if (this.rightChild) {
            this.rightChild.inorder(cb)
        }
    }

    postorder(cb) {
        // left
        if (this.leftChild) {
            this.leftChild.postorder(cb)
        }

        // right
        if (this.rightChild) {
            this.rightChild.postorder(cb)
        }

        // Root
        cb(this.data)
    }

}

class BST {
    constructor() {
        this.root = null;
    }  // linkedList와 마찬가지로 시작점은 최상위 노드

    insert(data) {
        let newNode = new TreeNode(data)
        let tempNode = this.root

        if (this.root === null) this.root = newNode

        while (tempNode) {
            if (data == tempNode.data) {
                return;
            }
            if (data < tempNode.data) {
                if (tempNode.leftChild === null) {
                    tempNode.leftChild = newNode;
                    break;
                }
                tempNode = tempNode.leftChild;
            }
            if (data > tempNode.data) {
                if (tempNode.rightChild === null) {
                    tempNode.rightChild = newNode;
                    break;
                }
                tempNode = tempNode.rightChild;
            }
        } 
    }

    remove(data) {}

    find(data) {
        let tempNode = this.root

        if (tempNode === null) throw new Error('no data')

        while (tempNode) {
            if (data < tempNode.data) {
                if (tempNode.leftChild === null) throw new Error('no data')
                tempNode = tempNode.leftChild
            }

            if (data === tempNode.data) {
                return tempNode
            }

            if (data > tempNode.data) {
                if (tempNode.rightChild === null) throw new Error('no data')
                tempNode = tempNode.rightChild
            }
        }
    }

}

let bst = new BST();
bst.insert(10);
bst.insert(17);
bst.insert(20);
bst.insert(5);
bst.insert(50);
bst.insert(35);
bst.insert(27);
bst.insert(90);

// 순회 (전위, 중위, 후위)
// 전위순회, preorder : root -> left -> right 순으로 순회
// 중위순회, inorder : left -> root -> right 순으로 순회
// 후위순회, postorder : left -> right -> root 순으로 순회
console.log(bst)

bst.root.inorder((data) => console.log(data))
console.log('**************************************')
bst.root.preorder((data) => console.log(data))
console.log('**************************************')
bst.root.postorder((data) => console.log(data))

console.log('****************find******************')
console.log(bst.find(50))
