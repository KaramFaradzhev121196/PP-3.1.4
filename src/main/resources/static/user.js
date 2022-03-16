let infoTable = document.getElementById("infoTable");

fetch('http://localhost:8080/authUser')
    .then(response => response.json())
    .then(user => {
        infoTable.innerHTML = "";
        let row = infoTable.insertRow(0);
        let cell0 = row.insertCell(0);
        cell0.innerHTML = user.id;
        let cell1 = row.insertCell(1);
        cell1.innerHTML = user.username;
        let cell11 = row.insertCell(2);
        cell11.innerHTML = user.name;
        let cell2 = row.insertCell(3);
        cell2.innerHTML = user.lastname;
        let cell5 = row.insertCell(5);
        cell5.innerHTML = getRoleList(user).textContent.replaceAll("ROLE_", "");
    });