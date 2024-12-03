# Circular Image Viewer

A simple web application that displays images in a circular carousel format, allowing users to navigate through images using 'Previous' and 'Next' buttons.

## Features
- Circular navigation through images (going past the last image returns to the first)
- Responsive image display
- Clean, minimalist UI with navigation buttons
- Images maintain aspect ratio while fitting the screen

## Technical Components

### Frontend
- **Template Engine**: Uses Pug for HTML templating
- **Styling**: CSS with responsive design
  - Centered image display
  - Hover effects on navigation buttons
  - Mobile-friendly layout
- **User Interface**:
  - Navigation buttons (Previous/Next)
  - Centred image display
  - Responsive design that works on different screen sizes

### Backend
- **Server**: Node.js with Express.js framework
- **Data Structure**: Custom Circular Doubly Linked List implementation
  - Enables efficient circular navigation through images
  - Maintains references to both previous and next images
  - Automatically handles wrapping around from last to first image

## How It Works
1. The server starts on port 3000
2. Images are stored in a circular doubly linked list
3. Each image is accessible via URL path `/image/{index}`
4. Navigation buttons calculate the next/previous indices automatically
5. The root path ('/') redirects to the first image

## Project Structure

project/
│
├── views/
│ └── image.pug # Image display template
│
├── public/
│ ├── images/ # Image files
│ └── styles/
│ └── style.css # Styling
│
├── index.js # Main server file
└── package.json # Project dependencies


## Setup and Running

1. Install dependencies:
```bash
npm install
```
2. Start the server:

```bash
node index.js
```

3. Visit `http://localhost:3000` in your browser
## Dependencies
- Express.js: Web application framework
- Pug: Template engine
- Node.js: Runtime environment
## How to Add New Images
Add your image files to the `public/images` directory and update the image list in `index.js`:

```javascript
imageList.add('/images/your-new-image.png');
```

