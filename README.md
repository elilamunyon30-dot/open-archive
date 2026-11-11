# The Open Archive — your free games, books, and music site

A complete static website: no subscriptions, ads, accounts, databases, frameworks, or build steps. Visitors can browse on desktop or mobile and search/filter games, books, and Suno songs.

## Preview before publishing

Double-click `index.html` on your computer. It works offline. The four sample listings are marked "Coming soon" until you supply working links. No playable games or actual audio/books are included in this starter package.

## 1. Add your creations

Open **`catalog.js`** in a text editor. Every item is inside `works: [ ... ]`.

- **Games:** Set `type: "games"`, `status: "published"`, and `url: "games/my-game/index.html"` for a game uploaded to that folder, or a full `https://` URL to a game hosted elsewhere. You can upload HTML/CSS/JS game folders directly into `games/`.
- **Books:** Set `type: "books"`, `status: "published"`, and `url: "books/my-book.pdf"` for a PDF in the `books/` folder (or link to a reader page elsewhere). The browser will let visitors read or download PDF files.
- **Songs:** Set `type: "music"`, `status: "published"`, and `url: "https://suno.com/song/..."` (your actual Suno share link). Visitors click **Listen now** and land on the song. On Suno, use **Share → Copy Link**. You can keep the song link-only or publish it to your Suno profile.

Each published item requires a working `url`. The site will never show a broken action button for an unpublished item. If an entry is not ready, use `status: "coming-soon"` with `url: ""`.

To add more entries, copy a whole `{ ... }` item, paste it after a comma, and edit its fields. Choose an `accent` from `lime`, `purple`, `orange`, `blue`, `rose`, `yellow`. To customize the introduction and about section, edit the `site` object at the top of `catalog.js`.

### Example: a playable game

```js
{
  id: "my-new-game",
  type: "games",
  title: "My New Game",
  description: "Can you beat the puzzle?",
  tags: ["Puzzle", "Mobile-friendly"],
  accent: "lime",
  status: "published",
  url: "games/my-new-game/index.html"
}
```

### Example: a Suno song

```js
{
  id: "my-song",
  type: "music",
  title: "My Song",
  description: "A song about starting again.",
  tags: ["Anthem", "Suno"],
  accent: "orange",
  status: "published",
  url: "https://suno.com/song/YOUR-REAL-SONG-ID"
}
```

### Example: a readable book

```js
{
  id: "my-book",
  type: "books",
  title: "My Book",
  description: "A new world to discover.",
  tags: ["Fantasy", "PDF"],
  accent: "rose",
  status: "published",
  url: "books/my-book.pdf"
}
```

## 2. Put it on the public internet for $0 with GitHub Pages

1. Sign in to your GitHub account at https://github.com/new and create a **Public** repository. You can name it `open-archive`.
2. Extract this ZIP. In the new repository, click **Add file → Upload files**. Upload **the contents** of this extracted folder (the `index.html`, `styles.css`, `app.js`, `catalog.js`, `assets` directory, etc.), not the outer folder and not just the ZIP. Commit the files.
3. Select **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**; set branch `main`, folder `/ (root)`, and save.
4. Your free public website will be at `https://YOUR-GITHUB-USERNAME.github.io/open-archive/` (substitute your username and chosen repository name). GitHub may take several minutes to publish.
5. To make changes later, edit `catalog.js` on GitHub and commit. Updates will republish automatically.

Important: On GitHub Free, a Pages source repository must be public, so do not upload private files or secrets. GitHub Pages is intended for small, public static websites; observe its published usage limits.

Official instructions: https://docs.github.com/en/pages/quickstart

## 3. Decide what "free to use" means

This site gives the public **free access** without a login. It does **not** automatically grant people permission to copy, sell, remix, or redistribute your books, games, or music. Those rights depend on the license you select and any third-party services involved.

**Suno note:** According to Suno's help center, tracks made on its free plan can be shared with Suno links for personal, non-commercial use. They do **not** have general commercial-use rights. See https://help.suno.com/en/articles/9601601. Do not promise others broad reuse rights for those tracks.

## Folders

- `index.html` — home page and structure
- `styles.css` — site appearance and mobile layout
- `catalog.js` — **edit this to manage your creations**
- `app.js` — working search, filters, and card rendering (usually leave alone)
- `assets/` — graphics and icons
- `games/` — put web-playable game folders here
- `books/` — put PDF books here

The site does not collect visitor information, require account creation, contain analytics, or show advertisements. Hosting services may still keep operational access logs. For larger content files, storage/hosting limits may apply.
