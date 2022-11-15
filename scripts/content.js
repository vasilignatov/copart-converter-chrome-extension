
// if (window.location.pathname == '/vehicleFinderSearch') {

//   

// } else if (window.location.pathname.includes('lot')) {

// }
setTimeout(() =>{

    const el = document.querySelector('[data-uname=lotdetailOdometervalue]>p');

    if (el) {
        const text = el.textContent.trim();
        const regex = /(\d*,?\d*).*(\(ACTUAL\)|\(NOT ACTUAL\)|\(EXEMPT\))/mg;
        
        const m = [...text.matchAll(regex)][0];
        
        const milesValue = Number(m[1].replace(',', ''));
        const kmValue = parseInt(milesValue * 1.609344);
        
        const odoType = m[2] == '(ACTUAL)' ?
        '(РЕАЛЕН)' :
        m[2] == '(NOT ACTUAL)' ?
        '(НЕ Е РЕАЛЕН)' :
        m[2] == '(EXEMPT)' ?
        '(Съгласно фед. зак. не се изисква показвание)' : '';
        
        el.textContent = `${kmValue} km ${odoType} 🇧🇬`;
    } else {
        alert('ERROR');
    }
}, 3500);
    

