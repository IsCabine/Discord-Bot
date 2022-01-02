module.exports = function(find, replace) {
    return this.split(find).join(replace);
}