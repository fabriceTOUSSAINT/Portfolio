import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import { z } from 'zod'

const posts = defineCollection({
  name: 'posts',
  directory: 'src/content/blog',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    draft: z.boolean().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: 'github-dark',
            keepBackground: false,
          },
        ],
      ],
    })
    return {
      ...document,
      mdx,
      slug: document._meta.path.replace(/\//g, '-'),
    }
  },
})

export default defineConfig({ content: [posts] })
