// renderer.js
(async () => {
    try {
        // Load pdfjs-dist dynamically since it's an ES module
        const pdfjsLib = await import('./pdf.mjs');
        pdfjsLib.GlobalWorkerOptions.workerSrc = './pdf.worker.mjs';

        // Global variables
        let overlay = null;
        let revealHeight = 50;
        let scrollEnabled = false;
        let transparency = 0.8;
        let scrollIndicator = null;
        let isRkeyPressed = false;
        let pdfDoc = null;    // The loaded PDF document
        let pageNum = 1;      // Current page number
        let pageCount = 0;    // Total number of pages

        // Wait for DOM to load before setting up event listeners
        document.addEventListener('DOMContentLoaded', () => {
            // Create the overlay with classes instead of inline styles
            function createOverlay() {
                if (overlay) return;
                overlay = document.createElement('div');
                overlay.classList.add('overlay');

                // Create Previous button
                const prevButton = document.createElement('button');
                prevButton.textContent = 'Previous';
                prevButton.addEventListener('click', () => {
                    if (pageNum > 1) {
                        pageNum--;
                        renderPage(pageNum);
                    }
                });

                // Create Next button
                const nextButton = document.createElement('button');
                nextButton.textContent = 'Next';
                nextButton.addEventListener('click', () => {
                    if (pageNum < pageCount) {
                        pageNum++;
                        renderPage(pageNum);
                    }
                });

                // Create scroll indicator
                scrollIndicator = document.createElement('div');
                scrollIndicator.classList.add('scroll-indicator');
                scrollIndicator.textContent = `Scroll Lock: ${scrollEnabled ? 'Enabled' : 'Disabled'}`;

                // Add elements to the overlay
                overlay.appendChild(prevButton);
                overlay.appendChild(nextButton);
                overlay.appendChild(scrollIndicator);

                document.body.appendChild(overlay);
                updateOverlay();
            }

            // Update overlay using CSS variables
            function updateOverlay() {
                if (!overlay) return;
                document.documentElement.style.setProperty('--reveal-height', `${revealHeight}px`);
                document.documentElement.style.setProperty('--overlay-transparency', transparency);
                document.documentElement.style.setProperty('--scroll-indicator-top', `${revealHeight + 10}px`);
                scrollIndicator.textContent = `Scroll Lock: ${scrollEnabled ? 'Enabled' : 'Disabled'}`;
            }

            // Remove the overlay
            function removeOverlay() {
                if (overlay && document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                    overlay = null;
                    scrollEnabled = false;
                    document.body.style.overflow = 'auto';
                    console.log("Overlay removed and scrolling unlocked.");
                }
            }

            // Increase reveal height
            function increaseReveal() {
                if (!scrollEnabled) {
                    revealHeight += 10;
                    updateOverlay();
                }
            }

            // Decrease reveal height
            function decreaseReveal() {
                if (!scrollEnabled && revealHeight > 10) {
                    revealHeight -= 10;
                    updateOverlay();
                }
            }

            // Increase transparency
            function increaseTransparency() {
                if (transparency < 1) {
                    transparency += 0.1;
                    updateOverlay();
                }
            }

            // Decrease transparency
            function decreaseTransparency() {
                if (transparency > 0) {
                    transparency -= 0.1;
                    updateOverlay();
                }
            }

            // Toggle scrolling
            function toggleScrolling() {
                if (overlay) {
                    scrollEnabled = !scrollEnabled;
                    document.body.style.overflow = scrollEnabled ? 'auto' : 'hidden';
                    console.log("Scroll mode " + (scrollEnabled ? "enabled" : "disabled"));
                    updateOverlay();
                }
            }

            // Function to render a specific page
            function renderPage(num) {
                pdfDoc.getPage(num).then(page => {
                    const canvas = document.getElementById('pdfCanvas');
                    const context = canvas.getContext('2d');
                    
                    // Get the page’s viewport and adjust the canvas size
                    const viewport = page.getViewport({ scale: 1.5 }); // Adjust scale as needed
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    
                    // Render the page
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    page.render(renderContext);
                    
                    // Update the page info display
                    document.getElementById('pageInfo').textContent = `Page ${num} of ${pageCount}`;
                    
                    // If your overlay needs updating, call your overlay update function here
                    updateOverlay();
                });
            }

            
            // Load the PDF when a file is selected
            document.getElementById('pdfUpload').addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const pdfData = event.target.result;
                        pdfjsLib.getDocument({ data: pdfData }).promise.then(pdf => {
                            // Store the PDF document and page count
                            pdfDoc = pdf;
                            pageCount = pdf.numPages;
                            pageNum = 1; // Start on the first page
                            renderPage(pageNum); // Render the initial page
                            createOverlay();
                        }).catch(error => {
                            console.error('Error loading PDF:', error);
                        });
                    };
                    reader.readAsArrayBuffer(file);
                }
            });

            // Previous page button
            document.getElementById('prevPage').addEventListener('click', () => {
                if (pageNum > 1) {
                    pageNum--;
                    renderPage(pageNum);
                }
            });

            // Next page button
            document.getElementById('nextPage').addEventListener('click', () => {
                if (pageNum < pageCount) {
                    pageNum++;
                    renderPage(pageNum);
                }
            });

            // Event listeners
            window.addEventListener('keydown', (event) => {
                if (!overlay) return;
                if (event.key === 'r' || event.key === 'R') isRkeyPressed = true;
                if (event.key === 'ArrowDown' || event.key === 'PageDown') increaseReveal();
                if (event.key === 'ArrowUp' || event.key === 'PageUp') decreaseReveal();
                if (event.key === 'ArrowRight') increaseTransparency();
                if (event.key === 'ArrowLeft') decreaseTransparency();
                if (event.key === 's' || event.key === 'S') toggleScrolling();
            });

            window.addEventListener('keyup', (event) => {
                if (event.key === 'r' || event.key === 'R') isRkeyPressed = false;
            });

            window.addEventListener('wheel', (event) => {
                if (!overlay || scrollEnabled) return;
                if (event.deltaY > 0) increaseReveal();
                else if (event.deltaY < 0) decreaseReveal();
            });

            window.addEventListener('mousedown', (event) => {
                if (!overlay) return;
                if (event.button === 4) toggleScrolling();
            });

            window.addEventListener('click', (event) => {
                if (isRkeyPressed && overlay) {
                    revealHeight = event.clientY;
                    updateOverlay();
                }
            });
        });

        } catch (error) {
            console.error('Failed to load pdfjs-dist:', error);
        }
})();