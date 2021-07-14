import { withKnobs, text, array } from '@storybook/addon-knobs'
import StoryRouter from 'storybook-vue-router'

export default {
  title: 'Components | Content / Blog / Article Header',
  decorators: [withKnobs, StoryRouter()]
}

export const Default = () => ({
  props: {
    title: {
      default: text('Title', 'Article Title')
    },
    tags: {
      default: array('Tags', [])
    },
    author: {
      default: text('Author', 'Firstname Lastname')
    },
    dateFormat: {
      default: text('Date Format', 'MMMM D, YYYY')
    }
  },
  data() {
    return {
      date: 1593835200
    }
  },
  template: `
    <blog-article-header
      :title="title"
      :author="author"
      :tags="tags"
      :publishDate="date"
      :dateFormatString="dateFormat"
    />
  `
})

Default.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}

export const CustomContent = () => ({
  props: {
    title: {
      default: text('Title', 'Article Title')
    },
    tags: {
      default: array('Tags', [])
    },
    author: {
      default: text('Author', 'Firstname Lastname')
    },
    dateFormat: {
      default: text('Date Format', 'MMMM D, YYYY')
    }
  },
  data() {
    return {
      date: 1593835200
    }
  },
  template: `
    <blog-article-header
      :title="title"
      :author="author"
      :tags="tags"
      :publishDate="date"
      :dateFormatString="dateFormat"
    >
      <template v-slot:title="{ title }">
        <h2>
          Custom: {{ title }}
        </h2>
      </template>
      <template v-slot:date="{ date }">
        <p>{{ date }}</p>
      </template>
      <div>
        <p>Additional Content added below</p>
      </div>
    </blog-article-header>
  `
})

CustomContent.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
