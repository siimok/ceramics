
// Image paths are relative to the site base (vite.config.js `base`).
const BASE = import.meta.env.BASE_URL;

const Products = {
    "Kantkoba": "products/kantkoba.png",
    "Külg": "products/kulg.png",
    "Ümarnurk": "products/umarnurk.png",
    "Kantnurk": "products/kantnurk.png",
    "Karniis": "products/karniis.png",
    "Keraamiline tahmatops": "products/keraamiline-tahmatops.jpg",
    "Sokkel": "products/sokkel.png",
};

const Finished = {
    "Lihtpotist ahi 1": "finished/lihv-ahi.jpg",
    "Lihtpotist ahi 2": "finished/lihv-ahi2.jpg",
    "Valgest glasuurahjupotist ahi 1": "finished/valge-ahi.jpg",
    "Valgest glasuurahjupotist ahi 2": "finished/valge-ahi-2.jpg",
    "Valgest glasuurahjupotist pliit": "finished/valge-pliit.jpg",
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
            imgEl.src = BASE + dataObj[key];
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


// altPrefix describes what the photo shows; title (caption) is shown under the image.
function createSlideshow(containerId, altPrefix, slidesData) {
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
        img.dataset.src = BASE + item.imageUrl;  // loaded when the slide is shown
        img.alt = [altPrefix, item.title].filter(Boolean).join(". ");

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

    function loadImage(index) {
        const img = slides[index].querySelector('img');
        if (img && img.dataset.src) {
            img.src = img.dataset.src;
            delete img.dataset.src;
        }
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'flex' : 'none';
        });
        // Load the shown image, plus its neighbours so the next click is instant
        loadImage(index);
        loadImage(fitInRange(index + 1, slides.length - 1));
        loadImage(fitInRange(index - 1, slides.length - 1));
    }

    function go(step) {
        currentIndex = fitInRange(currentIndex + step, slides.length - 1);
        showSlide(currentIndex);
    }

    // Initial display
    showSlide(currentIndex);

    // Arrow navigation
    arrowLeft.addEventListener('click', () => go(-1));
    arrowRight.addEventListener('click', () => go(1));

    // Swipe navigation on touch screens
    let touchStartX = null;
    let touchStartY = null;
    slidesWrapper.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
        touchStartY = event.changedTouches[0].clientY;
    }, { passive: true });
    slidesWrapper.addEventListener('touchend', (event) => {
        if (touchStartX === null) return;
        const dx = event.changedTouches[0].clientX - touchStartX;
        const dy = event.changedTouches[0].clientY - touchStartY;
        touchStartX = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
            go(dx < 0 ? 1 : -1);
        }
    });
}

createSlideshow("product-slideshow", "", [
    { title: "Kantkoba", imageUrl: "products/kantkoba.png" },
    { title: "Ümarnurk", imageUrl: "products/umarnurk.png" },
    { title: "Kantnurk", imageUrl: "products/kantnurk.png" },
    { title: "Karniis", imageUrl: "products/karniis.png" },
    { title: "Keraamiline tahmatops", imageUrl: "products/keraamiline-tahmatops.jpg" },
    { title: "Sokkel", imageUrl: "products/sokkel.png" },
]);

createSlideshow("with-images-slideshow", "Piltidega ahjupott", [
    { title: "Lilleline muster", imageUrl: "with-images/lilled.jpg" },
    { title: "Vein ja viinamarjad", imageUrl: "with-images/korv.jpg" },
    { title: "Viljapead", imageUrl: "with-images/viljapea.jpg" },
    { title: "Suurtihane", imageUrl: "with-images/lind.jpg" },
    { title: "Linnud ja õunad", imageUrl: "with-images/lind2.jpg" },
    { title: "Kaks roosi", imageUrl: "with-images/lilled2.jpg" },
    { title: "Kibuvits", imageUrl: "with-images/lilled3.jpg" },
    { title: "Ingel (Poiss)", imageUrl: "with-images/mutoloogia.jpg" },
    { title: "Ingel (Tüdruk)", imageUrl: "with-images/mutoloogia2.jpg" },
    { title: "Veski 1", imageUrl: "with-images/veski.jpg" },
    { title: "Veski 2", imageUrl: "with-images/veski2.jpg" },
    { title: "Veski 3", imageUrl: "with-images/veski3.jpg" },
    { title: "Veski 4", imageUrl: "with-images/veski4.jpg" },
    { title: "Hobused 1", imageUrl: "with-images/hobused.jpg" },
    { title: "Hobused 2", imageUrl: "with-images/hobused2.jpg" },
    { title: "Hobused 3", imageUrl: "with-images/hobused3.jpg" },
    { title: "Väike sinine kimp", imageUrl: "with-images/lilled4.jpg" },
    { title: "Suured sinised lilled", imageUrl: "with-images/lilled5.jpg" },
]);


