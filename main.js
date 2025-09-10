
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

function setImages(imgEl, productKey) {
    imgEl.src = Products[productKey];
    imgEl.alt = productKey;
}

createCarousel(Products, "products");
createCarousel(Finished, "finished");