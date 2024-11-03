// Animation variants for elements
const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const scaleUp = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
        scale: 1, 
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
};

// Add animations to elements
document.addEventListener('DOMContentLoaded', () => {
    // Hero section animation
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            hero.style.transition = 'all 0.6s ease-out';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }

    // Product cards animation
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 100 + (index * 100)); // Stagger the animations
    });

    // Category cards animation
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 300 + (index * 150));
    });
});

// Add smooth transitions for filter buttons
const filterButtons = document.querySelectorAll('[data-filter]');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const products = document.querySelectorAll('.product-card');
        const category = button.dataset.filter;

        products.forEach(product => {
            product.style.transition = 'all 0.5s ease-out';
            if (category === 'all' || product.dataset.category === category) {
                product.style.opacity = '1';
                product.style.transform = 'scale(1)';
                product.style.display = 'block';
            } else {
                product.style.opacity = '0';
                product.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    product.style.display = 'none';
                }, 500);
            }
        });
    });
}); 