import { useCallback, useState, useTransition } from 'react';

const useServerAction = <T, TArgs>(action: (args: TArgs) => Promise<T>) => {
	const [, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [response, setResponse] = useState<any>(null);

	const ex = useCallback(
		(input: TArgs) => {
			console.log('ex');
			setIsLoading(true);
			startTransition(() => {
				action(input)
					.then((res) => {
						setResponse(res);
						setIsLoading(false);
					})
					.catch((err) => {
						setError(err);
						setIsLoading(false);
					});
			});
		},
		[action],
	);

	return { isLoading, error, response, ex };
};

export default useServerAction;
