/* eslint-disable camelcase */
const frontPage = 'https://www.reddit.com/hot.json';

const buildSubPage = (sub) => `https://www.reddit.com/r/${sub}/hot.json`;

const parseJson = (resJson) => resJson.data.children.map(({ data }) => {
  const {
    author, created_utc, id, title, subreddit, thumbnail, ups,
  } = data;
  return {
    author,
    created: new Date(created_utc * 1000),
    id,
    subreddit,
    thumbnail,
    title,
    ups,
    rawData: data,
  };
});

const fetchReddit = async (sub) => {
  const url = sub ? buildSubPage(sub) : frontPage;
  const res = await fetch(url);
  const resJson = await res.json();
  return parseJson(resJson);
};

export default fetchReddit;
