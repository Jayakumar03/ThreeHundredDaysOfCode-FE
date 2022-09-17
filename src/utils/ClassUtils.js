import Cookies from 'universal-cookie';

const joinClasses = (props) => {
    return props.join(" ")
}

const append = (prefix, suffix, separator) => {
    return prefix + separator + suffix
}

const checkAuth = () => {
    const cookies = new Cookies();
    const value = cookies.get('isLoggedIn', { path: '/' });
    return value === "true"
}

export {
    joinClasses,
    append,
    checkAuth
}
