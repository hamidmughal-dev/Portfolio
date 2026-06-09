const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
    });
}

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.16 }
);

revealElements.forEach((element) => revealObserver.observe(element));
