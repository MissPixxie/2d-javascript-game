export default function globalStateManager() {
  let instance = null;

  function createInstance() {
    let freezePlayer = false;

    return {
      setFreezePlayer(value) {
        freezePlayer = value;
      },
      getFreezePlayer: () => freezePlayer,
    };
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
}

export let previousScene = "null";

export const setPreviousScene = (sceneName) => {
  previousScene = sceneName;
};

export const getPreviousScene = () => {
  return previousScene;
};
