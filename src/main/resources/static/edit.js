function getModalEdit(id) {
    fetch('http://localhost:8080/admin/users/' + id)
        .then(response => response.json())
        .then(user => {
            let adminSelect = "";
            let userSelect = "";

            for (let i = 0; i < user.roles.length; i++) {
                if (user.roles[i].roles === "ROLE_ADMIN") {
                    adminSelect = "selected";
                }
                if (user.roles[i].roles === "ROLE_USER") {
                    userSelect = "selected";
                }
            }

            let modal = document.getElementById('modalWindow');
            modal.innerHTML =
                '<div id="modalEdit" class="modal fade" tabindex="-1" role="dialog"' +
                '     aria-labelledby="TitleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">' +
                '    <div class="modal-dialog">' +
                '        <div class="modal-content">' +

                '            <div class="modal-header">' +
                '                <h6 class="modal-title" id="TitleModalLabel">Edit user</h6>' +
                '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '                    <span aria-hidden="true">&times;</span>' +
                '                </button>' +
                '            </div>' +

                '            <div class="modal-body">' +
                '               <div class="form-group row justify-content-center align-items-center">' +
                '                <form id="formEditUser" class="form-signin mx-auto font-weight-bold text-center">' +
                '                    <p>' +
                '                        <strong><label for="eId">ID: </label></strong>' +
                '                        <input class="form-control" type="text" id="eId" ' +
                '                               name="id" value="' + user.id + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <strong><label for="eUsername">Username: </label></strong>' +
                '                        <input class="form-control" type="text" id="eUsername" ' +
                '                               name="username" value="' + user.username + '"' +
                '                               placeholder="Username" aria-describedby="nameHelpInline" ' +
                '                               autofocus required> ' +
                '                    </p>' +
                '                    <p>' +
                '                        <strong><label for="ePassword">Password: </label></strong>' +
                '                        <input class="form-control" type="password" id="ePassword" ' +
                '                               name="password" value="' + user.password + '"' +
                '                               placeholder="Password" > ' +
                '                    </p>' +
                '                    <p>' +
                '                        <strong><label for="eName">Name: </label></strong>' +
                '                        <input class="form-control" type="text" id="eName" ' +
                '                               name="name" value="' + user.name + '" ' +
                '                               placeholder="Name" autofocus required>' +
                '                    </p>' +
                '                    <p>' +
                '                        <strong><label for="eLastname">Lastname: </label></strong>' +
                '                        <input class="form-control" type="text" id="eLastname" ' +
                '                               name="lastname" value="' + user.lastname + '" ' +
                '                               placeholder="Lastname" autofocus required>' +
                '                    </p>' +
                '                    <p>' +
                '                        <strong><label>Role</label></strong>' +
                '                        <select id="eRoles" name="roles" multiple size="2" ' +
                '                               class="form-control" required>' +
                '                            <option value="ROLE_ADMIN" >ADMIN</option>' +
                '                            <option value="ROLE_USER"' + userSelect + ' selected>USER</option>' +
                '                        </select>' +
                '                    </p>' +
                '                </form>' +
                '               </div>' +
                '            </div>' +

                '            <div class="modal-footer">' +
                '                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                '                <button class="btn btn-primary" data-dismiss="modal" onclick="editUser()">Edit</button>' +
                '            </div>' +

                '        </div>' +
                '    </div>' +
                '</div>';
            $("#modalEdit").modal();
        });
}

function editUser() {
    let form = window.formEditUser.eRoles;
    let id = window.formEditUser.eId.value;
    let newRoles = [];
    let rolesList = document.createElement('ul');

    for (let i = 0; i < form.length; i++) {
        let option = form.options[i];
        if (option.selected) {
            newRoles.push(option.value)
        }
    }

    fetch('http://localhost:8080/admin/update?currentRoles=' + newRoles, {
        method: 'PATCH',
        body: JSON.stringify({
            id: window.formEditUser.eId.value,
            username: window.formEditUser.eUsername.value,
            password: window.formEditUser.ePassword.value,
            name: window.formEditUser.eName.value,
            lastname: window.formEditUser.eLastname.value,
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => {
            window.getAllUsers()

            $('#' + id).replaceWith('<tr id=' + id + '>' +
                '<td>' + id + '</td>' +
                '<td>' + window.formEditUser.eUsername.value + '</td>' +
                '<td>' + window.formEditUser.eName.value + '</td>' +
                '<td>' + window.formEditUser.eLastname.value + '</td>' +
                '<td>' + rolesList.textContent + '</td>' +
                '<td> <button type="button" onclick="getModalEdit(' + id + ')" ' +
                'class="btn btn-info">Edit</button> </td>' +
                '<td> <button type="button" onclick="getModalDelete(' + id + ')" ' +
                'class="btn btn-danger">Delete</button> </td>' +
                '</tr>');
        });
}