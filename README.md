Get Started
1. Install the required dependencies:
   ```bash
   yarn install
   ```
2. Get Env files from team members.
- ADD OWN APP_URL

Deploying to Web
1. npx expo export --platform web
2. eas deploy --alias preview
3. eas deploy --prod

Tips:
- when changing any config, package.json, or app.json, PLEASE run yarn clear-start to clear cache.
- _tostring or obscure error: check configs/dependencies
- Route not found: might be error in that page, therefore not rendering
- Mobile Crashing on load: run npx expo-doctor and run npx expo install --check
- dependicies that require other dependies: yarn why <dependency_name>
- cache-reseting: yarn start --reset-cache -> reset metro cache

Important CMD's:


TODO:
- Use react-native-pager-view for dayheader swiping
