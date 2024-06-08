export default function globalStateManager() {
  let instance = null;

  function createInstance() {
    let freezePlayer = false;
    let previousScene = "null";
    return {
      setFreezePlayer(value) {
        freezePlayer = value;
      },
      getFreezePlayer: () => freezePlayer,
      setPreviousScene(sceneName) {
        previousScene = sceneName;
      },
      getPreviousScene: () => {
        return previousScene;
      },
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
