const { NotImplementedError } = require("../lib/errors");
const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this._root) {
      this._root = newNode;
      return;
    }

    let current = this._root;

    while (true) {
      if (data === current.data) {
        // одинаковые значения не добавляем (обычное правило BST)
        return;
      }

      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let current = this._root;

    while (current) {
      if (data === current.data) return current;
      current = data < current.data ? current.left : current.right;
    }

    return null;
  }

  remove(data) {
    this._root = this._removeNode(this._root, data);
  }

  _removeNode(node, data) {
    if (!node) return null;

    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    }

    if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    }

    // найден узел
    if (!node.left && !node.right) {
      // лист
      return null;
    }

    if (!node.left) return node.right;
    if (!node.right) return node.left;

    // оба ребёнка существуют — ищем минимальный справа
    let minRight = node.right;
    while (minRight.left) {
      minRight = minRight.left;
    }
    node.data = minRight.data;
    node.right = this._removeNode(node.right, minRight.data);
    return node;
  }

  min() {
    if (!this._root) return null;
    let current = this._root;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this._root) return null;
    let current = this._root;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
