exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, pluginOptions) => {
  const { createNode } = actions;
  let placeIds = pluginOptions.placeId;
  
  if(!Array.isArray(placeIds)) {
    placeIds = [placeIds];
  }

  for(const placeId of placeIds) {
    console.log('\x1b[1m\x1b[36m[gatsby-source-bokadirekt]\x1b[0m Fetching reviews for placeId: ' + placeId);
    const response = await fetch(`https://www.bokadirekt.se/api/places/getReviews/${placeId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch reviews for placeId ${placeId}: ${response.statusText}`);
    }

    const data = await response.json();
    if (!Array.isArray(data.items)) {
      throw new Error(`Unexpected data format for placeId ${placeId}: items is not an array`);
    }
    
    data.items.forEach((review) => {
      const nodeData = {
        ...review,
        id: createNodeId(`BokaDirektReview-${review.id}`),
        parent: null,
        children: [],
        internal: {
          type: 'BokaDirektReview',
          contentDigest: createContentDigest(review),
        },
      };
      createNode(nodeData);
    });
  }
};