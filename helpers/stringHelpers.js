module.exports = {
    removeNonAlphaChars: (text) => text.replace(/[\W_]+/g, ""),
    capitalizeFirstLetter: (text) => text.charAt(0).toUpperCase() + text.slice(1)
}