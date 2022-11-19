import { sendError } from "../networks/sendToBackground";

export const catchError = (error: Error): Promise<void> => sendError(error.stack);