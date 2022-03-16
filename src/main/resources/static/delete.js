function getModalDelete(id) {
    fetch('http://localhost:8080/admin/users/' + id)
        .then(response => response.json())
        .then(user => {

            let adminSelect = "";
            let userSelect = "";

            for (let i = 0; i < user.roles.length; i++) {
                if (user.roles[i].roleName === "ADMIN") {
                    adminSelect = "selected";
                }
                if (user.roles[i].roleName === "USER") {
                    userSelect = "selected";
                }
            }

            let modal = document.getElementById('modalWindow');
            modal.innerHTML =
                '<div id="modalDelete" class="modal fade" tabindex="-1" role="dialog"' +
                '     aria-labelledby="TitleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">' +
                '    <div class="modal-dialog modal-dialog-scrollable">' +
                '        <div class="modal-content">' +
                '            <div class="modal-header">' +
                '                <h5 class="modal-title" id="TitleModalLabel">Delete user</h5>' +
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
                '                               name="id" value="' + user.id + '" disabled >' +
                '                    </p>' +
                '                    <p>' +
                '                        <strong><label for="eUsername">Username: </label></strong>' +
                '                        <input class="form-control" type="text" id="eUsername" ' +
                '                               name="username" value="' + user.username + '"' +
                '                               disabled > ' +
                '                    </p>' +
                '                    <p>' +
                '                        <strong><label for="ePassword">Password: </label></strong>' +
                '                        <input class="form-control" type="password" id="ePassword" ' +
                '                               name="password" value="' + user.password + '"' +
                '                               disabled > ' +
                '                    </p>' +
                '                    <p>' +
                '                        <strong><label for="eName">Name: </label></strong>' +
                '                        <input class="form-control" type="text" id="eName" ' +
                '                               name="name" value="' + user.name + '" ' +
                '                               disabled >' +
                '                    </p>' +
                '                    <p>' +
                '                        <strong><label for="eLastname">Lastname: </label></strong>' +
                '                        <input class="form-control" type="text" id="eLastname" ' +
                '                               name="lastname" value="' + user.lastname + '" ' +
                '                               disabled >' +
                '                    </p>' +
                '                    <p>' +
                '                        <strong><label>Role</label></strong>' +
                '                        <select id="eRoles" name="roles" multiple size="2" ' +
                '                               class="form-control" disabled >' +
                '                            <option value="ROLE_ADMIN" >ADMIN</option>' +
                '                            <option value="ROLE_USER"' + userSelect + ' selected>USER</option>' +
                '                        </select>' +
                '                    </p>' +
                '                </form>' +
                '               </div>' +
                '            </div>' +
                '            <div class="modal-footer">' +
                '                <button type="button" ' +
                '                        class="btn btn-secondary"' +
                '                        data-dismiss="modal">Close</button>' +
                '                <button class="btn btn-danger" ' +
                '                        data-dismiss="modal"' +
                '                        onclick="deleteUser(' + user.id + ')">Delete</button>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</div>';
            $("#modalDelete").modal();
        });
}

function deleteUser(id) {
    fetch('http://localhost:8080/admin/delete/' + id, {
        method: 'DELETE',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(response => {
        $('#' + id).remove();
    });
}