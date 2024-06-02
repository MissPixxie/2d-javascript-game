export let previousScene = "null";

export const setPreviousScene = (sceneName) => {
  previousScene = sceneName;
};

export const getPreviousScene = () => {
  return previousScene;
};
