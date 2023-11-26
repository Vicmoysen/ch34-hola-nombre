// Definición de URL
const BASE_URL = "https://reqres.in/api/";
const PATH_USERS = "users?delay=5";

// Función para obtener los datos del servidor 
const getUsers = async ( url  ) => {
    try {
        const response = await fetch(url);
        const users = await response.json();
        saveInLocalStorage(users);
        printInDOM(users);
    } catch (error) {
        console.log(error);
    }
};

// Función para imprimir con API DOM
const printInDOM = (users) => {
    const tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = '';
    
    const table = document.createElement("table");
    const tableHead = document.createElement('thead');
    const tlbBody = document.createElement("tbody");

    // HEADERS DE LA TABLA
    {
    const hileraH = document.createElement("tr");

    const celdaID = document.createElement("th");
    const headerID = document.createTextNode("ID");
    celdaID.appendChild(headerID);
    hileraH.appendChild(celdaID);

    const celdaEmail = document.createElement("th");
    const headerEmail = document.createTextNode("Email");
    celdaEmail.appendChild(headerEmail);
    hileraH.appendChild(celdaEmail);

    const celdaFName = document.createElement("th");
    const headerFName = document.createTextNode("First Name");
    celdaFName.appendChild(headerFName);
    hileraH.appendChild(celdaFName);

    const celdaLName = document.createElement("th");
    const headerLName = document.createTextNode("Last Name");
    celdaLName.appendChild(headerLName);
    hileraH.appendChild(celdaLName);
    
    const celdaAvatar = document.createElement("th");
    const headerAvatar = document.createTextNode("Avatar");
    celdaAvatar.appendChild(headerAvatar);
    hileraH.appendChild(celdaAvatar);
    
    tableHead.appendChild(hileraH);
    table.appendChild(tableHead);
     }
    // FIN HEADERS

    // LLENADO DE DATOS 
    const usersInfo = users.data.map(user => {
            const hilera = document.createElement("tr");
            let celda = document.createElement("td");
            const textID = document.createTextNode(user.id);
            celda.appendChild(textID);
            hilera.appendChild(celda);

            celda = document.createElement("td");
            const textEmail = document.createTextNode(user.email);
            celda.appendChild(textEmail);
            hilera.appendChild(celda);

            celda = document.createElement("td");
            const textFName = document.createTextNode(user.first_name);
            celda.appendChild(textFName);
            hilera.appendChild(celda);

            celda = document.createElement("td");
            const textLName = document.createTextNode(user.last_name);
            celda.appendChild(textLName);
            hilera.appendChild(celda);

            celda = document.createElement("td");
            celda.innerHTML = `<img class="avatar rounded-circle" src="${user.avatar}" />`;
            hilera.appendChild(celda);

            tlbBody.appendChild(hilera);            
    });
    // FIN LLENADO DE DATOS

    table.appendChild(tlbBody);
    tableContainer.appendChild(table);

    table.classList.add("table")
    table.classList.add("table-dark")
    table.classList.add("table-striped")
    table.classList.add("table-hover")
    
}

function saveInLocalStorage(users) {
    localStorage.setItem("usersData", JSON.stringify(users))
    localStorage.setItem("usersDataDate", new Date())
}

function getUsersHTML() {

    const users=  JSON.parse(localStorage.getItem("usersData"));
    const dateLocalStorage = new Date(localStorage.getItem("usersDataDate"));
    const nowDate = new Date().getTime();

    if (users === null || nowDate-dateLocalStorage > 60000) {
         getUsers(BASE_URL + PATH_USERS);
         console.log("Desde el servidor");
    } else {
        printInDOM(users);
        console.log("Desde LocalStorage");
    } 
}