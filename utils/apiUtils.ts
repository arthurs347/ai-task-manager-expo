import Constants from "expo-constants";

export function generateAPIUrl(relativePath: string): string {
    console.log(process.env.NODE_ENV)
    console.log(Constants.expoConfig?.extra?.baseUrl)

    return Constants.expoConfig?.extra?.baseUrl.concat(relativePath);
}