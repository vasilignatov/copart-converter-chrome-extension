
const pathname = window.location.pathname;
// 1. Get the odometer value
// Function to process the odometer value

function handleSitePathname(pathname) {
    if(pathname.includes('/lotSearchResults')) {
        const elements = document.querySelectorAll('.search_result_veh_info_block.text-black.ng-star-inserted>div.p-mb-3>div');
        elements.forEach(el => {
            processOdometerValue(el);
        });
    } else {
        const el = document.querySelector('[data-uname=lotdetailOdometervalue]>span>span');
        processOdometerValue(el);
    } 
}

function processOdometerValue(el) {
    if (el) {
        const text = el.textContent.trim();
        const regex = /(\d*,?\d*).*(\(ACTUAL\)|\(NOT ACTUAL\)|\(EXEMPT\))/mg;

        const m = [...text.matchAll(regex)][0];

        const milesValue = Number(m[1].replace(',', ''));
        const kmValue = parseInt(milesValue * 1.609344);

        const kmValueFormatted = formatNumberWithSpaces(kmValue);

        const odoType = m[2] == '(ACTUAL)' ?
            '(РЕАЛЕН)' :
            m[2] == '(NOT ACTUAL)' ?
                '(НЕ Е РЕАЛЕН)' :
                m[2] == '(EXEMPT)' ?
                    '(Съгласно фед. зак. не се изисква показване)' : '';

        el.textContent = `${kmValueFormatted} km ${odoType} 🇧🇬`;
    } else {
        console.log('Element not found !!!!!!!!!!!!!!');
    }
}

function formatNumberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// MutationObserver configuration
const observerConfig = {
    childList: true, // Watch for changes in the direct children of the target
    subtree: true,   // Watch for changes in the entire subtree of the target
};

// Target node
const targetNode = document.querySelector('.inner-wrap.d-f-c.f-1');

// Create a MutationObserver with a callback function
const observer = new MutationObserver(function (mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Child nodes have been added or removed
            handleSitePathname(pathname);
        }
    }
});

// Start observing the target node for configured mutations
observer.observe(targetNode, observerConfig);

// Initial processing of the odometer value
handleSitePathname(pathname);


