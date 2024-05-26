
module.exports = (objectPagination, query, countProducts) => {
    if(query.page) objectPagination.currentPage = parseInt(query.page) // lấy trang hiện tại trên query

    const totalPage = Math.ceil(countProducts / objectPagination.limitItem)
    objectPagination.totalPage = totalPage 
    return objectPagination
}