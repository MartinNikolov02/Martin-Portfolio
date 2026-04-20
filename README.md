# Martin Nikolov — Portfolio Site

## 📁 Structure

```
portfolio/
├── index.html          ← Homepage (the grid)
├── style.css           ← All global styles
├── main.js             ← Tiny JS (animations, year)
│
├── pages/
│   ├── about.html
│   ├── portfolio.html
│   ├── resume.html
│   ├── blog.html       ← Auto-loads post list from posts.json
│   └── contact.html
│
├── blog/
│   ├── post-template.html   ← Single post renderer
│   ├── blog-loader.js       ← Fetches & renders .md files
│   ├── blog.css             ← Blog-specific styles
│   ├── posts.json           ← LIST OF ALL POSTS (edit this when adding a post)
│   └── posts/
│       ├── hello-world.md
│       └── why-i-code.md
│
└── assets/
    ├── img/
    │   ├── profile.jpg        ← Your photo (used in the big square)
    │   ├── about-thumb.jpg
    │   ├── portfolio-thumb.jpg
    │   ├── resume-thumb.jpg
    │   ├── blog-thumb.jpg
    │   └── contact-thumb.jpg
    └── resume.pdf             ← Your actual CV
```

---

## ✍️ How to add a blog post

**Step 1.** Create a new `.md` file in `blog/posts/`:

```
blog/posts/my-new-post.md
```

Start the file with frontmatter:

```markdown
---
title: My New Post
date: 2026-04-01
---

Your content goes here. Use regular **Markdown**.

## A heading

Some text, a [link](https://example.com), a list:

- item one
- item two
```

**Step 2.** Add one line to `blog/posts.json`:

```json
[
  { "slug": "my-new-post", "title": "My New Post", "date": "2026-04-01" },
  { "slug": "hello-world", "title": "Hello World", "date": "2026-03-28" }
]
```

That's it. The blog index and post page handle everything else automatically.

---

## 🖼 Images

Replace placeholder images in `assets/img/` with real ones:

| File | Used in |
|---|---|
| `profile.jpg` | Big photo square on homepage |
| `about-thumb.jpg` | About tile |
| `portfolio-thumb.jpg` | Portfolio tile |
| `resume-thumb.jpg` | Resume tile |
| `blog-thumb.jpg` | Blog tile |
| `contact-thumb.jpg` | Contact tile |

---

## 🚀 Deploying

This is a fully static site — no build step, no server needed.

**GitHub Pages:** Push to a repo → Settings → Pages → Deploy from main branch.

**Netlify:** Drag the `portfolio/` folder into [netlify.com/drop](https://netlify.com/drop).

> ⚠️ The blog system uses `fetch()` to load `.md` files, so it requires a server (even a local one). Use `npx serve .` or VS Code Live Server during development — opening `index.html` directly in a browser won't work for blog posts.
