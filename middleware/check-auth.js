export default function ({ store, route, redirect }) {
    const sIsLoginPage = route.path.includes('/login') || route.path.includes('/register');
    const sIsAuthenticated = store.state.auth.gIsAuthenticated;

    if (!sIsAuthenticated && !sIsLoginPage) {
        return redirect('/login')
    }
}