createSlideshow("glazed-slideshow", "Glasuurpottidest ahi", [
    { title: "Pottsepp Disainikütteseadmed OÜ.", imageUrl: "glazed/27.jpg" },
    { title: "", imageUrl: "glazed/6.jpg" },
    { title: "Pottsepp O. Toom.", imageUrl: "glazed/7.jpg" },
    { title: "Pottsepp O. Toom.", imageUrl: "glazed/8.jpg" },
    { title: "Pottsepp M. Väljamäe.", imageUrl: "glazed/10.jpeg" },
    { title: "Pottsepp M. Väljamäe.", imageUrl: "glazed/12.jpg" },
    { title: "Pottsepp Tarmo.", imageUrl: "glazed/G1.jpg" },
    { title: "", imageUrl: "glazed/G2.jpg" },
    { title: "Pottsepp M. Väljamäe.", imageUrl: "glazed/15.jpg" },
    { title: "Pottsepp M. Väljamäe.", imageUrl: "glazed/16.jpg" },
    { title: "Pottsepp M. Väljamäe.", imageUrl: "glazed/18.jpg" },
    { title: "Pottsepp M. Väljamäe.", imageUrl: "glazed/19.jpg" },
    { title: "Pottsepp M. Väljamäe.", imageUrl: "glazed/20.jpg" },
    { title: "Pottsepp M. Väljamäe.", imageUrl: "glazed/21.jpg" },
    { title: "Pottsepp M. Ollino.", imageUrl: "glazed/22.jpg" },
    { title: "", imageUrl: "glazed/23.jpg" },
    { title: "", imageUrl: "glazed/45.jpg" },
    { title: "Pottsepp M. Väljamäe.", imageUrl: "glazed/25.jpg" },
    { title: "Pottsepp T. Pajusalu.", imageUrl: "glazed/34.jpg" },
    { title: "Pottsepp M. Väljamäe.", imageUrl: "glazed/28.jpg" },
    { title: "Pottsepp M. Väljamäe.", imageUrl: "glazed/30.jpg" },
    { title: "Pottsepp M. Väljamäe.", imageUrl: "glazed/32.jpg" },
    { title: "Pottsepp M. Ollino.", imageUrl: "glazed/33.jpg" },
    { title: "Pottsepp E. Tisler.", imageUrl: "glazed/G3.jpg" },
    { title: "Pottsepp M. Ollino.", imageUrl: "glazed/35.jpg" },
    { title: "Pottsepp P. Rannala.", imageUrl: "glazed/G4.jpg" },
    { title: "Pottsepp T. Aedviir.", imageUrl: "glazed/37.jpg" },
    { title: "Pottsepp Lugu.", imageUrl: "glazed/38.jpg" },
    { title: "Pottsepp T. Pajusalu.", imageUrl: "glazed/39.jpg" },
    { title: "", imageUrl: "glazed/1.jpg" },
    { title: "Pottsepp Leease OÜ.", imageUrl: "glazed/41.jpg" },
    { title: "Pottsepp T. Pajusalu.", imageUrl: "glazed/42.jpg" },
    { title: "Pottsepp Leease OÜ.", imageUrl: "glazed/43.jpg" },
    { title: "", imageUrl: "glazed/44.jpg" },
    { title: "Pottsepp H. Huberg.", imageUrl: "glazed/G5.jpg" },
    { title: "Pottsepp Rene.", imageUrl: "glazed/A1.jpg" },
    { title: "Pottsepp Tarmo.", imageUrl: "glazed/A2.jpg" },
    { title: "Pottsepp Fred Olop.", imageUrl: "glazed/A3.jpg" },
    { title: "Pottsepp T. Aedviir.", imageUrl: "glazed/A4.jpg" },
    { title: "Pottsepp T. Aedviir.", imageUrl: "glazed/A5.jpg" },
    { title: "Pottsepp T. Aedviir.", imageUrl: "glazed/A6.jpg" },
    { title: "Pottsepp Kodusoe OÜ.", imageUrl: "glazed/A7.jpg" },
    { title: "Pottsepp Kodusoe OÜ.", imageUrl: "glazed/A8.jpg" },
    { title: "Pottsepp Kodusoe OÜ.", imageUrl: "glazed/A9.jpg" },
    { title: "Pottsepp Leease OÜ.", imageUrl: "glazed/A10.jpg" },
    { title: "Pottsepp M. Ollino.", imageUrl: "glazed/A14.jpg" },
    { title: "", imageUrl: "glazed/48.jpg" },
    { title: "", imageUrl: "glazed/49.jpg" },
    { title: "Pottsepp Leease OÜ.", imageUrl: "glazed/50.jpg" },
    { title: "Pottsepp Leease OÜ.", imageUrl: "glazed/52.jpg" },
    { title: "Pottsepp Leease OÜ.", imageUrl: "glazed/53.jpg" },
    { title: "Pottsepp Leease OÜ.", imageUrl: "glazed/54.jpg" },
    { title: "Pottsepp Leease OÜ.", imageUrl: "glazed/55.jpg" },
    { title: "Pottsepp Timo Sepp.", imageUrl: "glazed/60.jpg" },
    { title: "Pottsepp Sergio ahi OÜ.", imageUrl: "glazed/GLA2.jpg" },
]);


