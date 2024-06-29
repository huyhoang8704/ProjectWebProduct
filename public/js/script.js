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