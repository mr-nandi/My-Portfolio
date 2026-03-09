// --- Firebase Configuration ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
    
    authDomain: "my-portfolio-29d15.firebaseapp.com",
    projectId: "my-portfolio-29d15",
    storageBucket: "my-portfolio-29d15.appspot.com",
    messagingSenderId: "504647708875",
    appId: "1:504647708875:web:077a85fd64655a300d2b4e",
    measurementId: "G-MLY3WW8FQ3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Reveal Animation ---
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Apply reveal class to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal-init'); // Initial state in CSS
        revealOnScroll.observe(section);
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTopButton.style.display = 'flex';
                backToTopButton.style.opacity = '1';
            } else {
                backToTopButton.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 500) backToTopButton.style.display = 'none';
                }, 300);
            }
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            const name = this.name.value.trim();
            const email = this.email.value.trim();
            const message = this.message.value.trim();

            if (!name || !email || !message) return;

            try {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="ph ph-circle-notch ph-spin"></i> Sending...';

                await addDoc(collection(db, 'contacts'), {
                    name,
                    email,
                    message,
                    timestamp: serverTimestamp()
                });

                alert(`Message sent! Thanks ${name}, I'll get back to you soon.`);
                this.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('Connection error. Please try again.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    // --- Category Page Navigation ---
    const categoryPages = ['android.html', 'web.html', 'windows.html', 'lua.html', 'hardware.html'];
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentPageIndex = categoryPages.indexOf(currentPath);

    if (currentPageIndex !== -1) {
        const leftArrow = document.getElementById('left-arrow1');
        const rightArrow = document.getElementById('right-arrow1');

        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                const prevIndex = (currentPageIndex - 1 + categoryPages.length) % categoryPages.length;
                window.location.href = categoryPages[prevIndex];
            });
        }
        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                const nextIndex = (currentPageIndex + 1) % categoryPages.length;
                window.location.href = categoryPages[nextIndex];
            });
        }
    }
    // --- Theme Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            });
        });
    }
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        updateThemeIcons('ph-moon');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            let theme = 'dark';
            if (document.body.classList.contains('light-theme')) {
                theme = 'light';
                updateThemeIcons('ph-moon');
            } else {
                updateThemeIcons('ph-sun');
            }
            localStorage.setItem('theme', theme);
        });
    });

    function updateThemeIcons(newIconClass) {
        document.querySelectorAll('.theme-icon').forEach(icon => {
            icon.classList.remove('ph-moon', 'ph-sun');
            icon.classList.add(newIconClass);
        });
    }

    // --- Global Shake Effect (Removed) ---

    // --- Global Search ---
    const searchIndex = [
        { title: 'Android Applications', url: 'android.html', kw: 'java xml firebase mobile app smartphone' },
        { title: 'Web Applications', url: 'web.html', kw: 'html css javascript react portfolio website' },
        { title: 'Windows Software', url: 'windows.html', kw: 'c# .net sql desktop monitor camera thrust invoice' },
        { title: 'LUA Scripting', url: 'lua.html', kw: 'drone autonomous scripts ardupilot mission planner' },
        { title: 'Hardware Engineering', url: 'hardware.html', kw: 'aerodynamics pcb electronics embedded systems' },
        { title: 'Professional Profile', url: 'profile.html', kw: 'about experience education certifications mca bca skills' },
        { title: 'Contact Me', url: 'index.html#contact', kw: 'message email hire recruiter get in touch' },
        { title: 'My Projects', url: 'index.html#projects', kw: 'portfolio work showcase selected endeavors' }
    ];

    const searchInputs = document.querySelectorAll('.global-search');

    searchInputs.forEach(searchInput => {
        const resultsContainer = searchInput.nextElementSibling;

        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase().trim();
            resultsContainer.innerHTML = '';

            if (query.length > 0) {
                const matches = searchIndex.filter(item =>
                    item.title.toLowerCase().includes(query) ||
                    item.kw.includes(query)
                );

                if (matches.length > 0) {
                    matches.forEach(match => {
                        const div = document.createElement('a');
                        div.className = 'search-result-item';
                        div.href = match.url;
                        div.innerHTML = `
                            <div class="search-result-title">${match.title}</div>
                            <div class="search-result-desc">Matches: ${query}</div>
                        `;
                        resultsContainer.appendChild(div);
                    });
                } else {
                    resultsContainer.innerHTML = `<div class="search-result-item"><div class="search-result-desc">No results found for "${query}"</div></div>`;
                }
                resultsContainer.classList.add('active');
            } else {
                resultsContainer.classList.remove('active');
            }
        });

        // Hide search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
                resultsContainer.classList.remove('active');
            }
        });
    });

});

