export default function({ store, $axios, redirect }) {
    $axios.onRequest(config => {
        config.headers.post["Access-Control-Allow-Origin"] = `*`;
    });

    $axios.onResponse(response => {
        console.log("[onResponse]", response);
    });

    $axios.onRequestError(err => {
        console.log("onRequestError", err);
    });

    $axios.onResponseError(error => {
        console.log("[onResponseError]", error);

        const code = parseInt(error.response && error.response.status);
        if (code === 401) {
            redirect("/login");
        }
    });

    $axios.onError(error => {
        console.log("[onError]", error);
    });
}