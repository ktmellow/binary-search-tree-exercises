// http://visualgo.net/bst.html
// Tips for making recursive functions
// Make a while loop first
// change the while loop's condition to a base case
// then make it return itself instead of changing base condition
function BinTree(){
  this.root = null;
}

function Node(value,left=null,right=null){
  this.value = value;
  this.left = left;
  this.right = right;
}

BinTree.prototype.insertIteratively = function(value){
  if (typeof(value) !== "number" || !value ) return "Please insert a number";
  var n = new Node(value);
  if(!this.root) {
    this.root = n;
    return this;
  } else {
    var currentNode = this.root;
    while(true) {
      if(currentNode.value === value) {
        return this; 
      } else if (currentNode.value < value) {
        if(currentNode.right) {
          if(value === currentNode.right.value) {
            return this;
          }
          currentNode = currentNode.right;
        } else {
          currentNode.right = n;
          return this;
        }
      } else {
        if (currentNode.left) {
          if(currentNode.left.value === value) {
            return this;
          } else {  
            currentNode = currentNode.left;
          }
        } else {
          currentNode.left = n;
          return this;
        }
      }
    }
  }
  return this;
};

BinTree.prototype.insertRecursively = function(value,current){
  if(!Number.isInteger(value) || !value) return "Please insert a number";
  if(!this.root) {
    this.root = new Node(value);
    return this; 
  } else {
    var currentNode = current || this.root;
    if(currentNode.value === value) {
      return 'duplicate!';
    } else if (currentNode.value > value) {
      if(currentNode.left) {
        return this.insertRecursively(value, currentNode.left);
      } else {
        currentNode.left = new Node(value);
        return this;
      }
    } else {
      if(currentNode.right) {
        return this.insertRecursively(value, currentNode.right);
      } else {
        currentNode.right = new Node(value);
        return this;
      }
    } 
  }
};

BinTree.prototype.containsIteratively = function(value){
  if(!this.root) return false;
  var currentNode = this.root;
  while(true) {
    if(currentNode.value === value) {
      return true;
    } else if (currentNode.value > value) {
      if(currentNode.left) {
        currentNode = currentNode.left;
      } else {
        return false;
      }
    } else {
      if(currentNode.right) {
        currentNode = currentNode.right;
      } else {
        return false;
      }
    }
  }
};

BinTree.prototype.containsRecursively = function(value,current){
  if(!this.root) return false;
  var currentNode = current || this.root;
  if(currentNode.value === value) {
    return true;
  } else if (currentNode.value > value) {
    if(currentNode.left) {
      return this.containsRecursively(value, currentNode.left);
    } else {
      return false;
    }
  } else {
    if(currentNode.right) {
      return this.containsRecursively(value, currentNode.right);
    } else {
      return false;
    }
  }
};

BinTree.prototype.breadthFirstSearch = function() {
  if(!this.root) return [];
  var q = [this.root];
  var data = [];
  while(q.length) {
    if(q[0].left) q.push(q[0].left); 
    if(q[0].right) q.push(q[0].right);
    data.push(q.shift().value);
  }
  return data;
};

// DEPTH FIRST SEARCH (Pre / In / Post Order)

// http://datastructuresnotes.blogspot.com/2009/02/binary-tree-traversal-preorder-inorder.html

// HINT - you can evaluate a JS expression conditionally by adding a truthy / falsey statement and // then attaching a && along with the expression

// take a look at this code for an example

// function sayHi(){
//   return "hey!"
// }

// what does true && sayHi() return?
// what about false && sayHi() return?

// visualizing the call stack using the chrome dev tools or just drawing it will help a lot with this!

BinTree.prototype.DFSPreOrder = function() {
  var currentNode = this.root;
  var data = [];
  function search(node) {
    data.push(node.value);
    if(node.left) search(node.left);
    if(node.right) search(node.right);
  }
  if(currentNode) search(currentNode)
  return data;
};

BinTree.prototype.DFSInOrder = function() {
  var currentNode = this.root;
  var data = [];
  function search(node) {
    if(node.left) search(node.left);
    data.push(node.value);
    if(node.right) search(node.right);
  }
  if(currentNode) search(currentNode)
  return data;
};

