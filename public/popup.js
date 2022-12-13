const configPreview = {
    every: 7000,
    length: undefined,
    dots: undefined,
};

let current = -1;
let interval;

function init() {
    clearVal();

    const dots = getDots();
    for( const dot of dots ) {
        dot.addEventListener('click', handleClikckOnDot)
    }

    interval = setInterval(() => {
        if( current >= getLength()-1 ) {
            current = 0;
        } else {
            current++;
        }
    
        moveToPreview(current);
    }, configPreview.every);
}

function getLength() {
    if(!configPreview.length) {
        const dots = getDots();
        const len = Object.values(dots).length;

        configPreview.length = len;
    }

    return configPreview.length;
}

function getDots() {
    if( !configPreview.dots ) {
        const dots = document.querySelectorAll(".dots .dot");
        configPreview.dots = dots;
    }

    return configPreview.dots;
}

function moveToPreview(nextIndex) {
    const groups = document.getElementsByClassName("group");
    const dots = getDots();
    
    Object.values(groups).forEach((group, index) => {
        if( index !== nextIndex ) {
            group.className = group.className.replace("active", "");
            dots[index].className = dots[index].className.replace("active", "");
        } else {
            group.className = (group.className.replace("active", "") + " active").trim();
            dots[index].className = (dots[index].className.replace("active", "") + " active").trim();
        }
    });
}

function handleClikckOnDot(e) {
    const index = Number(e.target.getAttribute('data-index') ?? 0);
    
    clearVal();
    moveToPreview(index);

    const image = document.querySelectorAll('.group')[index].querySelector('img');
    startOverGif(image);
}

function startOverGif(image) {
    const newImage = new Image();
    newImage.setAttribute('src', image.src);
    newImage.setAttribute('class', image.className);

    const parent = image.parentNode;
    parent.replaceChild(newImage, image)
}

function clearVal() {
    if( interval ) {
        clearInterval(interval);
    }

    interval = undefined;
}

init();