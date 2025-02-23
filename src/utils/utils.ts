export function formatAxiosError(error: any) {
	if (error.response) {
		const errorData = error.response.data;

		return {
			status: error.response.status,
			statusText: error.response.statusText,
			message: typeof errorData === "string" ? errorData :
				errorData?.message ||
				errorData?.error?.message ||
				errorData?.error ||
				errorData?.description ||
				JSON.stringify(errorData) ||
				"No error message provided",
			path: error.response.config?.url,
			data: errorData,
			headers: error.response.headers,
		};
	} else if (error.request) {
		return {
			error: "No response received",
			message: error.message || "The server did not respond to the request",
			request: {
				method: error.request.method,
				path: error.request.path,
				host: error.request.host,
			},
		};
	} else {
		return {
			error: "Request setup failed",
			message: error.message,
			stack: error.stack,
		};
	}
}
