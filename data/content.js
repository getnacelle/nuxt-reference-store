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
};
