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
- when changing any config or app.json, PLEASE run yarn clear-start to clear cache.
- _tostring or obscure method not found: check dependencies
- Route not found: might be error in that page, therefore not rendering
- Mobile Crashing on load: run npx expo-doctor and run npx expo install --check
- cache-resetting: yarn start --reset-cache -> reset metro cache
- Make sure when installing packages look at correct versions, use npx expo-doctor
- IMMEDIATELY AFTER installing new packages, if NATIVE -> rebuild EX: npx expo run:ios, clear cache with yarn clear-start
- After removing native packages rebuild?

Important CMD's:
- yarn remove <package_name> -> remove package from project
- yarn add <package_name> -> add package to project
  yarn why <dependency_name> -> shows why package installed and which packages depend on it
- npx expo run:ios -> locally builds on ios, prebuild included



TODO (In order of priority):
1. Add Task Editing capabilities
1. Secure application and API's, use chatGPT to assist
   - Rate Limit
   - Authentication
   - Authorization
   - Input Validation
   - Error Handling
2. Add Zod
   - Use Zod for form validation
   - Use Zod for API route validation
   - Use Zod for schema validation
3. Refactor drag and drop logic
4. Fix any errors in the app, console, typescript, and update dependencies
5. Add payment integration
