
export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    server: {
        port: 5000, // default: 3000
        host: '0.0.0.0'
    },
    ssr: false,

    env: {
        STRIPE_PK: "pk_test_51JyUa8LxhYn7H10DYl2XbfDCp4rM2oJISiCAYaUyVcMTgAp1Q2Fkq4X2t6HbuguKtAoGQYCzQPAnK2DfbQkotRtY00vrgc3FjZ",
    },
    
    // 페이지 새로고침이나 axios요청시 화면 상단에 뜨는 로딩바 제거
    loading: false,

    build: {
        babel: {
            plugins: [
                ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
                ['@babel/plugin-proposal-private-methods', { loose: true }],
            ],
        },
    },

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Machlake',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap',
            },
            {
                rel: 'stylesheet',
                href: 'https://pro.fontawesome.com/releases/v5.15.3/css/all.css',
            },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/assets/scss/core.scss'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        "~/plugins/vue-easy-table.js",
        "~/plugins/vue-papa-parse.js",
        "~/plugins/click-outside.js",
        "~/plugins/vue-toast.js",
        "~/plugins/axios.js",
        '~/plugins/vue-tooltip.js',
        '~/plugins/vue-select.js',
        '~/plugins/phone-number-input.js',
        '~plugins/vue-js-toggle-button',
        { src: '~/plugins/amplify.js', mode: 'client' },
        { src: '~/plugins/vue-stripe.js', ssr: false },
        '~/plugins/auth.js',
        '~/plugins/maz-ui.js'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/stylelint-module',
        '@nuxtjs/moment',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        'portal-vue/nuxt',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: process.env.BASE_URL || 'https://wba.machlake.com',
    },

    router: {
        base: '/',
        middleware: ['check-auth'],
        // middleware: ['auth'],
    },
    redirects: async() => {
        return [{
            source: '/blog/:slug*',
            destination: '/news/:slug*', // Matched parameters can be used in the destination
            permanent: true,
        }, ]
    },
}
