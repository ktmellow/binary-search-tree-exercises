const expect = require("chai").expect
const data = require("../binary_tree.js");

describe("Node", function(){
  var node;
  beforeEach(function() {
    node = new data.Node(5);
  });
  describe("Initialization", function(){
    it("has a value property set to whatever is passed in", function(){
      expect(node.value).to.equal(5);
    });
    it("has a left property that starts with null", function(){
      expect(node.left).to.equal(null);
    });
    it("has a right property that starts with null", function(){
      expect(node.right).to.equal(null);
    });
  });
});

describe("BinTree", function(){
  var binTree, node;

  describe("hasOwnProperty", function(){
    beforeEach(function () {
       binTree = new data.BinTree();
    });
    it("starts with a root", function(){
      expect(binTree.hasOwnProperty("root")).to.equal(true);
    });
    it("starts with a root of null", function(){
      expect(binTree.root).to.equal(null);
    });
  });

  describe("#insert iteratively", function(){
    beforeEach(function () {
       binTree = new data.BinTree();
       binTree.insertIteratively(5);
       binTree.insertIteratively(10);
       binTree.insertIteratively(3);
    });
    it("only accepts numbers", function(){
      ["awesome", null, undefined, [], true, {}, NaN, function(){}].forEach(function(option){
        expect(binTree.insertIteratively(option)).to.equal("Please insert a number");
      });
    });
    it("adds successfully", function(){
      expect(binTree.root.value).to.equal(5);
      expect(binTree.root.right.value).to.equal(10);
      expect(binTree.root.left.value).to.equal(3);
    });
    it("does not add duplicates", function(){
      binTree.insertIteratively(3);
      binTree.insertIteratively(3);
      binTree.insertIteratively(3);
      expect(binTree.root.left.value).to.equal(3);
      expect(binTree.root.left.left).to.equal(null);
      expect(binTree.root.left.right).to.equal(null);
    });
    it("adds multiple numbers in the correct position", function(){
      binTree.insertIteratively(4);
      binTree.insertIteratively(7);
      binTree.insertIteratively(6);
      expect(binTree.root.left.right.value).to.equal(4);
      expect(binTree.root.right.left.value).to.equal(7);
      expect(binTree.root.right.left.left.value).to.equal(6);
    });
  });

  describe("#insert recursively", function(){
    beforeEach(function () {
       binTree = new data.BinTree();
       binTree.insertRecursively(5);
       binTree.insertRecursively(10);
       binTree.insertRecursively(3);
    });

    it("only accepts numbers", function(){
      ["awesome", null, undefined, [], true, {}, NaN, function(){}].forEach(function(option){
        expect(binTree.insertRecursively(option)).to.equal("Please insert a number");
      });
    });
    it("adds successfully", function(){
      expect(binTree.root.value).to.equal(5);
      expect(binTree.root.right.value).to.equal(10);
      expect(binTree.root.left.value).to.equal(3);
    });
    it("does not add duplicates", function(){
      binTree.insertRecursively(3);
      binTree.insertRecursively(3);
      binTree.insertRecursively(3);
      expect(binTree.root.left.value).to.equal(3);
      expect(binTree.root.left.left).to.equal(null);
      expect(binTree.root.left.right).to.equal(null);
      expect(binTree.insertRecursively(3)).to.equal("duplicate!");
    });
    it("adds multiple numbers in the correct position", function(){
      binTree.insertRecursively(4);
      binTree.insertRecursively(7);
      binTree.insertRecursively(6);
      expect(binTree.root.left.right.value).to.equal(4);
      expect(binTree.root.right.left.value).to.equal(7);
      expect(binTree.root.right.left.left.value).to.equal(6);
    });
  });

  describe("#contains", function(){
    var binTree;
    beforeEach(function() {
      binTree = new data.BinTree();
      [7,3,9,1,99,44,66].forEach(function(v) {
        binTree.insertIteratively(v);
      });
    });
    describe("#iteratively", function(){
      it("should find a value in binTree with many values", function(){
        [7,3,9,1,99,44,66].forEach(function(v) {
          expect(binTree.containsIteratively(v)).to.equal(true);
        });
      });
      it("should return true, when it's found", function() {
        expect(binTree.containsIteratively(66)).to.equal(true);
      });
      it("should return false, when it's not found", function() {
        expect(binTree.containsIteratively(-20)).to.equal(false);
        expect(binTree.containsIteratively(20)).to.equal(false);
      });
    });
    describe("#recursively", function(){
      it("should find a value in binTree with many values", function(){
        [7,3,9,1,99,44,66].forEach(function(v) {
          expect(binTree.containsRecursively(v)).to.equal(true);
        });
      });
      it("should return true, when it's found", function() {
        expect(binTree.containsRecursively(66)).to.equal(true);
      });
      it("should return false, when it's not found", function() {
        expect(binTree.containsRecursively(-20)).to.equal(false);
        expect(binTree.containsRecursively(20)).to.equal(false);
      });
    });
  });
    describe("breadth first search", function(){
      var binTree;
      beforeEach(function() {
        binTree = new data.BinTree();
        [7,3,9,1,99,44,66].forEach(function(v) {
          binTree.insertIteratively(v);
        });
      });
      it("should search left to right", function(){
        expect(binTree.breadthFirstSearch()).to.deep.eq([7,3,9,1,99,44,66]);
      });
    });
    describe("depth first search", function(){
      beforeEach(function() {
        binTree = new data.BinTree();
        [7,3,9,1,99,44,66].forEach(function(v) {
          binTree.insertRecursively(v);
        });
      });
      describe("preorder", function(){
        it("searches from root - left - right", function(){
          expect(binTree.DFSPreOrder()).to.deep.eq([7, 3, 1, 9, 99, 44, 66]);
        });
      });
      describe("inorder", function(){
        it("searches from left - root - right", function(){
          expect(binTree.DFSInOrder()).to.deep.eq([1, 3, 7, 9, 44, 66, 99]);
        });
      });
      describe("postorder", function(){
        it("searches from left - right - root", function(){
          expect(binTree.DFSPostOrder()).to.deep.eq([1, 3, 66, 44, 99, 9, 7]);
        });
      });
    });
    describe("#findLowest", function(){
      it("It should", function(){
        binTree = new data.BinTree();
        [7,3,9,1,99,44,66].forEach(function(v) {
          binTree.insertRecursively(v);
        });
        expect(binTree.findLowest()).to.equal(1);
      });
    });
    describe("#findHighest", function(){
      it("It should", function(){
        binTree = new data.BinTree();
        [7,3,9,1,99,44,66].forEach(function(v) {
          binTree.insertRecursively(v);
        });
        expect(binTree.findHighest()).to.equal(99);
      });
    });
    describe("#size", function(){
      it("It should return the size of the binary tree", function(){
        binTree = new data.BinTree();
        [7,3,9,1,99,44,66].forEach(function(v) {
          binTree.insertRecursively(v);
        });
        expect(binTree.size()).to.equal(7);
      });
    });
    describe("#remove", function(){
      beforeEach(function(){
        binTree = new data.BinTree();
        [7,3,9,8,5,1,99,44,33,66].forEach(function(v) {
          binTree.insertRecursively(v);
        })
      });
      it("does not remove values not in the tree", function(){
        expect(binTree.remove(100)).to.equal("Value not in the tree!");
      });
      it("removes leaf nodes correctly", function(){
        binTree.remove(1);
        expect(binTree.DFSInOrder()).to.deep.eq([3,5,7,8,9,33,44,66,99]);
      });
      it("removes a node with 1 child on the left", function() {
        binTree = new data.BinTree();
        binTree.insertRecursively(50);
        binTree.insertRecursively(20);
        binTree.insertRecursively(55);
        binTree.insertRecursively(54);
        binTree.remove(55);
        expect(binTree.root.value).to.equal(50);
        expect(binTree.root.right.value).to.equal(54);
        expect(binTree.root.left.value).to.equal(20);
        expect(binTree.root.left.left).to.equal(null);
        expect(binTree.root.right.right).to.equal(null);
      });
      it("removes a node with 1 child on the right", function() {
        binTree = new data.BinTree();
        binTree.insertRecursively(50);
        binTree.insertRecursively(20);
        binTree.insertRecursively(21);
        binTree.insertRecursively(54);
        binTree.remove(20);
        expect(binTree.root.value).to.equal(50);
        expect(binTree.root.right.value).to.equal(54);
        expect(binTree.root.left.value).to.equal(21);
        expect(binTree.root.left.left).to.equal(null);
        expect(binTree.root.right.right).to.equal(null);
      });
      it("removes nodes with two children correctly", function(){
        binTree.remove(3);
        expect(binTree.DFSInOrder()).to.deep.eq([1,5,7,8,9,33,44,66,99]);
      });
      it("removes the root node correctly when the root is a leaf", function(){
        binTree = new data.BinTree();
        binTree.insertRecursively(7);
        binTree.remove(7)
        expect(binTree.DFSInOrder()).to.deep.eq([]);
      });
      it("removes the root node correctly when the root has a child", function(){
        binTree = new data.BinTree();
        binTree.insertRecursively(7);
        binTree.insertRecursively(10);
        binTree.remove(7);
        expect(binTree.DFSInOrder()).to.deep.eq([10]);
      });
      it("removes the root node correctly when the root has two children", function(){
        binTree.remove(7);
        expect(binTree.DFSInOrder()).to.deep.equal([1,3,5,8,9,33,44,66,99]);
      });
      it("removes correctly with 2 children and the right child doesn't have any left children", function() {
        binTree = new data.BinTree();
        binTree.insertRecursively(25);
        binTree.insertRecursively(10);
        binTree.insertRecursively(27);
        binTree.insertRecursively(28);
        binTree.remove(25);
        expect(binTree.root.value).to.equal(27);
        expect(binTree.root.left.value).to.equal(10);
        expect(binTree.root.right.value).to.equal(28);
      })
    });
});