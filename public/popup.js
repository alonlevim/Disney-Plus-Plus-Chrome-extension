const configPreview = {
    every: 7000,
    length: undefined,
    dots: undefined,
};

const LANGUAGE = "language";

let lang = "en";
let current = -1;
let interval;

function init() {
    translation();
    setDir();
    clearVal();

    if( document.getElementsByClassName("group")?.[0] ) {
        document.getElementsByClassName("group")[0].className += " active";
    }

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

const en = {
    "WHAT_THE_BENEFITES_OF_THIS_EXTENTION": "What the benefites of this extention?",
    "SHOW_TRAILERS_ON_HEADER": "Show Trailers on Header",
    "SHOW_TRAILER_ON_CARD": "Show Trailer on Card",
    "DOUBLE_CLICK_FOR_FULL_SCREEN": "Double click for Full Screen",
    "SETTINGS": "Settings",
    "DISNEY_PLUS_PLUS_EXTENSION": "Disney Plus Plus Extension",
};
const ar = {
    "WHAT_THE_BENEFITES_OF_THIS_EXTENTION": "ما فوائد هذا التمديد؟",
    "SHOW_TRAILERS_ON_HEADER": "إظهار المقطورات في الرأس",
    "SHOW_TRAILER_ON_CARD": "إظهار المقطع الدعائي على البطاقة",
    "DOUBLE_CLICK_FOR_FULL_SCREEN": "انقر نقرًا مزدوجًا للحصول على شاشة كاملة",
    "SETTINGS": "إعدادات",
    "DISNEY_PLUS_PLUS_EXTENSION": "امتداد ديزني بلس بلس",
};
const he = {
    "WHAT_THE_BENEFITES_OF_THIS_EXTENTION": "מה היתרונות של הרחבה זו?",
    "SHOW_TRAILERS_ON_HEADER": "הצג טריילרים בכותרת",
    "SHOW_TRAILER_ON_CARD": "הצג טריילר בכרטיס",
    "DOUBLE_CLICK_FOR_FULL_SCREEN": "לחיצה פעמיים למסך מלא",
    "SETTINGS": "הגדרות",
    "DISNEY_PLUS_PLUS_EXTENSION": "דיסני פלוס פלוס הרחבה",
};

const dir = {
    en: "ltr",
    ar: "rtl",
    he: "rtl",
};

function translate(word) {
    switch(lang) {
        case "ar":
            return ar?.[word] ?? word;
        case "he":
            return he?.[word] ?? word;
        case "en":
        default:
            return en?.[word] ?? word;
    }
}

function translation() {
    document.querySelector(".extenstion-title").innerText = translate("DISNEY_PLUS_PLUS_EXTENSION");

    document.getElementById("benefites-title").innerText = translate("WHAT_THE_BENEFITES_OF_THIS_EXTENTION");
    document.getElementById("group-1-title").innerText = translate("SHOW_TRAILERS_ON_HEADER");
    document.getElementById("group-2-title").innerText = translate("SHOW_TRAILER_ON_CARD");
    document.getElementById("group-3-title").innerText = translate("DOUBLE_CLICK_FOR_FULL_SCREEN");

    document.querySelector(".settings").setAttribute("title", translate("SETTINGS"));
}

function setDir() {
    if( dir[lang] ) {
        document.body.setAttribute("dir", dir[lang]);
    }
}

// eslint-disable-next-line no-undef
chrome?.storage?.sync?.get([LANGUAGE])
    .then((data) => {
        // eslint-disable-next-line no-undef
        if( typeof data?.[LANGUAGE] === "string" && data[LANGUAGE].length ) {
            // eslint-disable-next-line no-undef
            lang = data[LANGUAGE].length > 2 ? data[LANGUAGE].substring(0, 2) : data[LANGUAGE];
        }
        init();
    });
