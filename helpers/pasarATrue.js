const pasarATrueOrFalseArray = (arr) => {
    arr.forEach(el => el.mostwanted === 1 ? el.mostwanted = true : el.mostwanted = false);
}

const pasarATrueOrFalse = (elem) => {
    elem.mostwanted === 1 ? elem.mostwanted = true : elem.mostwanted = false;
}

module.exports={pasarATrueOrFalseArray, pasarATrueOrFalse};