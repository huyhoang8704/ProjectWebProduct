module.exports = (query, find) =>{
    let keyword = "";
    if(query.keyword){
        keyword = query.keyword

        const regex = new RegExp(keyword , "i")

        find.title = regex // gán title vô trong find 
    }
    return keyword
}