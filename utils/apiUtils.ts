import Constants from "expo-constants";
import {Platform} from "react-native";

export function generateAPIUrl(relativePath: string): string {
    if (Platform.OS === "web") {
        // For web, we can use the full URL directly
        return relativePath
    }
	console.log(process.env.NODE_ENV);
	console.log(Constants.expoConfig?.extra?.baseUrl);

	return Constants.expoConfig?.extra?.baseUrl.concat(relativePath);
}
