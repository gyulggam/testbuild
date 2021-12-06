const gCallApiUrl = 'https://wba.machlake.com/';
const gDefaultLakeUrl = 'https://api.machlake.com/';
// const gDefaultLakeUrl = 'https://vf48gxqq1i.execute-api.ap-northeast-2.amazonaws.com/latest/lakes';

const getApiRequest = async (payload = {}, axios) => {
    return await axios.$get(`${gCallApiUrl}${payload}`, {} );
}
const callApiRequest = async (payload = {}, axios) => {
    return await axios.$post(`${gCallApiUrl}callapi`, payload);
}

export {
    gCallApiUrl,
    gDefaultLakeUrl,
    getApiRequest,
    callApiRequest,
}
