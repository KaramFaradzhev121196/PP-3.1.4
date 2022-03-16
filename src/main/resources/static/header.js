fetch('http://localhost:8080/authUser')
    .then(response => response.json())
    .then(user => {
        document.getElementById("headerName").innerHTML = user.name;
        document.getElementById("headerRoles").innerHTML = 'with roles: ' + getRoleList(user).textContent.replaceAll("ROLE_", "");
    });