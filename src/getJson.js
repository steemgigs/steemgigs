let generateJson = (arr) => {
  return JSON.stringify(arr.map((x) => {
    let subcategories = []
    x.subcategories.forEach(element => {
      subcategories.push({
        name: element,
        description: ''
      })
    })
    return {
      name: x.name,
      description: x.description,
      subcategories: subcategories
    }
  }), null, 2)
}

let arr = [
  {
    name: 'Graphics & Design',
    description: `Wouldn't want a logo that pinpointly represents You, your story, legacy, vision or brand? Let a steemgigger help!`,
    subcategories: ['logo design', 'business cards and stationery', 'illustration', 'cartoons and carricatures', 'flyers and posters', 'book covers and packaging', 'web and mobile design', 'social media design', 'banner ads', 'photoshop editing', '3D & 2D models', 'T-shirts', 'presentation design', 'infographics', 'vector tracing', 'invitations', 'other']
  },
  {
    name: 'Digital marketing',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['social media marketing', 'SEO', 'content marketing', 'video marketing', 'email marketing', 'search & display marketing', 'marketing strategy', 'web analysis', 'influencer marketing', 'local listings', 'domain research', 'e-commerce marketing', 'mobile advertising', 'music promotion', 'web traffic', 'other']
  },
  {
    name: 'Writing and translation',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['resumes and cover letters', 'proof reading and editing', 'translation', 'creative writing', 'business copywriting', 'research & summaries', 'articles & blog posts', 'press releases', 'transcription', 'legal writing', 'other']
  },
  {
    name: 'Videos and animation',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['whiteboard & animated explainers', 'intros & animated logos', 'promotional videos', 'editing and post production', 'lyric & music video', 'spokeperson videos', 'animated characters & modelling', 'short videos ads', 'live action explainers', 'other']
  },
  {
    name: 'Music & Audio',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['voice over', 'mixing & mastering', 'producers & composers', 'singer-songwriters', 'session musicians & singers', 'jingles and drops', 'sound effects', 'other']
  },
  {
    name: 'Programming & tech',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['wordpress', 'website builders & cms', 'web programming', 'e-commerce', 'mobile apps & web', 'desktop applications', 'support & IT', 'chatbots', 'data analysis & reports', 'convert files', 'databses', 'user testing', 'QA', 'other']
  },
  {
    name: 'Business',
    description: `Slay every meeting with a remarkable first impression. Let us help you create custom business card & stationery designs`,
    subcategories: ['virtual assistant', 'market research', 'business plans', 'branding services', 'legal consulting', 'financial consulting', 'business tips', 'presentations', 'career advice', 'flyer distribution', 'other']
  },
  {
    name: 'Fun & Lifestyle',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['online lessons', 'arts and crafts', 'relationship advice', 'health, nutrition and fitness', 'astrology & readings', 'spiritual & healing', 'family & Genealogy', 'gaming', 'greeting cards & videos', 'your message on ...', 'viral videos', 'pranks & stunts', 'celebrity impersonators', 'collectibles', 'global culture', 'other']
  },
  {
    name: 'Untalented-Steemgigs',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['Photoshop editing', 'Cartoons & Carricatures', 'Flyers And Posters', 'Presentation Design', 'T-shirts', 'Creative Writing', 'Proof Reading And Editing', 'Contests', 'Transcription', 'Translation', 'Intro & Animated Logos', 'Lyric & Music Video', 'Promotional Videos', 'Short Video ADs', 'Singer Song-writers', 'Voice over', 'Jingles And Drops', 'Wordpress', 'Convert Files', 'Virtual Assistant', 'Flyer Distribution', 'Arts And Crafts', 'Relationship Advice', 'Your Message on...', 'Pranks & Stunts', 'Celebrity Impersonators', 'Steem Graphics', 'Steem Tutors']
  },
  {
    name: 'Steem & Steemit',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['Steem projects', 'Curation projects', 'Steem tutors', 'Steem Graphics', 'Steem Coders', 'Steem Coders', 'Steem Veterans', 'Witness services', 'Steem Writers']
  }
]
generateJson(arr)
