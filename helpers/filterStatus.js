module.exports = (query) => {
    let filterStatus = [
        {
            name : "Tất cả",
            status : "",
            class : ""
        },
        {
            name : "Hoạt động",
            status : "active",
            class: ""
        },
        {
            name : "Dừng hoạt động",
            status : "inactive",
            class: ""
        },        
    ]
    if (query.status){
        const index = filterStatus.findIndex(index => index.status === query.status)
        //console.log(index)  // active = 1 , inactive = 2 , "" =0
        filterStatus[index].class = "active"; // truyền active vô key class 
    }
    else {
        const index = filterStatus.findIndex(index => index.status === "")
        //console.log(index)  // active = 1 , inactive = 2 , "" =0
        filterStatus[index].class = "active"; // truyền active vô key class 
    }
    return filterStatus;
}
