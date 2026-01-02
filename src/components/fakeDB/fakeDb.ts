export const fakeDb = {
  services: [
    {
      id: 1,
      title: "Facility Management",
      description: "Involves the effective coordination of people, processes, and physical spaces to ensure that buildings and infrastructure operate efficiently.",
      image: "/assets/images/service_data_1.png"
    },
    {
      id: 2,
      title: "Project Management and Construction Management",
      description: "This ensure successful planning and execution of projects, particularly in the construction and infrastructure sectors.",
      image: "/assets/images/service_data_2.png"
    },
    {
      id: 3,
      title: "Property Management and Property Listing",
      description: "This allows agents, developers, and property owners to showcase residential, commercial, or short-let properties to a wide audience with ease.",
      image: "/assets/images/service_data_3.png"
    },
    {
      id: 4,
      title: "Facility Management",
      description: "Involves the effective coordination of people, processes, and physical spaces to ensure that buildings and infrastructure operate efficiently.",
      image: "/assets/images/service_data_1.png"
    },
  ],
  listings: [
    {
      id: 1,
      name: "Bentley Estate",
      type: "Villa",
      price: "₦ 14,999,732.00",
      beds: 4,
      baths: 3,
      location: "Kigali",
      description: "Felis sed amet eget aliquam cursus placerat. Risus morbi arut sed cursibhur auismod a odio magna condimentum.",
      category: "Sell",
      subCategory: "Luxurious",
      image: "/assets/images/listing_data_1.png"
    },
    {
      id: 2,
      name: "Ambassador",
      type: "Villa",
      price: "₦ 22,999,732.00",
      beds: 3,
      baths: 2,
      location: "Kigali",
      description: "Felis sed amet eget aliquam cursus placerat. Risus morbi arut sed cursibhur auismod a odio magna condimentum.",
      category: "Lease",
      subCategory: "Luxurious",
      image: "/assets/images/listing_data_2.png"
    },
    {
      id: 3,
      name: "Ambassador",
      type: "Apartment",
      price: "₦ 29,999,732.00",
      beds: 2,
      baths: 2,
      location: "Kigali",
      description: "Felis sed amet eget aliquam cursus placerat. Risus morbi arut sed cursibhur auismod a odio magna condimentum.",
      category: "Lease",
      subCategory: "Luxurious",
      image: "/assets/images/listing_data_3.png"
    },
    {
      id: 4,
      name: "Bentley Estate",
      type: "Villa",
      price: "₦ 14,999,732.00",
      beds: 4,
      baths: 3,
      location: "Kigali",
      description: "Felis sed amet eget aliquam cursus placerat. Risus morbi arut sed cursibhur auismod a odio magna condimentum.",
      category: "Rent",
      subCategory: "Ultra-Luxurious",
      image: "/assets/images/listing_data_4.png"
    },
    {
      id: 5,
      name: "Bentley Estate",
      type: "House",
      price: "₦ 14,999,732.00",
      beds: 3,
      baths: 2,
      location: "Kigali",
      description: "Felis sed amet eget aliquam cursus placerat. Risus morbi arut sed cursibhur auismod a odio magna condimentum.",
      category: "Rent",
      subCategory: "Ultra-Luxurious",
      image: "/assets/images/listing_data_5.png"
    },
    {
      id: 6,
      name: "Bentley Estate",
      type: "Villa",
      price: "₦ 14,999,732.00",
      beds: 4,
      baths: 3,
      location: "Kigali",
      description: "Felis sed amet eget aliquam cursus placerat. Risus morbi arut sed cursibhur auismod a odio magna condimentum.",
      category: "Rent",
      subCategory: "Ultra-Luxurious",
      image: "/assets/images/listing_data_6.png"
    },
    {
      id: 7,
      name: "Bentley Estate",
      type: "Apartment",
      price: "₦ 14,999,732.00",
      beds: 2,
      baths: 2,
      location: "Kigali",
      description: "Felis sed amet eget aliquam cursus placerat. Risus morbi arut sed cursibhur auismod a odio magna condimentum.",
      category: "Rent",
      subCategory: "Ultra-Luxurious",
      image: "/assets/images/listing_data_7.png"
    },
    {
      id: 8,
      name: "Bentley Estate",
      type: "Villa",
      price: "₦ 14,999,732.00",
      beds: 4,
      baths: 3,
      location: "Kigali",
      description: "Felis sed amet eget aliquam cursus placerat. Risus morbi arut sed cursibhur auismod a odio magna condimentum.",
      category: "Sell",
      subCategory: "Luxurious",
      image: "/assets/images/listing_data_8.png"
    }
  ],
  propertyMedia: [
    {
      listingId: 1,
      media: [
        {
          id: 'img-0',
          url: '/fakeDB/listing_data_1.png',
          thumbnail: '/fakeDB/listing_data_1.png',
          mediaType: 'image',
          title: '',
        },
        {
          id: 'img-1',
          url: '/fakeDB/listing_data_2.png',
          thumbnail: '/fakeDB/listing_data_2.png',
          mediaType: 'image',
          title: '',
        },
        {
          id: 'img-2',
          url: '/fakeDB/listing_data_3.png',
          thumbnail: '/fakeDB/listing_data_3.png',
          mediaType: 'image',
          title: '',
        },
        {
          id: 'img-3',
          url: '/fakeDB/listing_data_4.png',
          thumbnail: '/fakeDB/listing_data_4.png',
          mediaType: 'image',
          title: '',
        },
        {
          id: 'vid-1',
          url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          thumbnail: '/fakeDB/listing_data_1.png',
          mediaType: 'video',
          title: 'Hillary Court Lagos Walkthrough',
        },
        {
          id: 'vid-2',
          url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          thumbnail: '/fakeDB/listing_data_2.png',
          mediaType: 'video',
          title: 'Amenities Tour',
        },
      ],
    },
  ],
  faqs: [
    {
      id: 1,
      question: "Who can use this platform?",
      answer: "Our platform is designed for residents, property developers, agents, facility managers, logistics providers, event organizers, and more— connecting them to services, listings, and project opportunities."
    },
    {
      id: 2,
      question: "Is subscription required for all services?",
      answer: "No, basic services are free to use. However, premium features like advanced project management tools, priority listing placement, and investment analytics require a subscription for enhanced functionality and exclusive access."
    },
    {
      id: 3,
      question: "Can I manage multiple services under one account?",
      answer: "Yes, absolutely! You can manage multiple services including property listings, facility management, project management, and event coordination all from a single dashboard with your unified account."
    },
    {
      id: 4,
      question: "How do I create a wallet?",
      answer: "Creating a wallet is simple. Go to your account settings, click on 'Payment & Wallet', then 'Create Wallet'. Follow the verification steps, and you'll be ready to make secure transactions on the platform."
    },
    {
      id: 5,
      question: "Who are the users of the Facility Management service?",
      answer: "Facility Management service is used by property owners, building managers, maintenance teams, tenants, and service providers who need to coordinate building operations, maintenance schedules, and facility resources efficiently."
    },
    {
      id: 6,
      question: "Is project management available now?",
      answer: "Yes, our project management feature is fully available! You can create projects, track progress, manage teams, allocate resources, and monitor timelines. Both basic and advanced project management tools are ready to use."
    },
    {
      id: 7,
      question: "Can I list my property on the platform?",
      answer: "Absolutely! Property listing is one of our core features. You can list residential, commercial, or short-let properties with detailed descriptions, photos, pricing, and availability. Our platform connects you with potential buyers, renters, and investors."
    }
  ],
  testimonials: [
    {
      id: 1,
      text: "Managing my residential estate has never been easier. The facility management feature helps us stay organized and responsive—residents are happier too!",
      author: "Daniel Samuel",
      role: "Estate Manager",
      avatar: "/assets/avatars/daniel.jpg"
    },
    {
      id: 2,
      text: "I use the logistics module for my delivery business, and the integrated insurance gives me peace of mind on every trip",
      author: "Fatima Y",
      role: "Logistics Manager",
      avatar: "/assets/avatars/fatima.jpg"
    },
    {
      id: 3,
      text: "The project management tools streamline communication between our teams and make project timelines so much more transparent.",
      author: "Emeka",
      role: "Construction Manager",
      avatar: "/assets/avatars/emeka.jpg"
    },
    {
      id: 4,
      text: "Amazing property management that has made my life so much easier. The team is professional and responsive to all needs.",
      author: "Sarah Johnson",
      role: "Property Owner",
      avatar: "/assets/avatars/sarah.jpg"
    },
    {
      id: 5,
      text: "The platform's event management features helped us organize our cultural festival seamlessly. Everything was coordinated perfectly!",
      author: "Kwame Asante",
      role: "Event Organizer",
      avatar: "/assets/avatars/kwame.jpg"
    },
    {
      id: 6,
      text: "As a real estate agent, the listing tools and lead management system have significantly improved my business efficiency.",
      author: "Aisha Okafor",
      role: "Real Estate Agent",
      avatar: "/assets/avatars/aisha.jpg"
    }
  ],
  teams: [
    {
      id: 1,
      name: "Mrs Charles John",
      role: "Chairman/Chief Executive Officer",
      image: "/assets/images/charles.png",
      bio: "Lorem ipsum dolor sit amet consectetur. Rhoncus scelerisque mollis mauris faucibus. Id magna rhoncus magna sagittis tristique pretium mauris libero. Fermentum sed posuere sit volutpate amet. Eget dis proin nunc mollibitum quis dignissim nulla cursus magna. Interdum scelerisque sed elit tempus in nunc nulla dolor sem. Ut nunc aliquam arcu amet nisl neque commodo ut vestibulum. Tellus velit lacus tristique leo eisu elit. Auctor suscipit elit tincidunt molestae ut magna vel ultrices ante. Facilisi cursus lorem sit placis. A nisl tincidunt lacus venenatis arcs. Nisl id ante nibsan purus pretium risqui condimentum blandit. Tempus faucibus imperdiet odio enus cursus elementum. Justo nibh blandit donec ullamcorper massa nu quentla libero. In ex est magna ullam lacells volutpate odales nunc nulla. Mauris elementum vivulo ipsum et libero cursque molid artu."
    },
    {
      id: 2,
      name: "Mr Samuel Nuel",
      role: "Chairman/Chief Executive Officer",
      image: "/assets/images/samuel.png",
      bio: "Lorem ipsum dolor sit amet consectetur. Rhoncus scelerisque mollis mauris faucibus. Id magna rhoncus magna sagittis tristique pretium mauris libero. Fermentum sed posuere sit volutpate amet. Eget dis proin nunc mollibitum quis dignissim nulla cursus magna. Interdum scelerisque sed elit tempus in nunc nulla dolor sem. Ut nunc aliquam arcu amet nisl neque commodo ut vestibulum. Tellus velit lacus tristique leo eisu elit. Auctor suscipit elit tincidunt molestae ut magna vel ultrices ante. Facilisi cursus lorem sit placis. A nisl tincidunt lacus venenatis arcs. Nisl id ante nibsan purus pretium risqui condimentum blandit. Tempus faucibus imperdiet odio enus cursus elementum. Justo nibh blandit donec ullamcorper massa nu quentla libero. In ex est magna ullam lacells volutpate odales nunc nulla. Mauris elementum vivulo ipsum et libero cursque molid artu."
    }
  ],
  stats: [
    {
      id: 1,
      value: "1000+",
      label: "Homes Built",
      icon: "/assets/icons/home.png"
    },
    {
      id: 2,
      value: "100+",
      label: "Projects",
      icon: "/assets/icons/project.png"
    },
    {
      id: 3,
      value: "1000+",
      label: "Global Clients",
      icon: "/assets/icons/client.png"
    },
    {
      id: 4,
      value: "100+",
      label: "Businesses",
      icon: "/assets/icons/business.png"
    }
  ],
  timelinePosts: [
    {
      id: 1,
      user: {
        name: "John Smith",
        avatar: "/assets/avatars/john.jpg",
        role: "Property Manager"
      },
      content: "Just completed another successful property inspection at Bentley Estate. The facility management system has made our workflow incredibly efficient! 🏠✨",
      timestamp: "2024-01-15T10:30:00Z",
      likes: 24,
      comments: [
        {
          id: 1,
          user: { 
            name: 'Charles Bankole', 
            avatar: '/fakeDB/images/charles.png' 
          },
          date: '2024-01-15T11:00:00Z',
          content: 'Great work on the property inspection! The attention to detail really shows.',
          likes: 12,
          replies: 2,
          showLike: true,
          showHeart: true,
        },
        {
          id: 2,
          user: { 
            name: 'Janeth Felix', 
            avatar: '/fakeDB/images/samuel.png' 
          },
          date: '2024-01-15T12:30:00Z',
          content: 'This facility management system has revolutionized how we handle property maintenance.',
          likes: 8,
          replies: 0,
          showLike: false,
          showHeart: true,
        }
      ],
      shares: 3,
      image: "/fakeDB/images/listing_data_1.png",
      type: "property_update"
    },
    {
      id: 2,
      user: {
        name: "Sarah Johnson",
        avatar: "/assets/avatars/sarah.jpg",
        role: "Real Estate Agent"
      },
      content: "Exciting news! 🎉 We just listed a beautiful 4-bedroom villa in Kigali. The property features modern amenities and stunning views. Contact me for more details!",
      timestamp: "2024-01-14T15:45:00Z",
      likes: 18,
      comments: [
        {
          id: 3,
          user: { 
            name: 'Michael Chen', 
            avatar: '/assets/images/charles.png' 
          },
          date: '2024-01-14T16:00:00Z',
          content: 'Beautiful property! Is it still available for viewing?',
          likes: 5,
          replies: 1,
          showLike: true,
          showHeart: false,
        },
        {
          id: 4,
          user: { 
            name: 'Aisha Okafor', 
            avatar: '/assets/images/samuel.png' 
          },
          date: '2024-01-14T17:15:00Z',
          content: 'The location in Kigali is perfect for families. Great listing!',
          likes: 15,
          replies: 3,
          showLike: true,
          showHeart: true,
        }
      ],
      shares: 12,
      image: "/fakeDB/listing_data_2.png",
      type: "new_listing"
    },
    {
      id: 3,
      user: {
        name: "David Wilson",
        avatar: "/assets/avatars/david.jpg",
        role: "Construction Manager"
      },
      content: "Project milestone achieved! Our team has successfully completed phase 1 of the Ambassador development. The project management tools on this platform have been game-changing for coordination.",
      timestamp: "2024-01-13T09:15:00Z",
      likes: 31,
      comments: [],
      shares: 7,
      images: [
        "/fakeDB/listing_data_1.png",
        "/fakeDB/listing_data_2.png", 
        "/fakeDB/listing_data_3.png"
      ],
      type: "project_update"
    },
    {
      id: 4,
      user: {
        name: "Fatima Hassan",
        avatar: "/assets/avatars/fatima.jpg",
        role: "Logistics Manager"
      },
      content: "Successfully delivered building materials to 3 construction sites today. The integrated logistics and insurance features give me complete peace of mind. Great platform! 🚛📦",
      timestamp: "2024-01-12T16:20:00Z",
      likes: 15,
      comments: [],
      shares: 2,
      type: "logistics_update"
    },
    {
      id: 5,
      user: {
        name: "Michael Chen",
        avatar: "/assets/avatars/michael.jpg",
        role: "Facility Manager"
      },
      content: "Maintenance team responded within 30 minutes to a service request today. Our facility management system keeps everything running smoothly. Residents are happy! 👷‍♂️",
      timestamp: "2024-01-11T11:00:00Z",
      likes: 22,
      comments: [],
      shares: 1,
      type: "maintenance_update"
    },
    {
      id: 6,
      user: {
        name: "Aisha Okafor",
        avatar: "/assets/avatars/aisha.jpg",
        role: "Event Organizer"
      },
      content: "Planning an amazing community event at the Ambassador complex next month! The event management features make organizing so much easier. Stay tuned for details! 🎪🎊",
      timestamp: "2024-01-10T14:30:00Z",
      likes: 28,
      comments: [],
      shares: 9,
      image: "/fakeDB/listing_data_3.png",
      type: "event_announcement"
    },
    {
      id: 7,
      user: {
        name: "Robert Anderson",
        avatar: "/assets/avatars/robert.jpg",
        role: "Property Developer"
      },
      content: "Breaking ground on our newest luxury development project! This will feature 50 premium units with state-of-the-art facilities. Exciting times ahead! 🏗️",
      timestamp: "2024-01-09T08:45:00Z",
      likes: 45,
      comments: [],
      shares: 15,
      images: [
        "/fakeDB/listing_data_4.png",
        "/fakeDB/listing_data_5.png"
      ],
      type: "development_news"
    },
    {
      id: 8,
      user: {
        name: "Emma Thompson",
        avatar: "/assets/avatars/emma.jpg",
        role: "Property Owner"
      },
      content: "Thank you to the amazing maintenance team for the quick response to our heating issue. The facility management service is top-notch! ⭐⭐⭐⭐⭐",
      timestamp: "2024-01-08T13:15:00Z",
      likes: 19,
      comments: [],
      shares: 2,
      type: "testimonial"
    },
    {
      id: 9,
      user: {
        name: "Benita Hellen",
        avatar: "/assets/avatars/benita.jpg",
        role: "Site Engineer"
      },
      content: "Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.amet eget aliquam cursus placerat.",
      timestamp: "2025-06-16T10:30:00Z",
      likes: 240,
      comments: [
        {
          id: 5,
          user: { 
            name: 'Charles Bankole', 
            avatar: '/fakeDB/charles.png' 
          },
          date: '2025-06-16T11:00:00Z',
          content: 'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.amet eget aliquam cursus placerat.',
          likes: 20,
          replies: 2,
          showLike: true,
          showHeart: true,
        },
        {
          id: 6,
          user: { 
            name: 'Janeth Felix', 
            avatar: '/fakeDB/samuel.png' 
          },
          date: '2025-06-16T12:30:00Z',
          content: 'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
          likes: 20,
          replies: 0,
          showLike: false,
          showHeart: true,
        },
        {
          id: 7,
          user: { 
            name: 'Kabiru John', 
            avatar: '/fakeDB/charles.png' 
          },
          date: '2025-06-17T09:00:00Z',
          content: 'Risus morbi erat sed curabitur euismod a odio magna condimentum.',
          likes: 20,
          replies: 0,
          showLike: true,
          showHeart: false,
        }
      ],
      shares: 15,
      images: [
        "/fakeDB/listing_data_6.png",
        "/fakeDB/listing_data_7.png",
        "/fakeDB/listing_data_8.png"
      ],
      type: "construction_update"
    }
  ],
  postComments: {
    1: [
      {
        id: 1,
        user: { 
          name: 'Charles Bankole', 
          avatar: '/assets/images/charles.png' 
        },
        date: '2024-01-15T11:00:00Z',
        content: 'Great work on the property inspection! The attention to detail really shows.',
        likes: 12,
        replies: 2,
        showLike: true,
        showHeart: true,
      },
      {
        id: 2,
        user: { 
          name: 'Janeth Felix', 
          avatar: '/assets/images/samuel.png' 
        },
        date: '2024-01-15T12:30:00Z',
        content: 'This facility management system has revolutionized how we handle property maintenance.',
        likes: 8,
        replies: 0,
        showLike: false,
        showHeart: true,
      }
    ],
    2: [
      {
        id: 3,
        user: { 
          name: 'Michael Chen', 
          avatar: '/assets/images/charles.png' 
        },
        date: '2024-01-14T16:00:00Z',
        content: 'Beautiful property! Is it still available for viewing?',
        likes: 5,
        replies: 1,
        showLike: true,
        showHeart: false,
      },
      {
        id: 4,
        user: { 
          name: 'Aisha Okafor', 
          avatar: '/fakeDB/images/samuel.png' 
        },
        date: '2024-01-14T17:15:00Z',
        content: 'The location in Kigali is perfect for families. Great listing!',
        likes: 15,
        replies: 3,
        showLike: true,
        showHeart: true,
      }
    ],
    9: [
      {
        id: 5,
        user: { 
          name: 'Charles Bankole', 
          avatar: '/fakeDB/images/charles.png' 
        },
        date: '2025-06-16T11:00:00Z',
        content: 'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.amet eget aliquam cursus placerat.',
        likes: 20,
        replies: 2,
        showLike: true,
        showHeart: true,
      },
      {
        id: 6,
        user: { 
          name: 'Janeth Felix', 
          avatar: '/fakeDB/images/samuel.png' 
        },
        date: '2025-06-16T12:30:00Z',
        content: 'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        likes: 20,
        replies: 0,
        showLike: false,
        showHeart: true,
      },
      {
        id: 7,
        user: { 
          name: 'Kabiru John', 
          avatar: '/fakeDB/images/charles.png' 
        },
        date: '2025-06-17T09:00:00Z',
        content: 'Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        likes: 20,
        replies: 0,
        showLike: true,
        showHeart: false,
      }
    ]
  }
};
