const load = () => {
  if (window.localStorage && window.localStorage.additionalSubreddits) {
    return JSON.parse(window.localStorage.additionalSubreddits);
  }
  return [];
};

const save = (arr) => {
  const clearnArr = arr.map(({ r, name }) => ({ r, name }));
  window.localStorage.additionalSubreddits = JSON.stringify(clearnArr);
};

const loadHides = () => {
  if (window.localStorage && window.localStorage.hiddenSubs) {
    return JSON.parse(window.localStorage.hiddenSubs);
  }
  return [];
};

const saveHides = (arr) => {
  window.localStorage.hiddenSubs = JSON.stringify(arr);
};

export default {
  load, save, loadHides, saveHides,
};
