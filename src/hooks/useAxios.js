import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export default url => {

    const baseUrl = 'https://newsapi.org/v2/everything?';
    const apiKey = '&apiKey=10260228bb0e4f959496d682d93fd046';
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const doAxios = useCallback(() => setLoading(true), []);

    useEffect(() => {
        if (!loading) return;

        let isActiveComponent = true;

        localStorage.setItem('urlForLinkBack', url);

        axios(baseUrl + url + apiKey)
            .then(result => isActiveComponent && setResponse(result.data))
            .catch(error => isActiveComponent && setError(error.message))
            .finally(() => isActiveComponent && setLoading(false));

        return () => isActiveComponent = false
    }, [loading, url]);

    return [{response, error, loading}, doAxios]
}