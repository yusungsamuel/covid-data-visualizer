export const parseDate = (str) => {
    str = str.toString()
    str = str.split("");
    str.splice(4, 0, "-");
    str.splice(7, 0, "-");
    str = (str.join(""));

    return str
}
