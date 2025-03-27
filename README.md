![GUI](https://github.com/tomemme/focusedReader/blob/main/Focused%20Reader.png)
# Focused Reader Desktop
Focused Reader Desktop is an offline-capable PDF viewer built with Electron, featuring a customizable overlay to enhance reading focus. Designed to assist users with concentration challenges—such as those stemming from trauma or distractions—it allows you to adjust the visible portion of a PDF and control overlay transparency.

## Features
-Custom Overlay: A semi-transparent overlay that highlights a user-defined portion of the PDF, adjustable via mouse and keyboard controls.
-Multi-Page Navigation: Navigate through PDF pages with "Previous" and "Next" buttons integrated into the overlay.
-Offline Functionality: Works without an internet connection, ideal for travel or remote use.
-Lightweight Design: Built to run efficiently on desktop systems using Electron and PDF.js.

## Technologies Used
-Electron: Framework for creating cross-platform desktop applications with web technologies.
-Node.js: Runtime environment for executing JavaScript on the desktop.
-PDF.js: JavaScript library for rendering PDF files within the app.
-HTML/CSS/JavaScript: Core technologies for the user interface and interactivity.

## Installation
To set up and run Focused Reader Desktop locally, follow these steps:

## Prerequisites
Node.js: Version 14.x or higher (includes npm).
Git: For cloning the repository.

## Steps
-Clone the Repository:
git clone https://github.com/tomemme/focused_reader_desktop.git
cd focused_reader_desktop
-Install Dependencies:
bash
npm install
This installs Electron and PDF.js dependencies listed in package.json.
-Run the Application:
bash
npm start
This launches the Electron app.

## Usage
-Open a PDF:
Click the file input button to select a PDF from your local system.
The first page will load automatically with the overlay applied.

-Navigate Pages:
Use the "Previous" and "Next" buttons within the overlay to move between pages.

-Control the Overlay:
Reveal Height: Use the mouse wheel, arrow keys (Up/Down), or click with the 'R' key pressed to adjust the visible area.
Transparency: Press Arrow Left/Right to decrease/increase the overlay’s opacity.
Scroll Lock: Press 'S' or use mouse button 5 to toggle scroll mode.

## Project Structure
focused_reader_desktop/
├── main.js          # Electron main process script
├── renderer.js      # Renderer process script for PDF rendering and overlay
├── index.html       # Main HTML file
├── styles.css       # Styles for overlay and UI elements
├── pdf.mjs          # PDF.js library file
├── pdf.worker.mjs   # PDF.js worker file
├── package.json     # Project metadata and dependencies
└── .gitignore       # Excludes node_modules and other unnecessary files

## Contributing
Feel free to fork this repository, make improvements, and submit pull requests. Issues or suggestions can be reported via GitHub Issues.
## License
This project is unlicensed—feel free to use, modify, and distribute it as you see fit.
## Acknowledgments
Built with inspiration from personal experiences to aid focused reading.
Thanks to the Electron and PDF.js communities for their awesome tools.

