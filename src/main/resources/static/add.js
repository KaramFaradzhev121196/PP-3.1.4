function addNewUser() {
    let form = window.formNewUser.nRoles;
    let newUserRoles = [];
    let rolesList = document.createElement('ul');

    for (let i = 0; i < form.length; i++) {
        let option = form.options[i];
        if (option.selected) {
            newUserRoles.push(option.value);
        }
    }

    fetch('http://localhost:8080/admin/create?newRoles=' + newUserRoles, {
        method: 'POST',
        body: JSON.stringify({
            username: window.formNewUser.nUsername.value,
            password: window.formNewUser.nPassword.value,
            name: window.formNewUser.nName.value,
            lastname: window.formNewUser.nLastname.value,
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(user => {
            window.getAllUsers();

            $(`#tBody tr:last`).after(`<tr id=` + user.id + `>` +
                `<td>` + user.id + `</td>` +
                `<td>` + window.formNewUser.nUsername.value + `</td>` +
                `<td>` + window.formNewUser.nName.value + `</td>` +
                `<td>` + window.formNewUser.nLastname.value + `</td>` +
                `<td>` + rolesList.textContent + `</td>` +
                `<td> <button type="button" onclick="getModalEdit(` + user.id + `)" ` +
                `class="btn btn-info">Edit</button> </td>` +
                `<td> <button type="button" onclick="getModalDelete(` + user.id + `)" ` +
                `class="btn btn-danger">Delete</button> </td>` +
                `</tr>`);

            window.formNewUser.nUsername.value = "";
            window.formNewUser.nPassword.value = "";
            window.formNewUser.nName.value = "";
            window.formNewUser.nLastname.value = "";
            window.formNewUser.nRoles.value = "";

            const users_table = document.getElementById("usersTab");
            const new_user = document.getElementById("newUser");
            new_user.classList.remove("active");
            users_table.classList.add("active");

            const users_table_main = document.getElementById("users_table");
            const new_user_main = document.getElementById("new_user");
            new_user_main.classList.remove("active", "show");
            users_table_main.classList.add("active", "show");
        });
}