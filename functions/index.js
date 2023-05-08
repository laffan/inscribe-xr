const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
admin.firestore().settings({ ignoreUndefinedProperties: true });

const defaults = {
  scene: {
    world: {
      vista: "default-vista",
      garden: {
        model: "default-garden",
      },
      building: {
        model: "default-building",
      },
    },
    trackedTransforms: [],
    modes: [],
  },
  reflection: {
    type: "text",
    content: "First line is title",
    promptId: "",
  },
  prompt: {
    type: "text",
    content: "How did you get here?",
  },
  user: {
    state: {},
  },
};

exports.newUserDefaults = functions.auth.user().onCreate(async (user) => {
  /*
    1. create a document for each data type
    2. await all their ids
    3. update each one with the relevant connection info
    4. save default values to documents
*/
  const sceneRef = admin.firestore().collection("scenes").doc();
  const reflectionsRef = admin.firestore().collection("reflections").doc();
  const usersRef = admin.firestore().collection("users").doc(user.uid);
  const promptsRef = admin.firestore().collection("prompts").doc();

  // Update default object with IDs.
  defaults.scene.owner = user.uid;
  defaults.reflection.owner = user.uid;
  defaults.prompt.owner = user.uid;
  defaults.user.owner = user.uid;

  // Set creation timestamps for user and document
  defaults.reflection.created = admin.firestore.FieldValue.serverTimestamp();
  defaults.reflection.promptId = promptsRef.id;
  defaults.prompt.created = admin.firestore.FieldValue.serverTimestamp();
  defaults.user.created = admin.firestore.FieldValue.serverTimestamp();
  defaults.user.state.currentScene = sceneRef.id;
  defaults.user.state.currentReflection = reflectionsRef.id;

  // Fill fields with updated default value
  await usersRef.set(defaults.user);
  await sceneRef.set(defaults.scene);
  await promptsRef.set(defaults.prompt);
  await reflectionsRef.set(defaults.reflection);
});
