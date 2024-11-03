// Handle mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('[data-mobile-menu]');
    const mobileMenu = document.querySelector('[data-mobile-menu-items]');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
//TODO FIX THE MOBILE MENU FUNCTIONALITY

    // Flash messages dismiss
    const flashMessages = document.querySelectorAll('[data-flash-message]');
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 300);
        }, 5000);
    });

    // Product filter functionality
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.filter;
            filterProducts(category);
        });
    });
});

// Product filter function
function filterProducts(category) {
    const products = document.querySelectorAll('[data-product-category]');
    products.forEach(product => {
        if (category === 'all' || product.dataset.productCategory === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
} 