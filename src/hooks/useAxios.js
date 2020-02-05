import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export default url => {

    const baseUrl = 'https://newsapi.org/v2/everything?';
    const apiKey = '&apiKey=10260228bb0e4f959496d682d93fd046';
    const [response, setResponse] = useState(null);
    const [ignore, setIgnore] = useState(false);
    const [arrayRequest, setArrayRequest] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const doAxios = useCallback((ignore = false, requestArray = null) => {
        setIgnore(ignore);
        requestArray && setArrayRequest(requestArray.map(item => baseUrl + 'qInTitle=' + item + apiKey));
        setLoading(true)
    }, []);

    useEffect(() => {
        if (!loading) return;

        let isActiveComponent = true;

        if (!ignore) {
            localStorage.setItem('urlForLinkBack', url);
            setIgnore(false)
        }

        if (!arrayRequest) {
            axios(baseUrl + url + apiKey)
                .then(result => isActiveComponent && setResponse(result.data))
                .catch(error => isActiveComponent && setError(error.message))
                .finally(() => isActiveComponent && setLoading(false));
        } else {
            axios.all(arrayRequest.map(request => axios.get(request)))
                .then(axios.spread((...responses) => isActiveComponent && setResponse(responses)))
                .catch(errors => isActiveComponent && setError(error.message))
                .finally(() => isActiveComponent && setLoading(false));
        }

        return () => isActiveComponent = false
    }, [loading, url]);

    return [{response, error, loading}, doAxios]
}