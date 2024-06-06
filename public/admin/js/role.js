// Permissions
const tablePermissions = document.querySelector("[table-permissions]")

if(tablePermissions){
    const buttonSubmit = document.querySelector("[button-submit]")

    buttonSubmit.addEventListener('click',() => {
        let permissions = [];

        const rows = tablePermissions.querySelectorAll("[data-name]")
        rows.forEach((row) => {
            const name = row.getAttribute("data-name")
            const inputs = row.querySelectorAll("input")


            if(name == "id"){
                inputs.forEach((input) => {
                    permissions.push({
                        id : input.value,
                        permissions : [],
                    })
                } )
            } else {
                inputs.forEach((input , index) => {
                    const checked = input.checked
                    if(checked) permissions[index].permissions.push(name);
                })
            }
        })
        // Gửi cho Backend
        // console.log(permissions)
        if(permissions.length){
            const formchangePermissions = document.querySelector("#form-change-permission")
            const inputPermissions = formchangePermissions.querySelector("input[name = 'permissions']")

            inputPermissions.value = JSON.stringify(permissions);
            formchangePermissions.submit();
        }
    })
}

// Permissions Data Default

const dataRecord = document.querySelector("[data-records]")
if(dataRecord){
    const records = JSON.parse(dataRecord.getAttribute("data-records"))
    const tablePermissions = document.querySelector("[table-permissions]")

    records.forEach((record , index)  => {
        const permissions = record.permissions;

        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`[data-name = "${permission}"]`)
            const input = row.querySelectorAll("input")[index];
            
            input.checked = true;
        })
    })
}

//! Delete product
const buttonDelete = document.querySelectorAll("[button-delete]") // lấy ra thuộc tính tự định nghĩa
if(buttonDelete.length > 0){
    const formDelete = document.querySelector("#form-delete-item"); // lấy ra thuộc tính id #
    const path = formDelete.getAttribute("data-path");  // lấy giá trị của thuộc tính

    buttonDelete.forEach(button =>{
        button.addEventListener('click', () => {
            const isConfirm = confirm("Are you sure you want to delete this Role?");
            if(isConfirm){
                const id = button.getAttribute("data-id");

                const action = `${path}/${id}?_method=DELETE`;
                formDelete.action = action;
                formDelete.submit();
            }
        })
    })
}