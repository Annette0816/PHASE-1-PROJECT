const baseURL = ("http://localhost:3000/skincare");

document.addEventListener("DOMContentLoaded",() => {
    fetch(baseURL)
    .then(res => res.json)
    .then()
    .catch( error() => {
        
    })
})