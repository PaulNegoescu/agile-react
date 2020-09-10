import { useState, useEffect } from "react";

const baseUrl = 'https://games-app-siit.herokuapp.com';

export default function useApi(endpoint, options) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [shouldReload, setShouldReload] = useState(1);

    function triggerReload() {
        setShouldReload(Math.random());
    }

    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch(`${baseUrl}/${endpoint}`, options);
                
                if(!res.ok) {
                    throw new Error(`${res.status}/${res.statusText}`);
                }

                const data = await res.json();
                setError(null);
                setData(data);
            } catch(e) {
                setError(`There was an error with the API: "${e.message}" the endpoint was: "${endpoint}".`);
            }
        }

        getData();
    }, [endpoint, options, shouldReload]);

    return [data, error, triggerReload];
}