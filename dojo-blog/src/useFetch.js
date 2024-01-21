import { useState, useEffect } from "react";
const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const abortCont = new AbortController();
		fetch(url, { signal: abortCont.signal })
			.then((res) => {
				if (!res.ok) {
					throw Error("could not fetch from server.");
				}
				return res.json();
			})
			.then((data) => {
				setData(data);
				setError(null);
				setIsPending(false);
			})
			.catch((e) => {
				if (e.name !== "AbortError") {
					setError(e.message);
					setIsPending(false);
				}
			});
		return () => abortCont.abort();
	}, [url]);

	return { data, isPending, error };
};
export default useFetch;
