import { File as NodeFile } from "node:buffer";
import { promises as fs } from "node:fs";
import { basename } from "node:path";
import { lookup } from "mime-types";
import { GreenApiError } from "@green-api/whatsapp-api-client-js-v2";
import { DEFAULT_UPLOAD_MIME_TYPE } from "../defaults";

export function formatError(error: unknown) {
	if (error instanceof GreenApiError) {
		return {
			status: error.statusCode,
			message: error.message,
			data: error.response,
		};
	}
	if (error instanceof Error) {
		return {
			message: error.message,
			stack: error.stack,
		};
	}
	return {message: String(error)};
}

export async function readUploadFile(filePath: string, fileName?: string): Promise<File> {
	const name = fileName || basename(filePath);
	const data = await fs.readFile(filePath);
	return new NodeFile([data], name, {type: lookup(name) || DEFAULT_UPLOAD_MIME_TYPE}) as unknown as File;
}
