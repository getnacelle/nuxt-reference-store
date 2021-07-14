const defaults = {
  imageUrl:
    'http://images.ctfassets.net/9n7z3zrrmdu4/4ykTjR1fM1563524AIRvq2/59e172a7ab0783ea77a792dcef6faf39/iStock-476157466.jpg  ',
  title: 'Hero Title',
  subtitle: 'Subtitle copy text',
  ctaText: 'CTA BUTTON'
}

export default {
  title: 'Components | Content / Hero Banner'
}

export const Default = () => ({
  data() {
    return {
      ...defaults
    }
  },
  template: `
    <content-hero-banner
    :featuredMedia="{fields: {file:{url: 'http://images.ctfassets.net/9n7z3zrrmdu4/4ykTjR1fM1563524AIRvq2/59e172a7ab0783ea77a792dcef6faf39/iStock-476157466.jpg'} }}"

      :title="title"
      :subtitle="subtitle"
      :ctaText="ctaText"
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
