export default {
  about: {
    sections: [
      {
        type: "heroBanner",
        heading: "About Us",
        text:
          "Vel nunc non ut montes, viverra tempor. Proin lectus nibh phasellus morbi non morbi. In elementum urna ut volutpat. Sagittis et vel et fermentum amet consequat."
      },
      {
        type: "sideBySide",
        image: {
          src:
            "https://tailwindui.com/img/ecommerce-images/incentives-07-hero.jpg",
          alt: "Lorem Ipsum"
        },
        heading: "We built our business on great customer service",
        text:
          "At the beginning at least, but then we realized we could make a lot more money if we kinda stopped caring about that. Our new strategy is to write a bunch of things that look really good in the headlines, then clarify in the small print but hope people don't actually read it."
      },
      {
        type: "promoStrip",
        image: {
          src:
            "https://tailwindui.com/img/ecommerce-images/home-page-03-feature-section-full-width.jpg",
          alt: "Lorem Ipsum"
        },
        heading: "Our Mission",
        text:
          "Vel nunc non ut montes, viverra tempor. Proin lectus nibh phasellus morbi non morbi. In elementum urna ut volutpat. Sagittis et vel et fermentum amet consequat."
      },
      {
        type: "teamBios",
        heading: "Our Team",
        members: [
          {
            image: {
              src:
                "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
            },
            name: "Whitney Francis",
            role: "Copyrighter",
            bio:
              "Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum."
          },
          {
            image: {
              src:
                "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
            },
            name: "Leonard Krasner",
            role: "Senior Designer",
            bio:
              "Turpis lectus et amet elementum. Mi duis integer sed in vitae consequat. Nam vitae, in felis mi dui tempus. Porta at turpis eu odio. Et, sed duis in blandit bibendum accumsan. Purus viverra facilisi suspendisse quis est."
          },
          {
            image: {
              src:
                "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
            },
            name: "Floyd Miles",
            role: "Principal Designer",
            bio:
              "Aliquet adipiscing lectus praesent cras sed quis lectus egestas erat. Bibendum curabitur eget habitant feugiat nec faucibus eu lorem suscipit. Vitae vitae tempor enim eget lacus nulla leo."
          },
          {
            image: {
              src:
                "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
            },
            name: "Emily Selman",
            role: "VP, User Experience",
            bio:
              "Quis bibendum velit diam tellus sed ut. Faucibus posuere enim, vitae enim eget neque tortor. Metus lectus mattis id id. Tellus ornare etiam id velit ut enim lacinia congue ultrices. Sit morbi vel elit a maecenas mauris elit lectus magna."
          }
        ]
      },
      {
        type: "ctaStrip",
        image: {
          src:
            "https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg",
          alt: "Lorem Ipsum"
        },
        heading: "Want beleive in timeless quality",
        text:
          "Most of our products are limited releases that won't come back. Get your favorite items while they're in stock.",
        link: {
          text: "Get yours now",
          url: "/"
        }
      }
    ]
  },
  contact: {
    sections: [
      {
        type: "heroBanner",
        heading: "Contact Us",
        text:
          "Vel nunc non ut montes, viverra tempor. Proin lectus nibh phasellus morbi non morbi. In elementum urna ut volutpat. Sagittis et vel et fermentum amet consequat."
      },
      {
        type: "contactForm",
        name: "Full Name",
        email: "Email",
        phone: "Phone",
        message: "Message",
        button: "Submit",
        success: "Thanks for contacting us! We will be in touch shortly."
      }
    ]
  },
  homepage: {
    sections: [
      {
        type: "hero",
        image: {
          src: "https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg",
          alt: "hero image"
        },
        heading: "New arrivals are here",
        text: "The new arrivals have, well, newly arrived. Check out the latest options from our summer small-batch release while they're still in stock.",
        cta: {
          label: "Shop New Arrivals",
          url: "/"
        }
      },
      {
        type: "featuredProducts",
        heading: "Our Favorites",
        cta: {
          label: "Browse all favorites",
          url: "/"
        },
        products: [
          {
            id: 1,
            title: 'Earthen Bottle',
            handle: '#',
            price: '48.0',
            image: {
              src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
              alt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
            }
          },
          {
            id: 2,
            title: 'Nomad Tumbler',
            handle: '#',
            price: '35.0',
            image: {
              src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
              alt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
            }
          },
          {
            id: 3,
            title: 'Focus Paper Refill',
            handle: '#',
            price: '89.0',
            image: {
              src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
              alt: 'Person using a pen to cross a task off a productivity paper card.',
            }
          },
          {
            id: 4,
            title: 'Machined Mechanical Pencil',
            handle: '#',
            price: '35.0',
            image: {
              src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
              alt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
            }
          },
        ]
      },
      {
        type: "sideBySide",
        layout: "image-left",
        image: {
          src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
          alt: "side by side image"
        },
        heading: "Our Process",
        subheading: "Work with us",
        text: "Semper curabitur ullamcorper posuere nunc sed. Ornare iaculis bibendum malesuada faucibus lacinia porttitor. Pulvinar laoreet sagittis viverra duis. In venenatis sem arcu pretium pharetra at. Lectus viverra dui tellus ornare pharetra.",
        cta: {
          label: "Get Started",
          url: "/",
        },
      },
      {
        type: "featuredProducts",
        heading: "Our Other Favorites",
        cta: {
          label: "Browse all other favorites",
          url: "/"
        },
        products: [
          {
            id: 1,
            title: 'Earthen Bottle',
            handle: '#',
            price: '48.0',
            image: {
              src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
              alt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
            }
          },
          {
            id: 2,
            title: 'Nomad Tumbler',
            handle: '#',
            price: '35.0',
            image: {
              src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
              alt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
            }
          },
          {
            id: 3,
            title: 'Focus Paper Refill',
            handle: '#',
            price: '89.0',
            image: {
              src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
              alt: 'Person using a pen to cross a task off a productivity paper card.',
            }
          },
          {
            id: 4,
            title: 'Machined Mechanical Pencil',
            handle: '#',
            price: '35.0',
            image: {
              src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
              alt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
            }
          },
        ]
      },
      {
        type: "sideBySide",
        layout: "image-right",
        image: {
          src: "https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg",
          alt: "side by side image"
        },
        heading: "New Arrivals Are Here",
        subheading: "",
        text: "The new arrivals have, well, newly arrived. Check out the latest options from our summer small-batch release while they're still in stock.",
        cta: {
          label: "Shop New Arrvials",
          url: "/",
        },
      },
      {
        type: "featuredProducts",
        heading: "Our Final Favorites",
        cta: {
          label: "Browse all final favorites",
          url: "/"
        },
        products: [
          {
            id: 1,
            title: 'Earthen Bottle',
            handle: '#',
            price: '48.0',
            image: {
              src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
              alt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
            }
          },
          {
            id: 2,
            title: 'Nomad Tumbler',
            handle: '#',
            price: '35.0',
            image: {
              src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
              alt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
            }
          },
          {
            id: 3,
            title: 'Focus Paper Refill',
            handle: '#',
            price: '89.0',
            image: {
              src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
              alt: 'Person using a pen to cross a task off a productivity paper card.',
            }
          },
          {
            id: 4,
            title: 'Machined Mechanical Pencil',
            handle: '#',
            price: '35.0',
            image: {
              src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
              alt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
            }
          },
        ]
      },
      {
        type: "newsletter",
        heading: "Sign up for our newsletter",
        text: "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat.",
        label: "Email address",
        placeholder: "Enter your email",
        cta: {
          label: "Notify me"
        }
      },
    ]
  }
};
