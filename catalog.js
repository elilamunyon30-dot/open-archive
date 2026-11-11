/*
  YOUR CONTENT LIVES HERE.
  Add or edit the objects in `works` to publish your books, games, and music.
  The site will automatically create searchable cards for them.

  For an item to have a working Play / Read / Listen button:
    status: "published",
    url: "https://..."        (or "games/my-game/index.html", "books/my-book.pdf")

  Keep status: "coming-soon" and url: "" until the file or link is ready.
  Item types: "games", "books", "music"
  Accent colors: "lime", "purple", "orange", "blue", "rose", "yellow"
*/
window.ARCHIVE = {
  site: {
    name: "The Open Archive",
    intro: "A home for the games, stories, and music I create. Come in, explore, and find something worth keeping.",
    about: "Some ideas turn into games. Some become books. Some need to be songs. This is where they all live together."
  },
  works: [
    {
      id: "minehunt",
      type: "games",
      title: "Minehunt",
      description: "A turn-based logic puzzle. The mines move after you dig — find them, track them, and capture them before you run out of lives.",
      tags: ["Puzzle", "Strategy", "Browser game"],
      accent: "lime",
      status: "coming-soon",
      url: ""
    },
    {
      id: "number-snake",
      type: "games",
      title: "3D Number Snake",
      description: "Reconstruct a hidden path through a three-dimensional grid using only clues about how many times each cell was crossed.",
      tags: ["3D", "Deduction", "Puzzle"],
      accent: "purple",
      status: "coming-soon",
      url: ""
    },
    {
      id: "still-not-dead",
      type: "music",
      title: "I'm Still Not Dead",
      description: "An epic anthem about refusing to give up, even when life makes you fight for every inch.",
      tags: ["Anthem", "Suno"],
      accent: "orange",
      status: "coming-soon",
      url: ""
    },
    {
      id: "anthem-of-hope",
      type: "music",
      title: "Anthem of Hope",
      description: "Tie a knot in the rope. Draw a circle in the sand. Let change begin here, and make the pain mean something.",
      tags: ["Hope", "Suno"],
      accent: "blue",
      status: "coming-soon",
      url: ""
    }

    /* ADD YOUR FIRST BOOK LIKE THIS (remove the surrounding comment):
    ,{
      id: "my-first-book",
      type: "books",
      title: "My First Book",
      description: "A short description of the story or book.",
      tags: ["PDF", "Fiction"],
      accent: "rose",
      status: "published",
      url: "books/my-first-book.pdf"
    }
    */
  ]
};
