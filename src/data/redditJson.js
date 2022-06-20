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
    r: subreddit,
    thumbnail,
    title,
    ups,
    flair: data.link_flair_text,
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

const aboutSub = async (sub) => {
  const url = `https://www.reddit.com/r/${sub}/about.json`;
  const res = await fetch(url);
  const resJson = await res.json();
  let banner = resJson.data.banner_img;
  if (!banner) {
    [banner] = resJson.data.banner_background_image.split('?width');
  }
  const description = await resJson.data.public_description;
  const color = resJson.data.primary_color;
  const bgColor = resJson.data.banner_background_color;
  const name = resJson.data.title;
  return {
    banner, color, bgColor, description, name,
  };
};

const parseMainPost = (resJson) => {
  const { data } = resJson[0].data.children[0];
  console.log(data);
  const {
    author, title, ups, thumbnail, url, selftext, id,
  } = data;
  const res = {
    author, title, ups, thumbnail, url, selftext, id,
  };
  res.r = data.subreddit;
  res.created = new Date(data.created_utc * 1000);
  res.isGallery = data.gallery_data && data.gallery_data.items;
  if (res.isGallery) {
    res.images = [];
    data.gallery_data.items.forEach(({ media_id }) => {
      if (data.media_metadata[media_id]) {
        res.images.push(
          { url: data.media_metadata[media_id].p[3].u.replaceAll('&amp;', '&') },
        );
      }
    });
  }
  res.embed = data.media && data.media.oembed
    ? { ...data.media.oembed }
    : null;
  // title, html, thumbnail_url
  res.flair = data.link_flair_text;
  if (url.match(/\.gif$/g)) {
    if (!res.images) res.images = [{ url }];
    else res.images.push({ url });
  } else if (data.media && data.media.reddit_video) {
    res.video = data.media.reddit_video;
  } else if (!res.embed && data.preview) {
    if (data.preview.images) {
      res.images = data.preview.images.map(({ source }) => source);
    }
  }
  return res;
};

const parseComments = (resJson) => {
  const comments = [];
  resJson.slice(1).forEach((dp) => {
    dp.data.children.forEach(({ data }) => {
      const { author, body, ups } = data;
      const created = new Date(data.created_utc * 1000);
      comments.push({
        author, body, ups, created,
      });
    });
  });
  return comments;
};

const getPost = async ({ r, id }) => {
  const url = `https://www.reddit.com/r/${r}/comments/${id}.json`;
  const res = await fetch(url);
  const resJson = await res.json();
  const mainPost = parseMainPost(resJson);
  const comments = parseComments(resJson);
  return { mainPost, comments };
};

export { aboutSub, getPost };
