# whos

## problem

Whos (Who's Coming) is a React Native application that satisfies the following:

- Who is coming is an application to be used in neighborhoods with privacy.
- At our neighborhood, we want to know who is coming to visit, what car he/she is driving, time to come in and leaving the place.
- We also want to register any suspicious activity in our neighborhood, hence, everyone has to register.
- If you see anything suspicious you tell Whos.
- Whos can be an excellent tool if we know how to use it properly.
- Registration should be before coming, if so, we just scan the id or the car’s plate. If not, we do it at the gate but takes more time.
- In our neighborrhod, we are like a huge family, If I am looking for a nurse, I ask whos, If I am out of gas, I ask whos.
- Whos keeps me inform of what is going on and who is coming, when they are coming, how will they get here, how long will they stay

## functionality

Whos has the following four actors

### resident

- Register account on whos
- List of fellow neighbors
- List of records for guest visits
- A means to view and add suspicious activities
- List of service providers and their contacts

### guest

- Register a visit on whos

### service provider

-Register account on whos with a specific service

### admin

- Edits and deletes resident and service provider details and acccounts
- Edits and deletes house units
- Edits and deletes types of services

## prerequisites

for the project to work correctly, make sure you do the following:

- Create a root file called `.env`.
- The following are the contents of the `.env` file

```javascript
# // FIREBASE CONFIG
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_DATABASE_URL=your-database-url
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id
FIREBASE_MEASUREMENT_ID=your-measurement-id
```

You can get the details for `FIREBASE_` variables in the `.env` by doing the following:

- Create a free firebase project on [console.firebase.google.com](https://console.firebase.google.com)
- Add a web app to your project
- Enable email login on the authentication section
- Enable realtime database and ensure to **start in test mode**
- For an admin account, register as a resident then in the realtime database, manually change `role` from **resident** to **admin**

You can reach out in caseof any problems

## setup

- After you clone the repo, run `npm install` or `yarn install` depending on your package manager
- Run `yarn start` or `npm start` depending on your package manager or if you have expo-cli `expo start`
- Follow the instructions on the terminal to open your project in either **Android** or **iOS**

## technologies

- React Native
- Expo
- React Navigation
- Redux (with Thunk)
- React Native Paper
- Firebase (Realtime DB | Auth)
- Formik
- Yup
- Moment.JS
