import express from 'express';
import path from 'path';
const app = express();
const __dirname = path.resolve();

// Set up Pug as the templating engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Node class definition for doubly linked list
class Node {
  constructor(data) {
    this.data = data; // stores the value
    this.prev = null; // stores a reference to the previous node
    this.next = null; // stores a reference to the next node
  }
}

// Doubly LinkedList class definition
class CircularDoublyLinkedList {
  constructor() {
    this.head = null; // Head of the list
    this.tail = null; // Tail of the list
    this.length = 0;  // Number of nodes in the list
  }

  // Method to add a new node with 'data' at the end of the list
  add(data) {
    const newNode = new Node(data); // create a new node
    if (this.tail) { // if the list isn't empty
      newNode.next = this.head; // point the new node to the head for circular structure
      newNode.prev = this.tail; // set previous of new node as the old tail
      this.tail.next = newNode; // point the old tail's next to the new node
      this.head.prev = newNode; // link the head's previous to the new node
      this.tail = newNode; // assign new node as the tail
    } else { // if the list is empty
      this.head = newNode; // assign new node as head
      this.tail = newNode; // and as tail since it's the only node
      newNode.next = newNode; // point to itself
      newNode.prev = newNode; // since it's the only node in the list
    }
    this.length++ // increment the size of the list
  }

  // Method to get a node at a specific index (wrapped for circular list)
  get(index) {
    if (!this.head) return null; // if the list is empty return null
    let current = this.head; // start from the head
    let count = 0; // to keep track of where we are
    // Since it's circular, we can use the mod operator to loop back to start
    index = index % this.length; // ensure index is within bounds
    while (count < index) {
      current = current.next; // move to next node
      count++; // increment counter
    }
    return current; // return the node at given index
  }

  // Method to get the number of nodes in the list
  size() {
    return this.length; // return the current size of the list
  }
}

// Example usage of DoublyLinkedList to store images
const imageList = new CircularDoublyLinkedList();
imageList.add('/images/ada.png');
imageList.add('/images/pwc.png');
imageList.add('/images/manchester.png');

// Endpoint to display an image by index
app.get('/image/:index', (req, res) => {
  const index = parseInt(req.params.index, 10) % imageList.size(); // normalise index
  const imageNode = imageList.get(index); // retrieve image node
  const prevIndex = (index - 1 + imageList.size()) % imageList.size(); // calculate previous index
  const nextIndex = (index + 1) % imageList.size(); // calculate next index

  res.render('image', { imageUrl: imageNode.data, prevIndex, nextIndex }); // render the image view
});

// // Redirect '/' to the first image
app.get('/', (req, res) => {
  res.redirect('/image/0'); // redirect to the first image.
});

// Start the server listening on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000'); // log that server is running
});