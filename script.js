window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const pageWrapper = document.querySelector('.page-wrapper');

  // Minimum display time for the premium feel
  const minTime = 800; 
  const startTime = performance.now();

  const hideLoader = () => {
    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, minTime - elapsed);

    setTimeout(() => {
      loader.classList.add('loaded');
      pageWrapper.classList.add('visible');
      
      // Remove loader from DOM after transition completes
      setTimeout(() => {
        loader.style.display = 'none';
      }, 1000); // Matches the CSS transition duration
    }, remaining);
  };

  hideLoader();
});
