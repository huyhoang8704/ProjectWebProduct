//! Button status
const buttonStatus = document.querySelectorAll("[button-status]") // lấy ra 5 thẻ html có atttribute là button-status
if(buttonStatus.length > 0) {
    let url = new URL(window.location.href); // phân tích href


    buttonStatus.forEach(button  => {  // duyệt qua từng button
        // console.log(button)  // 3 cái  button trong html
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status") // value of button-status
            //console.log(status)
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

//! Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]")

if(buttonPagination){
    let url = new URL(window.location.href); // phân tích href

    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination")
            if(page) url.searchParams.set("page",page)
            else     url.searchParams.delete("page")
            window.location.href = url.href
        })
    })
}

//! Show Alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
    const time = showAlert.getAttribute("data-time")
    const closeAlert = document.querySelector("[close-alert]")
    setTimeout(() =>{
        showAlert.classList.add("alert-hidden")
    }, parseInt(time))
    // console.log(showAlert)

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden")
    })
}

//! Sort
const sort = document.querySelector("[sort]")
if(sort){
    const sortSelect = sort.querySelector("[sort-select]")
    const sortClear = sort.querySelector("[sort-clear]")

    let url = new URL(window.location.href);
    // sort
    sortSelect.addEventListener('change', (e) =>{
        const value = e.target.value  // vd price-esc
        const [sortKey , sortValue] = value.split('-')
        
        url.searchParams.set("sortKey", sortKey)
        url.searchParams.set("sortValue", sortValue) 

        window.location.href = url.href

    })
    // clear
    sortClear.addEventListener('click', () => {
        url.searchParams.delete("sortKey")
        url.searchParams.delete("sortValue")
        window.location.href = url.href
    })

    const sortKey = url.searchParams.get("sortKey")
    const sortValue = url.searchParams.get("sortValue")

    // seclected = true if sortKey and sortValue
    if(sortKey && sortValue){
        const stringSort = `${sortKey}-${sortValue}`
        
        const optionSelect = sortSelect.querySelector(`option[value= '${stringSort}']`)
        optionSelect.selected = true;
    }
}