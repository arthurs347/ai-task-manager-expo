## License

This software is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/).

You are free to use, share, and adapt this code for **non-commercial purposes**, provided that you give appropriate credit.

## Get Started
1. Install the required dependencies:
   ```bash
   yarn install
   ```
2. Setup Dev environment
- Get Env files from team members.
- ADD OWN APP_URL (local ipv4 address) in .env files
  - run cmd `ipconfig getifaddr en0` on mac

Deploying to Web
1. npx expo export --platform web
2. eas deploy --alias preview
3. eas deploy --prod

CI/CD
1. Need to run npx expo run:ios?


Tips:
- ALWAYS RUN & TRUST expo doctor recs.
- Run npx expo run:ios && npx expo start -c when:
  - changing app.json or app.config.js, 
  - installing/updating a library that includes native code
  - Update Expo SDK version
  - After running npx expo prebuild
- _tostring or obscure method not found: check dependencies
- Route not found: might be error in that page, therefore not rendering
- Mobile Crashing on load: run npx expo-doctor and run npx expo install --check
- cache-resetting: yarn start --reset-cache -> reset metro cache
- Make sure when installing packages look at correct versions, use npx expo-doctor
- IMMEDIATELY AFTER installing new packages, if NATIVE -> rebuild EX: npx expo run:ios, clear cache with yarn clear-start
- After removing native packages rebuild?
- calling apis inside other api, might require adding localhost in front of api path
- apis work on localhost/web but not on mobile: check if app url is correct -> mac ipv4


Important CMD's:
- yarn remove <package_name> -> remove package from project
- yarn add <package_name> -> add package to project
  yarn why <package_name> -> shows why package installed and which packages depend on it
- npx expo run:ios -> locally builds on ios, prebuild included
- yarn clear-start -> clears cache, useful when changing app.json or config files
- eas build --platform ios --profile development --local -> builds ios locally


Future Additions (In order of priority):
- Refactor taskcompleted logic to use new updatedFields structure
- Refactor ListView to take in AnyTask instead of listedtask
- Refactor ai functionality to return AnyTask instead of ListedTask
1. Add Task Editing capabilities
    - implement EditTaskForm
    - implement editTask action
2. Make APP_URL Adaptive, to not manually put local ip address (it changes when switching Wi-Fi networks)
[//]: # (1. Add offline-mode-support)
[//]: # (1. Implement Remote Build Cache to speed up builds -> https://youtu.be/5SmaC-JQS_k)
3. Secure application and API's, use chatGPT to assist
   - Rate Limit using redis
   - Authentication, db and prisma auth, clerk
   - Authorization
   - Input Validation
   - Error Handling
4. Add Zod & trpc
   - Use Zod for form validation
   - Use Zod for API route validation
   - Use Zod for schema validation

[//]: # (5. Refactor drag and drop logic)
[//]: # (6. Fix any errors in the app, console, typescript, and update dependencies)
[//]: # (7. Add payment integration)
[//]: # (8. Add Local-first db implementation -> https://youtu.be/SBv32tmyb3k)

