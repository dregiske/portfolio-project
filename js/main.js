
const header = document.querySelector('.site-header');
const onScroll = () => {
	if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Highlight active nav link as sections enter the viewport
const navLinks = document.querySelectorAll('.site-nav a');
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
    });
}, { threshold: 0.6 });

sections.forEach(sec => obs.observe(sec));

// Reveal-on-scroll for cards
const revealElements = document.querySelectorAll('.will-reveal');
if (revealElements.length) {
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion) {
		revealElements.forEach(el => el.classList.add('revealed'));
	} else {
		revealElements.forEach((el, idx) => {
			el.style.transitionDelay = `${idx * 120}ms`;
		});
		const revealObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('revealed');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
		revealElements.forEach(el => revealObserver.observe(el));
	}
}
