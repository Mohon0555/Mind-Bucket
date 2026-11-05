// Firebase web config for Google sign-in and cloud sync.
// These values identify the Firebase project; they are meant to be public in website code.
// Access to each person's data is protected by the Firestore rules in firestore.rules.
//
// Leave this as null to run Mind Bucket in guest-only mode (no sign-in button).
// To turn sign-in on, replace null with the config object from
// Firebase console → Project settings → General → Your apps → Web app, for example:
//
// window.MB_FIREBASE = {
//   apiKey: "…",
//   authDomain: "your-project.firebaseapp.com",
//   projectId: "your-project",
//   storageBucket: "your-project.appspot.com",
//   messagingSenderId: "…",
//   appId: "…"
// };
window.MB_FIREBASE = null;
