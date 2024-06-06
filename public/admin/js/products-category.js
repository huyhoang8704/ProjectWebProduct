//! Delete products-category
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