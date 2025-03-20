/**
 * Utility functions for scrolling to elements
 */

/**
 * Scrolls smoothly to the results panel
 */
export const scrollToResults = () => {
  // Find the results panel element
  const resultsPanel = document.querySelector('.results-panel');
  
  if (resultsPanel) {
    // Scroll to the element with smooth behavior
    resultsPanel.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    
    // On mobile, also switch to the results tab
    const isMobile = window.innerWidth < 768; // md breakpoint in Tailwind
    
    if (isMobile) {
      // Find any tab selector buttons that control the results tab
      const resultsTabButton = document.querySelector('button[data-tab="results"]');
      if (resultsTabButton) {
        // Simulate a click on the results tab button
        (resultsTabButton as HTMLElement).click();
      }
    }
  }
};