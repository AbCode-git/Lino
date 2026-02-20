// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('mousedown', () => {
    cursor.style.width = '8px';
    cursor.style.height = '8px';
    cursorFollower.style.width = '25px';
    cursorFollower.style.height = '25px';
});

document.addEventListener('mouseup', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursorFollower.style.width = '30px';
    cursorFollower.style.height = '30px';
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '0.7';
    cursorFollower.style.opacity = '0.5';
});

// Add hover effect for links and buttons
const hoverElements = document.querySelectorAll('a, button, .service-card, .package, .gallery-item, .social-icon');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '15px';
        cursor.style.height = '15px';
        cursor.style.backgroundColor = 'var(--secondary-color)';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.backgroundColor = 'var(--accent-color)';
        cursorFollower.style.width = '30px';
        cursorFollower.style.height = '30px';
    });
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Gallery Filter
const galleryGrid = document.querySelector('.gallery-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Sample gallery items data
const galleryItems = [
    {
        category: 'makeup',
        image: 'public/images/makeup-1.svg',
        title: 'Natural Glam',
        description: 'Everyday makeup look'
    },
    {
        category: 'hair',
        image: 'public/images/makeup-2.svg',
        title: 'Elegant Updo',
        description: 'Perfect for special occasions'
    },
    {
        category: 'nails',
        image: 'public/images/makeup-3.svg',
        title: 'French Manicure',
        description: 'Classic nail design'
    },
    {
        category: 'wedding',
        image: 'public/images/wedding-package.svg',
        title: 'Bridal Beauty',
        description: 'Complete wedding look'
    },
    {
        category: 'makeup',
        image: 'public/images/makeup-4.svg',
        title: 'Evening Glam',
        description: 'Bold and dramatic'
    },
    {
        category: 'hair',
        image: 'public/images/makeup-5.svg',
        title: 'Beach Waves',
        description: 'Effortless style'
    },
    {
        category: 'nails',
        image: 'public/images/makeup-6.svg',
        title: 'Nail Art',
        description: 'Creative designs'
    },
    {
        category: 'wedding',
        image: 'public/images/special-package.svg',
        title: 'Wedding Party',
        description: 'Bridesmaid makeup'
    }
];

// Create gallery items
function createGalleryItems() {
    galleryGrid.innerHTML = '';
    
    galleryItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        
        galleryItem.innerHTML = `
            <div class="gallery-image-container">
                <img src="${item.image}" alt="${item.title}" onerror="this.src='public/images/placeholder.svg'">
            </div>
            <div class="gallery-overlay">
                <div class="gallery-overlay-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="#" class="gallery-icon"><i class="fas fa-search"></i></a>
                </div>
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Filter gallery items
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Initialize gallery
createGalleryItems();

// Form Handling
const appointmentForm = document.getElementById('appointment-form');
const confirmationModal = document.querySelector('.themed-confirmation-modal');

// Hide confirmation modal by default
if (confirmationModal) {
    confirmationModal.style.display = 'none';
}

if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const message = document.getElementById('message').value;
        
        // Update confirmation modal with user data
        if (confirmationModal) {
            // Update the confirmation modal with the user's information
            document.getElementById('clientName').textContent = name;
            document.querySelector('.confirmation-details .confirmation-highlight:nth-child(2)').textContent = service;
            document.getElementById('appointmentDate').textContent = date;
            document.getElementById('contactInfo').textContent = `${phone} or ${email}`;
            
            // Show the confirmation modal
            confirmationModal.style.display = 'block';
            
            // Add animation class
            confirmationModal.classList.add('animate-modal');
            
            // Scroll to the confirmation modal
            confirmationModal.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Reset form
        appointmentForm.reset();
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to a server
        alert(`Thank you for subscribing with ${email}! You will now receive our beauty tips and special offers.`);
        
        // Reset form
        newsletterForm.reset();
    });
}

// Scroll Reveal Animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.service-card, .package, .gallery-item, .about-content p, .about-image, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('reveal-element');
        }
    });
}

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    .service-card, .package, .gallery-item, .about-content p, .about-image, .contact-info, .contact-form {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .reveal-element {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize scroll reveal
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Create images directory and placeholder for gallery
function createImagePlaceholders() {
    // This is just a placeholder function
    // In a real implementation, you would upload actual images
    console.log('Image placeholders would be created here in a real implementation');
}

// Initialize the site
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} LINO Beauty Lounge. All Rights Reserved.`;
    }
    
    createImagePlaceholders();
});