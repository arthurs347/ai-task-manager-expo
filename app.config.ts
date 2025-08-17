import type { ConfigContext, ExpoConfig } from "@expo/config";
import { SLUG } from "@/lib/constants";

const IS_DEV = process.env.APP_ENV === "development";

const getUniqueIdentifier = () => {
	if (IS_DEV) return "com.arthurs347.aitaskmanager.dev";

	return "com.arthurs347.aitaskmanager";
};

const getAppName = () => {
	if (IS_DEV) return "Ai Task (Dev)";

	return "Ai Task";
};
export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: getAppName(),
	slug: config.slug ?? SLUG,
	ios: {
		...config.ios,
		bundleIdentifier: getUniqueIdentifier(),
	},
	android: {
		...config.android,
		package: getUniqueIdentifier(),
	},
	extra: {
		...config.extra,
		baseUrl: process.env.APP_URL,
	},
});
