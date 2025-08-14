import Constants from "expo-constants";
import {Platform} from "react-native";

export function generateAPIUrl(relativePath: string): string {
    if (Platform.OS === "web") {
        // For web, we can use the full URL directly
        return relativePath
    }

	return Constants.expoConfig?.extra?.baseUrl.concat(relativePath);
}
