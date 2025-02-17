import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      source: "posts/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        tags: z.array(z.string()),
        navigation: z.boolean(),
        image: z.string(),
        date: z.string(),
      }),
    }),
  },
});
