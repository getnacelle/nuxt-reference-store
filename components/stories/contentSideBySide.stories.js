import { withKnobs, text, boolean } from '@storybook/addon-knobs'

export default {
  title: 'Components | Content / Side by Side',
  decorators: [withKnobs]
}

export const Default = () => ({
  props: {
    imageUrl: {
      default: text('Image Url', 'https://placehold.it/800x800')
    },
    title: {
      default: text('Title', 'Section Title')
    },
    contentHtml: {
      default: text('Copy', 'Lorem ipsum dolor set...')
    },
    ctaText: {
      default: text('CTA Text', 'Action')
    },
    backgroundColor: {
      default: text('Background Color', '')
    },
    reverseDesktop: {
      default: boolean('Reverse Desktop', false)
    },
    reverseMobile: {
      default: boolean('Reverse Mobile', false)
    }
  },
  template: `
    <content-side-by-side
      :featuredMedia="{fields: {file:{url: 'http://images.ctfassets.net/9n7z3zrrmdu4/4ykTjR1fM1563524AIRvq2/59e172a7ab0783ea77a792dcef6faf39/iStock-476157466.jpg'} }}"
      :title="title"
      :contentHtml="contentHtml"
      :ctaText="ctaText"
      :backgroundColor="backgroundColor"
      :reverseDesktop="reverseDesktop"
      :reverseMobile="reverseMobile"
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
