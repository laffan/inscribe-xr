import { createStore, thunk, action } from "easy-peasy";
import * as firestore from "./firebase/firestore";
import * as storage from "./firebase/storage";

export const store = createStore({
  /*****************************
   * Initial Setup
   */
  fetchInitialState: thunk(async (actions) => {
    const userData = await firestore.getUserDocs("users");
    const sceneData = await firestore.getUserDocs("scenes");
    const reflectionData = await firestore.getUserDocs("reflections");
    const promptData = await firestore.getUserDocs("prompts");

    actions.scenes.update(sceneData);
    actions.reflections.update(reflectionData);
    actions.prompts.update(promptData);
    actions.user.update(userData[0]);

    // Once EasyPeasy has been hydrated fully, allow app to load
    actions.manager.setIsLoaded(true);
  }),

  /*****************************
   * Manager
   * Keep track of session
   */

  manager: {
    current: {
      scene: 0,
      collection: 0,
      document: 0,
      tableMode: 1,
    },
    transformLinks: [],
    isLoaded: false,
    setIsLoaded: action((state, payload) => {
      state.isLoaded = payload;
    }),
    setTableMode: action((state, payload) => {
      state.current.tableMode = payload;
    }),
    setTransformLinks: action((state, payload) => {
      state.transformLinks = payload;
    }),
  },

  /*****************************
   * Scenes
   */
  scenes: {
    update: action((state, payload) => payload),
    saveTransforms: thunk(async (actions, payload, { getStoreState }) => {
      // Get current scene ID
      const storeState = getStoreState();
      const scenes = storeState.scenes;
      const currentSceneId = storeState.manager.current.scene;
      const sceneId = scenes[currentSceneId].id;

      firestore.saveTransforms(sceneId, payload);
    }),
  },

  /*****************************
   * Documents
   */

  reflections: {
    update: action((state, payload) => payload),
    updateCurrentPrompt: action(
      (state, { currentReflectionId, newPromptId }) => {
        const reflectionToUpdate = state.find(
          (reflection) => reflection.id === currentReflectionId
        );
        if (reflectionToUpdate) {
          reflectionToUpdate.promptId = newPromptId;
        }
      }
    ),
    setPrompt: thunk(async (actions, payload, { getStoreActions }) => {
      const currentReflection = store.getState().user.state.currentReflection;
      await firestore.setPrompt(currentReflection, payload);

      // Update prompt id in state of current reflection
      actions.updateCurrentPrompt({
        currentReflectionId: currentReflection,
        newPromptId: payload,
      });

      getStoreActions().manager.setTableMode(2);
    }),
    saveCurrentReflection: thunk(async (actions, payload) => {
      await firestore.saveReflection(payload.reflectionId, payload.content);
      const reflections = store.getState().reflections;
      const id = reflections.findIndex((d) => d.id === payload.reflectionId);
      reflections[id] = payload.content;
      actions.update(reflections);
    }),
    finishCurrentReflection: thunk(
      async (actions, payload, { getStoreActions }) => {
        const newReflection = await firestore.createReflection();
        await getStoreActions().user.saveCurrentReflection({
          reflectionId: newReflection.id,
        });
        const reflectionData = await firestore.getUserDocs("reflections");
        getStoreActions().reflections.update(reflectionData);
        getStoreActions().manager.setTableMode(3);
      }
    ),
    deleteCurrentReflection: thunk(
      async (actions, { id }, { getStoreActions, getStoreState }) => {
        await firestore.deleteReflection(id);
        const newReflections = getStoreState().reflections.filter(
          (r) => r.id !== id
        );
        actions.update(newReflections);
        if (newReflections.length) {
          await getStoreActions().user.saveCurrentReflection({
            reflectionId: newReflections[0].id,
          });
        } else {
          await getStoreActions().user.saveCurrentReflection({
            reflectionId: "",
          });
        }
      }
    ),
  },
  ui: {
    status: "",
    setStatus: action((state, payload) => {
      state.status = payload;
    }),
  },

  /*****************************
   * Prompts /
   */
  prompts: {
    update: action((state, payload) => payload),
    addPrompt: action((state, payload) => {
      state.push(payload);
    }),
    removePrompt: action((state, payload) => {
      state.splice(
        state.findIndex((prompt) => prompt.id === payload),
        1
      );
    }),
    deleteImagePrompt: thunk(async (actions, payload, { getStoreActions }) => {
      getStoreActions().ui.setStatus("Deleting...");
      const prompts = await firestore.deleteImagePrompt(payload.id);

      actions.removePrompt(payload.id);
    }),

    saveImagePrompt: thunk(async (actions, payload, { getStoreActions }) => {
      // getStoreActions().ui.setStatus("Uploading...");

      const newPromptEntry = await storage.uploadImagePrompt(payload.files);
      const promptData = await firestore.getUserDocs("prompts");

      actions.update(promptData);
    }),

    saveTextPrompt: thunk(async (actions, payload, { getStoreActions }) => {
      const newPromptEntry = await firestore.createTextPrompt(payload);
      actions.addPrompt(newPromptEntry);
    }),
    deleteTextPrompt: thunk(async (actions, payload, { getStoreActions }) => {
      await firestore.deleteTextPrompt(payload);
      actions.removePrompt(payload);
    }),
  },

  /*****************************
   * User
   */

  user: {
    update: action((state, payload) => payload),
    updateCurrentReflection: action((state, { reflectionId }) => {
      state.state.currentReflection = reflectionId;
    }),
    saveCurrentReflection: thunk(async (actions, { reflectionId }) => {
      await firestore.setCurrentReflection(reflectionId);
      actions.updateCurrentReflection({ reflectionId });
    }),
  },
});
