export const setAccess = () => {
    window.localStorage.setItem("login_mach_base", true)
}
export const removeAccess = () => {
    window.localStorage.removeItem("login_mach_base")
}
export const getAccess = () => {
    if (process.server) return;
    const access = window.localStorage.getItem("login_mach_base")
    return access
}