BinTree.prototype.DFSPostOrder = function() {
  var currentNode = this.root;
  var data = [];
  function search(node) {
    if(node.left) search(node.left);
    if(node.right) search(node.right);
    data.push(node.value);
  }
  if(currentNode) search(currentNode);
  return data;
};

BinTree.prototype.size = function() {
  if(!this.root) return 0;
  var q = [this.root]
  size = 0;
  while(q.length){
    if(q[0].left) q.push(q[0].left);
    if(q[0].right) q.push(q[0].right);
    q.shift();
    size += 1;
  }
  return size;
};

BinTree.prototype.findLowest = function() {
  var currentNode = this.root;
  while(currentNode.left){
    currentNode = currentNode.left;
  }
  return currentNode.value;
};

BinTree.prototype.findHighest = function() {
  var currentNode = this.root;
  while(currentNode.right) {
    currentNode = currentNode.right;
  }
  return currentNode.value;
};

// private helper method for remove
BinTree.prototype._countChildren = function(node){
  var children = 0;
  if(node.left) ++children;
  if(node.right) ++children;
  return children;
};

// flow control based on what the helper tells you
BinTree.prototype.remove = function(value){
  // find node based on value AND get children while you're at it.
  // if(!this.root) return;
  // var currentNode = this.root;
  // var children = null;
  // var lastMove = null;
  // var parentNode = null;
  // while( children === null ) {
  //   if( currentNode.value === value ) {
  //     children = this._countChildren(currentNode);
  //   } else if (currentNode.value > value) {
  //     if( currentNode.left ) {
  //       parentNode = currentNode;
  //       currentNode = currentNode.left;
  //       lastMove = "left";
  //     } else {
  //       return "Value not in the tree!";
  //     }
  //   } else {
  //     if( currentNode.right ){
  //       parentNode = currentNode;
  //       currentNode = currentNode.right;
  //       lastMove = "right";
  //     } else {
  //       return "Value not in the tree!";
  //     }
  //   }
  // }
  // function saveTheChildren(){
  //   if( children === 1 ){
  //     var saveLefty = currentNode.left;
  //   } else if( children === 2 ) {
  //     var saveLefty = currentNode.left;
  //     var saveRighty = currentNode.right;
  //   }
  // }

  // // Parent abandons child node that holds the value argument.
  //   if(parentNode === this.root){
  //     this.root = currentNode;
  //   } else if(parentNode) {
  //     parentNode[lastMove] = null;
  //   } else if( !parentNode ){
  //     this.root = null;
  //     // if parentNode === this.root but also need to cover the children
  //   }  
  //   console.log(parentNode, currentNode)
    
  //   // reassign children if root is null and children=1, this.root = saveLefty;
  //   // reassign children if root is null and children=2: concat lefty + righty, loop through their search [] to insert each
  //   // reassign children by searching down the children to get an array of them. then loop through and insert each.
  //   // if parentNode._countChildren <= children then insert if(lefty) then insert(righty) if righty
  //   // if                           > children then 

  

  // FROM SOLUTIONS BRANCH

  var isFound = false;
  var current = this.root;
  var child;
  var parent;
  var temp;
  var tempParent;

  // very similar to search function but with a parent
  while(current && !isFound){
    if(value < current.value) {
      parent = current;
      current = current.left; 
    } else if (value > current.value) {
      parent = current;
      current = current.right;
    } else {
      isFound = true;
    }

    if(!isFound) return "Value not in the tree!";

    var childCount = this._countChildren(current);

    if(childCount === 0) {
      if(parent && current.value > parent.value) {
        parent.right = null
      } else if (parent && current.value < parent.value){
        parent.left = null;
      } else {
        this.root = null;
      }
    }

    else if(childCount === 1) {
      
      child = current.right || current.left;

      if(parent && current.value > parent.value) {
        parent.right = child;
      } else if (parent && current.value < parent.value) {
        parent.left = child;
      } else {
        this.root = child;
      }
    
    // 2 children
    } else {
      temp = current.right;
      // keep looking left until you find an empty left space
      while(temp.left !== null) {
        temp = temp.left;
      }
      temp.left = current.left;
      if(parent && current.value > parent.value) {
        parent.right = current.right;
      } else if (parent && current.value < parent.value) {
        parent.left = current.right;
      } else {
        this.root = current.right;
      }
    }
  }
};

module.exports = {
  BinTree: BinTree,
  Node: Node
};
