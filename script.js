// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYL8otlGrTx6eJF2yS08PUqfeEwoevRdw",
    authDomain: "my-portfolio-29d15.firebaseapp.com",
    projectId: "my-portfolio-29d15",
    storageBucket: "my-portfolio-29d15.appspot.com",
    messagingSenderId: "504647708875",
    appId: "1:504647708875:web:077a85fd64655a300d2b4e",
    measurementId: "G-MLY3WW8FQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    // Image hover effect
    const aboutImage = document.querySelector('.about-image');
    if(aboutImage) {
        const originalSrc = aboutImage.src;
        const hoverSrc = 'Assets/boy (1).png';

        aboutImage.addEventListener('mouseenter', () => {
            aboutImage.src = hoverSrc;
        });
        aboutImage.addEventListener('mouseleave', () => {
            aboutImage.src = originalSrc;
        });
    }

    // Contact form submission handler
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const name = this.name.value.trim();
            const email = this.email.value.trim();
            const message = this.message.value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Basic email validation
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            try {
                await addDoc(collection(db, 'contacts'), {
                    name: name,
                    email: email,
                    message: message,
                    timestamp: serverTimestamp()
                });
                alert(`Thank you for your message, ${name}! We will get back to you soon.`);
                this.reset();
            } catch (error) {
                console.error('Error sending message:', error);
                alert('There was an error sending your message. Please try again later.');
            }
        });
    }

    // Slide navigation for profile cards
    const slides = document.querySelectorAll('.slide-container .slide');
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');
    let currentSlide = 0;
    let isAnimating = false;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? 'block' : 'none';
            slide.classList.remove('fade-in', 'fade-out');
        });
    }

    function animateSlideChange(newIndex) {
        if (isAnimating || newIndex === currentSlide) return;
        isAnimating = true;

        const current = slides[currentSlide];
        const next = slides[newIndex];

        // Start fade out of current slide
        current.classList.add('fade-out');

        current.addEventListener('animationend', function onFadeOut() {
            current.removeEventListener('animationend', onFadeOut);
            current.style.display = 'none';
            current.classList.remove('fade-out');

            // Show next slide and fade in
            next.style.display = 'block';
            next.classList.add('fade-in');

            next.addEventListener('animationend', function onFadeIn() {
                next.removeEventListener('animationend', onFadeIn);
                next.classList.remove('fade-in');
                currentSlide = newIndex;
                isAnimating = false;
            });
        });
    }

    showSlide(currentSlide);

    if(leftArrow) {
        leftArrow.addEventListener('click', () => {
            const newIndex = (currentSlide - 1 + slides.length) % slides.length;
            animateSlideChange(newIndex);
        });
    }

    if(rightArrow) {
        rightArrow.addEventListener('click', () => {
            const newIndex = (currentSlide + 1) % slides.length;
            animateSlideChange(newIndex);
        });
    }

    
    // Navigation arrows (if implemented)
    const leftArrow1 = document.getElementById('left-arrow1');
    const rightArrow1 = document.getElementById('right-arrow1');
    const pages = ['android.html', 'web.html', 'windows.html', 'lua.html', 'hardware.html'];
    let currentPageIndex = pages.indexOf(window.location.pathname.split('/').pop());

    if(leftArrow1) {
        leftArrow1.addEventListener('click', () => {
            currentPageIndex = (currentPageIndex - 1 + pages.length) % pages.length;
            window.location.href = pages[currentPageIndex];
        });
    }

    if(rightArrow1) {
        rightArrow1.addEventListener('click', () => {
            currentPageIndex = (currentPageIndex + 1) % pages.length;
            window.location.href = pages[currentPageIndex];
        });
    }

    // Flip card toggle
    const flipButton = document.getElementById('flip-button');
    const card = document.querySelector('.card-container .card');
    if (flipButton && card) {
        flipButton.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    }

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if(backToTopButton) {
        window.addEventListener('scroll', () => {
            if(window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});