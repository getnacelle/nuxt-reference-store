import StoryRouter from 'storybook-vue-router'
import { defaultProduct } from '~/tests/mocks/defaultObjects'

const productArray = [
  defaultProduct,
  defaultProduct,
  defaultProduct,
  defaultProduct,
  defaultProduct,
  defaultProduct
]

const defaultObj = {
  contentful: [
    {
      sys: {
        space: {
          sys: {
            type: 'Link',
            linkType: 'Space',
            id: '9n7z3zrrmdu4'
          }
        },
        id: '1kmqDdWDL4rJQ4wIaAFcZm',
        type: 'Entry',
        createdAt: '2019-08-13T16:55:26.800Z',
        updatedAt: '2019-08-14T18:02:40.667Z',
        environment: {
          sys: {
            id: 'master',
            type: 'Link',
            linkType: 'Environment'
          }
        },
        revision: 7,
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'heroBanner'
          }
        },
        locale: 'en-US'
      },
      fields: {
        contentType: 'ContentHeroBanner',
        title: 'The future of furniture',
        handle: 'the-future-of-furniture',
        subtitle: 'Testing',
        content: {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: 'Test',
                  nodeType: 'text'
                }
              ],
              nodeType: 'paragraph'
            }
          ],
          nodeType: 'document'
        },
        featuredMedia: {
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: '9n7z3zrrmdu4'
              }
            },
            id: '4ykTjR1fM1563524AIRvq2',
            type: 'Asset',
            createdAt: '2019-08-13T16:56:17.128Z',
            updatedAt: '2019-08-16T16:31:37.747Z',
            environment: {
              sys: {
                id: 'master',
                type: 'Link',
                linkType: 'Environment'
              }
            },
            revision: 2,
            locale: 'en-US'
          },
          fields: {
            title: 'jupiter-bed',
            file: {
              url:
                '//images.ctfassets.net/9n7z3zrrmdu4/4ykTjR1fM1563524AIRvq2/59e172a7ab0783ea77a792dcef6faf39/iStock-476157466.jpg',
              details: {
                size: 114815,
                image: {
                  width: 1200,
                  height: 675
                }
              },
              fileName: 'iStock-476157466.jpg',
              contentType: 'image/jpeg'
            }
          }
        },
        publishDate: '2019-08-15T00:00-07:00',
        blogHandle: 'homepage',
        alignment: 'center',
        size: 'medium',
        mobileFullHeight: false,
        mobileBackgroundImage: {
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: '9n7z3zrrmdu4'
              }
            },
            id: '2mri2qBxe39mYOENoIIHTx',
            type: 'Asset',
            createdAt: '2019-08-12T23:34:26.211Z',
            updatedAt: '2019-08-12T23:34:26.211Z',
            environment: {
              sys: {
                id: 'master',
                type: 'Link',
                linkType: 'Environment'
              }
            },
            revision: 1,
            locale: 'en-US'
          },
          fields: {
            title: 'demo-photo1',
            file: {
              url:
                '//images.ctfassets.net/9n7z3zrrmdu4/2mri2qBxe39mYOENoIIHTx/5a453f3dabec858c0090f09b746df307/demo-photo1.jpeg',
              details: {
                size: 124110,
                image: {
                  width: 1200,
                  height: 700
                }
              },
              fileName: 'demo-photo1.jpeg',
              contentType: 'image/jpeg'
            }
          }
        },
        ctaText: 'Shop Now',
        ctaUrl: '/shop'
      }
    },
    {
      sys: {
        space: {
          sys: {
            type: 'Link',
            linkType: 'Space',
            id: '9n7z3zrrmdu4'
          }
        },
        id: '7p0xQtA9OQu1RoUvcsGV02',
        type: 'Entry',
        createdAt: '2019-08-13T23:10:19.358Z',
        updatedAt: '2019-08-13T23:10:19.358Z',
        environment: {
          sys: {
            id: 'master',
            type: 'Link',
            linkType: 'Environment'
          }
        },
        revision: 1,
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'productGrid'
          }
        },
        locale: 'en-US'
      },
      fields: {
        contentType: 'ContentProductGrid',
        title: 'New Arrivals',
        handle: 'new-arrivals',
        columns: 4,
        publishDate: '2019-08-13T00:00-07:00',
        blogHandle: 'homepage'
      }
    },
    {
      sys: {
        space: {
          sys: {
            type: 'Link',
            linkType: 'Space',
            id: '9n7z3zrrmdu4'
          }
        },
        id: '5kbOHEVaQHIbKdiFH7zi2t',
        type: 'Entry',
        createdAt: '2019-08-13T23:09:19.132Z',
        updatedAt: '2019-08-13T23:09:19.132Z',
        environment: {
          sys: {
            id: 'master',
            type: 'Link',
            linkType: 'Environment'
          }
        },
        revision: 1,
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'sideBySide'
          }
        },
        locale: 'en-US'
      },
      fields: {
        contentType: 'ContentSideBySide',
        title: 'Modern Styles',
        handle: 'modern-styles',
        content: {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value:
                    'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
                  nodeType: 'text'
                }
              ],
              nodeType: 'paragraph'
            }
          ],
          nodeType: 'document'
        },
        featuredMedia: {
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: '9n7z3zrrmdu4'
              }
            },
            id: '5YSVUJO2PAFG8lvvCOg1Jd',
            type: 'Asset',
            createdAt: '2019-08-12T23:25:11.194Z',
            updatedAt: '2019-08-12T23:25:11.194Z',
            environment: {
              sys: {
                id: 'master',
                type: 'Link',
                linkType: 'Environment'
              }
            },
            revision: 1,
            locale: 'en-US'
          },
          fields: {
            title: 'demo-photo3',
            file: {
              url:
                '//images.ctfassets.net/9n7z3zrrmdu4/5YSVUJO2PAFG8lvvCOg1Jd/335b6e906be4e5638dc597c41033e4e3/demo-photo3.jpeg',
              details: {
                size: 164105,
                image: {
                  width: 1200,
                  height: 700
                }
              },
              fileName: 'demo-photo3.jpeg',
              contentType: 'image/jpeg'
            }
          }
        },
        publishDate: '2019-08-13T00:00-07:00',
        blogHandle: 'homepage',
        backgroundColor: '#f2eee8',
        ctaText: 'Shop Now',
        ctaUrl: '/shop',
        reverseDesktop: true,
        reverseMobile: false
      }
    }
  ]
}

export default {
  title: 'Components | Content / Page Content',
  decorators: [StoryRouter()]
}

export const ContentfulContent = () => ({
  data() {
    return {
      page: {
        source: 'contentful',
        sections: defaultObj.contentful
      },
      products: productArray
    }
  },
  template: `
    <page-content :page="page" :products="products"/>
  `
})
