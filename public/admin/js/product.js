//! Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    //alert("Please select")
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");
            const id =            button.getAttribute("data-id");

            let statusChange = statusCurrent == "active" ? "inactive" : "active";
            
            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    });
}

//! Delete product
const buttonDelete = document.querySelectorAll("[button-delete]") // lấy ra thuộc tính tự định nghĩa
if(buttonDelete.length > 0){
    const formDelete = document.querySelector("#form-delete-item"); // lấy ra thuộc tính id #
    const path = formDelete.getAttribute("data-path");  // lấy giá trị của thuộc tính

    buttonDelete.forEach(button =>{
        button.addEventListener('click', () => {
            const isConfirm = confirm("Are you sure you want to delete this product?");
            if(isConfirm){
                const id = button.getAttribute("data-id");

                const action = `${path}/${id}?_method=DELETE`;
                formDelete.action = action;
                formDelete.submit();
            }
        })
    })
}