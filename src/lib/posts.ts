// This file contains the blog posts for the website.
// In a real-world application, this data would likely come from a CMS or a database.

export type Post = {
  title: string;
  slug: string;
  category: string;
  publishedDate: string; // YYYY-MM-DD
  introduction: string;
  mainContent: {
    heading: string;
    paragraphs: string[];
  }[];
  conclusion: string;
};

export const posts: Post[] = [
  {
    title: "Why Metal Roofs in Quispamsis Are No Joke",
    slug: "why-metal-roofs-in-quispamsis-are-no-joke",
    category: "Metal Roofing",
    publishedDate: "2024-07-29",
    introduction: "Why did the roofer break up with the gutter? He said he needed his space! But seriously, when it comes to protecting your home in Quispamsis, a metal roof is the peak of performance.",
    mainContent: [
      {
        heading: "Built to Withstand Maritime Weather",
        paragraphs: [
          "Our weather here in Southern New Brunswick can be a real piece of work. One minute it's sunny, the next it's a nor'easter. A metal roof just laughs it off. It's tough enough to handle heavy snow, ice, and whatever else Mother Nature throws at it. You could say it's got 'ice' credentials.",
          "Unlike asphalt shingles that can get lifted by high winds, interlocking metal panels hold on tight. It’s a commitment that’s stronger than my uncle's commitment to wearing socks with sandals. Now that's what I call a solid relationship!"
        ]
      },
      {
        heading: "Cooler Than the Other Side of the Pillow",
        paragraphs: [
          "A metal roof is a real 'fan' of saving you money. It reflects the sun's rays, which can keep your attic and home cooler in the summer. This means your air conditioner doesn't have to work as hard. I told my AC unit a roofing joke, but it didn't get it... it had no sense of humor, just a lot of cool air.",
          "This energy efficiency is great for your wallet and the environment. It's a win-win, or as I like to say, a 'roof-roof' situation!"
        ]
      },
       {
        heading: "Looks That Are Off the Charts... or Shingles",
        paragraphs: [
          "Let's face it, a metal roof just looks sharp. With a variety of colors available from Dairytown Exteriors, you can make your home the talk of the town, from Rothesay to Saint John. Your neighbors will be 'green' with envy, or maybe 'charcoal grey' depending on your choice.",
          "The sleek lines and modern aesthetic can increase your home's curb appeal and value. It's an investment that's truly 'a-head' of the curve."
        ]
      }
    ],
    conclusion: "So, if you're thinking about a new roof, don't get nailed down by old options. A metal roof is a durable, efficient, and beautiful choice. Why was the roofer so good at his job? Because he always 'nailed' it!"
  },
  {
    title: "Don't Get Nailed: Choosing a Roofer in Saint John",
    slug: "choosing-a-roofer-saint-john",
    category: "Hiring a Contractor",
    publishedDate: "2024-07-22",
    introduction: "What do you call a roofer who can play a musical instrument? A sheet-music-ian! Finding a good roofer in the Saint John area isn't about finding a musician, but you do want someone who orchestrates a project perfectly.",
    mainContent: [
      {
        heading: "Check for License and Insurance",
        paragraphs: [
          "This is non-negotiable. A professional roofer will be fully licensed and insured. This protects you, your home, and the workers on your property. If a contractor can't provide these, you should 'raise the roof' and then show them the door.",
          "At Paul's Roofing, we're fully covered, so the only thing you have to worry about is what to do with all the money you'll save on future repairs. It's a high-stakes game, but we've got you covered... literally."
        ]
      },
      {
        heading: "Look for Local Experience",
        paragraphs: [
          "A roofer from away might not understand the specific challenges of our coastal climate. You need someone who knows the difference between 'a bit of fog' and 'the Fundy fog is rolling in thick.' We've been serving Southern New Brunswick for over 30 years. We've seen it all, and we've roofed it all.",
          "Choosing local means choosing someone who is accountable to the community. We're your neighbors, not just some 'fly-by-night' operation. Get it? 'Fly-by-night'? It's a bird joke... about roofing."
        ]
      }
    ],
    conclusion: "Hiring a roofer is a big decision, but it doesn't have to be a 'pane' in the glass. Do your research, check credentials, and go with a local pro. What's a roofer's favorite tool? A shingle-izer!"
  },
  {
    title: "Asphalt Shingles: The Un-Shingle-ievable Truth",
    slug: "asphalt-shingles-truth",
    category: "Asphalt Shingles",
    publishedDate: "2024-07-15",
    introduction: "I asked my shingles if they were happy. They said, 'We're feeling on top of the world!' And for good reason—modern asphalt shingles from brands like IKO are a fantastic, reliable choice for any home.",
    mainContent: [
      {
        heading: "Not Your Granddad's Shingles",
        paragraphs: [
          "Forget the old, flimsy shingles of the past. Today's architectural shingles are thick, durable, and offer a dimensional look that adds incredible curb appeal. They are designed to resist high winds, which is pretty important around here. They're so tough, I saw one win a staring contest with a seagull.",
          "Plus, with algae-resistant technology, you won't have to worry about those unsightly black streaks. Your roof will look newer, longer. It's what we call a 'streak-free' victory."
        ]
      },
      {
        heading: "A Rainbow of Options (Well, Almost)",
        paragraphs: [
          "The color choices for asphalt shingles are better than ever. From 'Dual Black' to 'Driftwood,' you can find the perfect shade to complement your home's exterior. It's like a fashion show for your house, and the roof is the main event.",
          "Choosing a color can be tough, but don't worry, we're here to help you pick a shade that you'll be 'stuck on' for years to come."
        ]
      }
    ],
    conclusion: "Asphalt shingles offer a great balance of performance, style, and value. They're a classic for a reason. Why don't roofers ever play poker? Because they always have a flush!"
  },
  {
    title: "Is Your Roof Ready for a New Brunswick Winter?",
    slug: "new-brunswick-winter-roof-prep",
    category: "Maintenance",
    publishedDate: "2024-07-08",
    introduction: "Why are roofers always so calm? Because they know how to handle the pressure! As winter approaches in New Brunswick, a little prep work for your roof can save you a lot of stress.",
    mainContent: [
      {
        heading: "Clean Out Those Gutters",
        paragraphs: [
          "If your gutters are full of leaves, they can't do their job. Water can back up and freeze, creating ice dams that can damage your roof and shingles. It's a 'dam' shame if that happens.",
          "Cleaning them out is a 'leaf'-saver. It ensures water can flow freely away from your house, which is exactly where it belongs. Don't be a 'dam' fool, clean your gutters!"
        ]
      },
      {
        heading: "Get a Professional Inspection",
        paragraphs: [
          "Before the snow flies, it's a good idea to have a professional look things over. We can spot small issues, like a loose shingle or cracked flashing, before they become big, expensive problems. It's like a check-up, but for your roof's health.",
          "A small repair now can prevent a major 'leak' in your budget later. We're always 'looking up' for our customers!"
        ]
      }
    ],
    conclusion: "A little fall maintenance goes a long way in protecting your home through our tough winters. Don't get left out in the cold! What did the roof say to the other roof? 'The next round is on the house!'"
  }
];
