export function formatAxiosError(error: any) {
	if (error.response) {
		return {
			status: error.response.status,
			statusText: error.response.statusText,
			message: error.response.data?.message || "No error message provided",
			path: error.response.data?.path || error.response.config?.url,
			timestamp: error.response.data?.timestamp,
		};
	} else if (error.request) {
		return {
			error: "No response received",
			message: "The server did not respond to the request",
		};
	} else {
		return {
			error: "Request setup failed",
			message: error.message,
		};
	}
};
