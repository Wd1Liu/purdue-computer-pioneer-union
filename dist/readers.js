'use strict';
// Progressive enhancement only: every report and session remains fully readable
// with JavaScript disabled, and all navigation is standard document navigation.
const progress = document.querySelector('.reading-progress');
const trackedSections = [...document.querySelectorAll('.report-section, .report-source-section')];
const contentsLinks = [...document.querySelectorAll('.report-toc nav a')];
function updateReadingProgress() {
  if (!progress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? Math.min(100, Math.max(0, window.scrollY / scrollable * 100)) : 100}%`;
}
window.addEventListener('scroll', updateReadingProgress, { passive: true });
window.addEventListener('resize', updateReadingProgress, { passive: true });
updateReadingProgress();
if ('IntersectionObserver' in window && trackedSections.length) {
  const observer = new IntersectionObserver(entries => {
    const active = entries.find(entry => entry.isIntersecting);
    if (!active) return;
    contentsLinks.forEach(link => {
      if (link.hash === `#${active.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  trackedSections.forEach(section => observer.observe(section));
}
