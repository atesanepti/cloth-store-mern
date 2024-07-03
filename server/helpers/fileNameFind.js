const fileName = (path)=>{
    const pathSegments = path.split("/");
    const fileName = pathSegments[-1]
    return fileName;
}


module.exports = {
  fileName,
};