export const buildRobotsTags = (robots) => {
  const robotsTags = [];
  const noRobots = { hid: 'robots', name: 'robots', content: 'noindex, nofollow' };
  const noIndex = { hid: 'robots', name: 'robots', content: 'noindex' };
  const noFollow = { hid: 'robots', name: 'robots', content: 'nofollow' };

  if(robots) {
    if(!robots.index && !robots.follow) robotsTags.push(noRobots);
    else if(!robots.index) robotsTags.push(noIndex);
    else if(!robots.follow) robotsTags.push(noFollow);
  }

  return robotsTags;
}

export const buildMetaTags = (title, description, tags) => {
  const metaTags = [];

  if(title) {
    metaTags.push({ hid: "og:title", property: "og:title", content: title });
  }

  if(description) {
    metaTags.push({ hid: "description", name: "description", content: description });
    metaTags.push({ hid: "og:description", property: "og:description", content: description });
  }

  if(tags) {
    tags.forEach(tag => {
      if(tag.type === 'default') metaTags.push(
        { hid: tag.title, name: tag.title, content: tag.content }
      )
      if(tag.type === 'openGraph') metaTags.push(
        { hid: tag.title, property: tag.title, content: tag.content }
      )
    })
  }

  return metaTags;
};
