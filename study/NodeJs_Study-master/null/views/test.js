window.addEventListener('DOMContentLoad', init)

function init(){

    let hElement = document.querySelector('#h1')

    hElement.addEventListener('click', color)

    function color() {
        hElement.setAttribute('class', 'on')
    }

}