function changeName() {
    const name = prompt("¿Cuál es tu nombre?");
    const refName = getReferenceName();
    refName.innerHTML = name;    
}

function getReferenceName() {
    return document.getElementById("name");
}

