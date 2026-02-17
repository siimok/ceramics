
const Products = {
    "Kantkoba": "/products/kantkoba.png",
    "Kulg": "/products/kulg.png",
    "Ümarnurk": "/products/umarnurk.png",
    "Kantnurk": "/products/kantnurk.png",
    "Karniis": "/products/karniis.png",
    "Keraamiline tahmatops": "/products/keraamiline-tahmatops.jpg",
    "Sokkel": "/products/sokkel.png",
};

const Finished = {
    "Lihtpotist ahi 1": "/finished/lihv-ahi.jpg",
    "Lihtpotist ahi 2": "/finished/lihv-ahi2.jpg",
    "Valgest glasuurahjupotist ahi 1": "/finished/valge-ahi.jpg",
    "Valgest glasuurahjupotist ahi 2": "/finished/valge-ahi-2.jpg",
    "Valgest glasuurahjupotist pliit": "/finished/valge-pliit.jpg",
}

function createCarousel(dataObj, prefix) {
    const keys = Object.keys(dataObj);
    const maximumIndex = keys.length - 1;
    let index = 0;

    // Buttons
    const prevBtn = document.getElementById(`${prefix}-prev`);
    const nextBtn = document.getElementById(`${prefix}-next`);

    if(!prevBtn) return;

    // Images (assume always 3 visible)
    const images = [
        document.getElementById(`${prefix}-image-1`),
        document.getElementById(`${prefix}-image-2`),
        document.getElementById(`${prefix}-image-3`)
    ];

    prevBtn.addEventListener("click", () => {
        index = fitInRange(index - 1, maximumIndex);
        updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
        index = fitInRange(index + 1, maximumIndex);
        updateCarousel();
    });

    function updateCarousel() {
        images.forEach((imgEl, i) => {
            const key = keys[fitInRange(index + i, maximumIndex)];
            imgEl.src = dataObj[key];
            imgEl.alt = key;
            imgEl.title = key;
        });
    }

    updateCarousel(); // init
}

// --- Helpers ---
function fitInRange(num, max) {
    const size = max + 1;
    return ((num % size) + size) % size;
}

createCarousel(Products, "products");
createCarousel(Finished, "finished");


function createSlideshow(containerId, slidesData) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const slidesWrapper = container.querySelector('.slides');
    const arrowLeft = container.querySelector('#slideshow-prev');
    const arrowRight = container.querySelector('#slideshow-next');

    // Insert dynamic slides after the hard-coded first slide
    slidesData.forEach(item => {
        const slide = document.createElement('div');
        slide.classList.add('slide');

        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;

        const title = document.createElement('div');
        title.classList.add('slide-title');
        title.textContent = item.title;

        slide.appendChild(img);
        slide.appendChild(title);

        slidesWrapper.appendChild(slide);
    });

    // Select all slides
    const slides = slidesWrapper.querySelectorAll('.slide');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'flex' : 'none';
        });
    }

    // Initial display
    showSlide(currentIndex);

    // Arrow navigation
    arrowLeft.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    arrowRight.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });
}

createSlideshow("product-slideshow", [
    { title: "City at Night", imageUrl: "https://picsum.photos/id/1015/600/400" },
    { title: "Mountain View", imageUrl: "https://picsum.photos/id/1016/600/400" }
]);


/*Mobile menu toggle*/

let mobileMenuOpen = false;

function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    const mobileMenuDiv = document.getElementById(`mobile-menu`);
    mobileMenuDiv.style.display = mobileMenuOpen ? "flex" : "none";
}

const hamburgerButton = document.getElementById(`hamburger-button`);

hamburgerButton.addEventListener("click", () => {
    toggleMobileMenu();
});
