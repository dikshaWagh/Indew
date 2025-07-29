const getWikiData = async (query) => {
  const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
  const data = await res.json();

  return {
    title: data.title,
    extract: data.extract,
    image: data.thumbnail?.source || null // sometimes no image
  };
};
