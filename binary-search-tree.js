class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  // 1) Check if larger or smaller
  // 2) if larger, go right (check if null)
  // 3) if null this.next.right = newNode
  // 4) else, go the other way

  insert(val) {
    let newNode = new Node(val);
    let currNode = this.root;

    if (!currNode) this.root = newNode;

    while (currNode) {
      if (currNode.val > val) {
        if (!currNode.left) {
          currNode.left = newNode;
          return this;
        }
        currNode = currNode.left;
      } else {
        if (!currNode.right) {
          currNode.right = newNode;
          return this;
        }
        currNode = currNode.right;
      }
    }

    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    if (!current) {
      this.root = new Node(val);
      return this;
    }

    if (current.val > val) {
      if (!current.left) {
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left);
    } else {
      if (!current.right) {
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (!this.root) return undefined;

    let currNode = this.root;

    while (currNode) {
      if (val === currNode.val) {
        return currNode;
      } else if (val < currNode.val) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currNode = this.root) {
    if (!this.root) {
      return null;
    }

    if (val < currNode.val) {
      if (currNode.left === null) return undefined;
      return this.findRecursively(val, currNode.left);
    } else if (val > currNode.val) {
      if (currNode.right === null) return undefined;
      return this.findRecursively(val, currNode.right);
    }

    return currNode;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(visited = [], currNode = this.root) {
    if (!currNode) return visited;

    if (currNode === this.root) {
      visited.push(currNode.val);
    }

    if (currNode.left) {
      visited.push(currNode.left.val);
      this.dfsPreOrder(visited, currNode.left);
    }

    if (currNode.right) {
      visited.push(currNode.right.val);
      this.dfsPreOrder(visited, currNode.right);
    }

    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      node.left && traverse(node.left); // go left if there's a left
      data.push(node.val); // visit
      node.right && traverse(node.right); // go right if there's a right
    }

    traverse(current);
    return data;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      node.left && traverse(node.left); // go left if there's a left
      node.right && traverse(node.right); // go right if there's a right
      data.push(node.val); // visit
    }

    traverse(current);
    return data;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs(queue = [this.root], visited = []) {
    if (queue.length > 0) {
      let currNode = queue.shift();
      visited.push(currNode.val);
      if (currNode.left) {
        queue.push(currNode.left);
      }
      if (currNode.right) {
        queue.push(currNode.right);
      }
      this.bfs(queue, visited);
    } else {
      return;
    }
    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let nodeToRemove = this.root;
    let parent;

    while (nodeToRemove.val !== val) {
      parent = nodeToRemove;
      if (val < nodeToRemove.val) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
    }

    if (nodeToRemove !== this.root) {
      if (nodeToRemove.left === null && nodeToRemove.right === null) {
        if (parent.left === nodeToRemove) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else if (nodeToRemove.left !== null && nodeToRemove.right !== null) {
        let rightParent = nodeToRemove;
        let right = nodeToRemove.right;
        if (right.left === null) {
          right.left = nodeToRemove.left;
          if (parent.left === nodeToRemove) {
            parent.left = right;
          } else {
            parent.right = right;
          }
        } else {
          while (right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          if (parent.left === nodeToRemove) {
            parent.left.val = right.val;
          } else {
            parent.right.val = right.val;
          }
          if (right.right !== null) {
            rightParent.left = right.right;
          } else {
            rightParent.left = null;
          }
        }
      } else {
        if (parent.left === nodeToRemove) {
          if (nodeToRemove.right === null) {
            parent.left = nodeToRemove.left;
          } else {
            parent.left = nodeToRemove.right;
          }
        } else {
          if (nodeToRemove.right === null) {
            parent.right = nodeToRemove.left;
          } else {
            parent.right = nodeToRemove.right;
          }
        }
      }
    }
    return nodeToRemove;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(current = this.root) {
    if (current === null) return;
    return maxDepth(current) - minDepth(current) <= 1;

    function minDepth(current) {
      if (current === null) return 0;
      return 1 + Math.min(minDepth(current.left), minDepth(current.right));
    }

    function maxDepth(current) {
      if (current === null) return 0;
      return 1 + Math.max(maxDepth(current.left), maxDepth(current.right));
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    let currNode = this.root;
    if (!currNode) return undefined;
    if (!currNode.right) return this.left;

    while (currNode.right.right) {
      currNode = currNode.right;
    }

    if (currNode.right.left) return currNode.right.val;

    return currNode.val;
  }
}

var binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15);
binarySearchTree.insert(20);
binarySearchTree.insert(10);
binarySearchTree.insert(12);
binarySearchTree.insert(1);
binarySearchTree.insert(50);
binarySearchTree.insert(45);
binarySearchTree.insert(70);
binarySearchTree.insert(5);
binarySearchTree.insert(0);
console.log(binarySearchTree.findSecondHighest()); // [50]

module.exports = BinarySearchTree;
