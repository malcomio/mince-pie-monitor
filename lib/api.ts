const POST_GRAPHQL_FIELDS = `
  slug
  title
  rating
  description {
    json
  }
  year
  image {
    url
  }
`;

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["mincePie"] },
    },
  ).then((response) => response.json());
}

function extractPie(fetchResponse: any): any {
  return fetchResponse?.data?.mincePieCollection?.items?.[0];
}

function extractPies(fetchResponse: any): any[] {
  return fetchResponse?.data?.mincePieCollection?.items;
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      mincePieCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true,
  );
  return extractPie(entry);
}

export async function getAllPies(): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      mincePieCollection(where: { rating_exists: true }, order: rating_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  
  return extractPies(entries);
}

export async function getPie(
  slug: string
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      mincePieCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return extractPie(entry);
}
