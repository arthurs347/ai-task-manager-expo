import Constants from "expo-constants";
import {API_BASE_URL} from "@/lib/constants";

export function generateAPIUrl(relativePath: string): string {
    //TODO: Handle SO DIRECTS TO PREVIEW ENV taskdone.dev.expo.app or something like that
    console.log(process.env.NODE_ENV)
    console.log(Constants.experienceUrl)

    const origin = Constants?.experienceUrl?.replace("exp://", "https://") || API_BASE_URL;

    const path = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;

    if (process.env.NODE_ENV === "development") {
        return origin?.concat(path);
    }

    if (!API_BASE_URL) {
        throw new Error("API_BASE_URL is not defined");
    }

    return API_BASE_URL.concat(path);
}