createSlideshow("unglazed-slideshow", "Lihtpottidest ahi", [
    { title: "Pottsepp M. Väljamäe.", imageUrl: "unglazed/L2.jpg" },
    { title: "Pottsepp M. Väljamäe.", imageUrl: "unglazed/L3.jpg" },
    { title: "", imageUrl: "unglazed/L4.jpg" },
    { title: "Pottsepp M. Väljamäe.", imageUrl: "unglazed/L5.jpg" },
    { title: "Pottsepp M. Ollino.", imageUrl: "unglazed/L6.jpg" },
    { title: "Pottsepp Lõõritaja OÜ.", imageUrl: "unglazed/L7.jpg" },
    { title: "Pottsepp T. Pajusalu.", imageUrl: "unglazed/L8.jpg" },
    { title: "Pottsepp Disainikütteseadmed OÜ.", imageUrl: "unglazed/L9.jpg" },
    { title: "Pottsepp Fred Olop.", imageUrl: "unglazed/L10.jpg" },
    { title: "Pottsepp Kodusoe OÜ.", imageUrl: "unglazed/L11.jpg" },
    { title: "Pottsepp Kodusoe OÜ.", imageUrl: "unglazed/L12.jpg" },
    { title: "Pottsepp Kodusoe OÜ.", imageUrl: "unglazed/L13.jpg" },
    { title: "Pottsepp Leease OÜ.", imageUrl: "unglazed/L14.jpg" },
    { title: "Pottsepp T. Aedviir.", imageUrl: "unglazed/Z4.jpg" },
]);

createSlideshow("stove-slideshow", "Ahjupottidest pliit", [
    { title: "", imageUrl: "stove/PL7.jpg" },
    { title: "Pottsepp Leease OÜ.", imageUrl: "stove/PL12.jpg" },
    { title: "", imageUrl: "stove/PL10.jpg" },
    { title: "", imageUrl: "stove/PL11.jpg" },
    { title: "", imageUrl: "stove/PL8.jpg" },
    { title: "Pottsepp Leease OÜ.", imageUrl: "stove/PL2.jpg" },
    { title: "", imageUrl: "stove/PL3.jpg" },
    { title: "", imageUrl: "stove/PL9.jpg" },
    { title: "Pottsepp R. Lepik.", imageUrl: "stove/PL4.jpg" },
    { title: "Pottsepp Leease OÜ.", imageUrl: "stove/PL5.jpg" },
    { title: "Pottsepp Lõõritaja OÜ.", imageUrl: "stove/PL13.jpg" },
    { title: "", imageUrl: "stove/PL14.jpg" },
    { title: "", imageUrl: "stove/PL1.jpg" },
    { title: "Pottsepp T. Aedviir.", imageUrl: "stove/L14.jpg" },
    { title: "Pottsepp Disainikütteseadmed OÜ.", imageUrl: "stove/P16.jpg" },
    { title: "Pottsepp Disainikütteseadmed OÜ.", imageUrl: "stove/UUSPL1.jpg" },
    { title: "Pottsepp Leease OÜ.", imageUrl: "stove/P18.jpg" },
    { title: "Pottsepp Timo Sepp.", imageUrl: "stove/PL19.jpg" },
    { title: "", imageUrl: "stove/UUSPL3.jpg" },
    { title: "Pottsepp Leease OÜ.", imageUrl: "stove/Z1.jpg" },
    { title: "", imageUrl: "stove/Z2.jpg" },
    { title: "", imageUrl: "stove/Z3.jpg" },
]);

/*Mobile menu toggle*/

const hamburgerButton = document.getElementById("hamburger-button");
const mobileMenu = document.getElementById("mobile-menu");

hamburgerButton.addEventListener("click", () => {
    const open = hamburgerButton.getAttribute("aria-expanded") !== "true";
    hamburgerButton.setAttribute("aria-expanded", String(open));
    mobileMenu.style.display = open ? "flex" : "none";
});
