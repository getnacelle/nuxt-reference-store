import { contentfulArticle } from '../../tests/mocks/defaultObjects'

export const Contentful = () => ({
  data() {
    return {
      article: contentfulArticle
    }
  },
  template: `
    <blog-article-content
      :article="article"
    />
  `
})

Contentful.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}

export const Customized = () => ({
  data() {
    return {
      article: contentfulArticle
    }
  },
  template: `
    <blog-article-content :article="article">
      <div>
        <h1 class="title">This is extra content appended to the article</h1>
      </div>
    </blog-article-content>
  `
})

Customized.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
