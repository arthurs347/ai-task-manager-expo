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
- After installing new packages, if native -> rebuild EX: npx expo run:ios, clear cache with yarn clear-start

Important CMD's:
- yarn remove <package_name> -> remove package from project
- yarn add <package_name> -> add package to project
  yarn why <dependency_name> -> shows why package installed and which packages depend on it
- npx expo run:ios -> locally builds on ios, prebuild included



TODO (In order of priority):
1. Use react-native-pager-view for dayheader swiping
2. Fix drag and drop for HabitItems on TimeSlots
3. Fix any errors in the app, console, typescript, and update dependencies
4. Secure application and API's, use chatGPT 
5. Add payment integration