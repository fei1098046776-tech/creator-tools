// FAQ accordion
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const a = q.nextElementSibling;
    const isOpen = q.classList.contains('open');
    document.querySelectorAll('.faq-q').forEach(el => {
      el.classList.remove('open');
      el.nextElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      q.classList.add('open');
      a.classList.add('open');
    }
  });
});

// Number formatting helper
function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(2) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return Math.round(n).toLocaleString();
}

function formatMoney(n) {
  if (n >= 1000) return '$' + (n / 1000).toFixed(1) + 'K';
  return '$' + n.toFixed(2);
}

// Animate number change
function animateValue(el, start, end, duration = 600) {
  const startTime = performance.now();
  const isFloat = String(end).includes('.');
  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * eased;
    el.textContent = isFloat ? current.toFixed(2) : Math.round(current).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
