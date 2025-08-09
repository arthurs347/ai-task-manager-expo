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
- when changing any config, package.json, or app.json, run yarn clear-start to clear cache.