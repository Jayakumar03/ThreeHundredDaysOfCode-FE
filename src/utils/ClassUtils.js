import Cookies from 'universal-cookie';

const joinClasses = (props) => {
    return props.join(" ")
}

const append = (prefix, suffix, separator) => {
    return prefix + separator + suffix
}

const checkValid = (item) => {
    return !(item === undefined)
}

const checkAllValid = (items) => {
    let isValid = true
    items.forEach(item => {
        if (isValid) {
            isValid = checkValid(item);
        }
    });
    return isValid;
}

export {
    joinClasses,
    append,
    checkAllValid
}
