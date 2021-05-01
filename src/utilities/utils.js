const utils = {
  hasDarkClass: hasDarkClass
}

export default utils;

function hasDarkClass(theme) {
  return theme === "dark" ? "--dark" : "";
}  
