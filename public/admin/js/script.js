//! Button status
const buttonStatus = document.querySelectorAll("[button-status]")
if(buttonStatus.length > 0) {
    let url = new URL(window.location.href); // phân tích href


    buttonStatus.forEach(button  => {
        // console.log(button)  // 3 cái  button trong html
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status") // value of button-status
            console.log(status)
            // gán lên link
            if(status){
                url.searchParams.set("status", status)
            }
            else {
                url.searchParams.delete("status")
            }
            //console.log(url.href) // link
            window.location.href = url.href

        })
    })
}

//! Form Search
const formSearch = document.querySelector("#form-search")  //! id
if (formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        //console.log(event.target.elements.keyword.value)  // lấy ra value vừa nhập vào
        const keyword = event.target.elements.keyword.value
        if(keyword){
            url.searchParams.set("keyword", keyword)
        }
        else {
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href

    })
}
