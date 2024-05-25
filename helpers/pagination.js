
module.exports = (objectPagination, query, countProducts) => {
    if(query.page) objectPagination.currentPage = parseInt(query.page)

    const totalPage = Math.ceil(countProducts / objectPagination.limitItem)
    objectPagination.totalPage = totalPage
    return objectPagination
}