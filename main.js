
const Products = {
    "Kantkoba": "/ceramics/products/kantkoba.png",
    "Külg": "/ceramics/products/kulg.png",
    "Ümarnurk": "/ceramics/products/umarnurk.png",
    "Kantnurk": "/ceramics/products/kantnurk.png",
    "Karniis": "/ceramics/products/karniis.png",
    "Keraamiline tahmatops": "/ceramics/products/keraamiline-tahmatops.jpg",
    "Sokkel": "/ceramics/products/sokkel.png",
};

const Finished = {
    "Lihtpotist ahi 1": "/ceramics/finished/lihv-ahi.jpg",
    "Lihtpotist ahi 2": "/ceramics/finished/lihv-ahi2.jpg",
    "Valgest glasuurahjupotist ahi 1": "/ceramics/finished/valge-ahi.jpg",
    "Valgest glasuurahjupotist ahi 2": "/ceramics/finished/valge-ahi-2.jpg",
    "Valgest glasuurahjupotist pliit": "/ceramics/finished/valge-pliit.jpg",
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
    const arrowLeft = container.querySelector('.slideshow-prev');
    const arrowRight = container.querySelector('.slideshow-next');

    // Insert dynamic slides after the hard-coded first slide
    slidesData.forEach(item => {
        const slide = document.createElement('div');
        slide.classList.add('slide');

        const img = document.createElement('img');
        img.dataset.src = item.imageUrl;  // ← data-src, not src
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
        // Load image only when shown
        const img = slides[index].querySelector('img');
        if (img && img.dataset.src) {
            img.src = img.dataset.src;
            delete img.dataset.src;
        }
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
    { title: "Kantkoba", imageUrl: "/ceramics/products/kantkoba.png" },
    { title: "Ümarnurk", imageUrl: "/ceramics/products/umarnurk.png" },
    { title: "Kantnurk", imageUrl: "/ceramics/products/kantnurk.png" },
    { title: "Karniis", imageUrl: "/ceramics/products/karniis.png" },
    { title: "Keraamiline tahmatops", imageUrl: "/ceramics/products/keraamiline-tahmatops.jpg" },
    { title: "Sokkel", imageUrl: "/ceramics/products/sokkel.png" },
]);

createSlideshow("with-images-slideshow", [
    { title: "Hobused", imageUrl: "/ceramics/with-images/hobused2.jpg" },
    { title: "Hobused", imageUrl: "/ceramics/with-images/hobused3.jpg" },
    { title: "Korv", imageUrl: "/ceramics/with-images/korv.jpg" },
    { title: "Lilled", imageUrl: "/ceramics/with-images/lilled.jpg" },
    { title: "Lilled", imageUrl: "/ceramics/with-images/lilled2.jpg" },
    { title: "Lilled", imageUrl: "/ceramics/with-images/lilled3.jpg" },
    { title: "Lilled", imageUrl: "/ceramics/with-images/lilled4.jpg" },
    { title: "Lilled", imageUrl: "/ceramics/with-images/lilled5.jpg" },
    { title: "Lind", imageUrl: "/ceramics/with-images/lind.jpg" },
    { title: "Lind", imageUrl: "/ceramics/with-images/lind2.jpg" },
    { title: "Lind", imageUrl: "/ceramics/with-images/lind3.jpg" },
    { title: "Mütoloogia", imageUrl: "/ceramics/with-images/mutoloogia.jpg" },
    { title: "Mütoloogia", imageUrl: "/ceramics/with-images/mutoloogia2.jpg" },
    { title: "Veski", imageUrl: "/ceramics/with-images/veski.jpg" },
    { title: "Veski", imageUrl: "/ceramics/with-images/veski2.jpg" },
    { title: "Veski", imageUrl: "/ceramics/with-images/veski3.jpg" },
    { title: "Veski", imageUrl: "/ceramics/with-images/veski4.jpg" },
    { title: "Viljapea", imageUrl: "/ceramics/with-images/viljapea.jpg" },
]);


createSlideshow("glazed-slideshow", [
    { title: "", imageUrl: "/ceramics/glazed/6.jpg" },
    { title: "", imageUrl: "/ceramics/glazed/7.jpg" },
    { title: "", imageUrl: "/ceramics/glazed/8.jpg" },
    { title: "", imageUrl: "/ceramics/glazed/10.jpeg" },
    { title: "", imageUrl: "/ceramics/glazed/12.jpg" },
    { title: "", imageUrl: "/ceramics/glazed/15.jpg" },
    { title: "", imageUrl: "/ceramics/glazed/16.jpg" },
    { title: "", imageUrl: "/ceramics/glazed/18.jpg" },
    { title: "", imageUrl: "/ceramics/glazed/19.jpg" },
    { title: "", imageUrl: "/ceramics/glazed/20.jpg" },
    { title: "", imageUrl: "/ceramics/glazed/21.jpg" },
    { title: "", imageUrl: "/ceramics/glazed/27.jpg" },
    { title: "", imageUrl: "/ceramics/glazed/40.jpg" },
    { title: "", imageUrl: "/ceramics/glazed/G1.jpg" },
    { title: "", imageUrl: "/ceramics/glazed/G2.jpg" },
]);


createSlideshow("unglazed-slideshow", [
    { title: "", imageUrl: "/ceramics/unglazed/L1.jpg" },
    { title: "", imageUrl: "/ceramics/unglazed/L2.jpg" },
    { title: "", imageUrl: "/ceramics/unglazed/L3.jpg" },
    { title: "", imageUrl: "/ceramics/unglazed/L4.jpg" },
    { title: "", imageUrl: "/ceramics/unglazed/L5.jpg" },
    { title: "", imageUrl: "/ceramics/unglazed/L6.jpg" },
    { title: "", imageUrl: "/ceramics/unglazed/L7.jpg" },
    { title: "", imageUrl: "/ceramics/unglazed/L8.jpg" },
    { title: "", imageUrl: "/ceramics/unglazed/L9.jpg" },
    { title: "", imageUrl: "/ceramics/unglazed/L10.jpg" },
]);

createSlideshow("stove-slideshow", [
    { title: "", imageUrl: "/ceramics/stove/PL2.jpg" },
    { title: "", imageUrl: "/ceramics/stove/PL7.jpg" },
    { title: "", imageUrl: "/ceramics/stove/PL8.jpg" },
    { title: "", imageUrl: "/ceramics/stove/PL10.jpg" },
    { title: "", imageUrl: "/ceramics/stove/PL11.jpg" },
    { title: "", imageUrl: "/ceramics/stove/PL12.jpg" },
    { title: "", imageUrl: "/ceramics/stove/PL15.jpg" },
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
