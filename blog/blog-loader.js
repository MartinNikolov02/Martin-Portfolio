// blog-loader.js
// Reads ?post=slug from URL, fetches posts/slug.md, parses with marked.js, injects into page.

(async function () {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('post');

  const titleEl = document.getElementById('post-title');
  const bodyEl  = document.getElementById('post-body');
  const dateEl  = document.getElementById('post-date');
  const pageTitleEl = document.getElementById('page-title');

  if (!slug) {
    titleEl.textContent = 'Post not found';
    bodyEl.innerHTML = '<p>No post slug provided. Go back and pick a post.</p>';
    return;
  }

  try {
    // Fetch the markdown file
    const res = await fetch(`posts/${slug}.md`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.text();

    // --- Parse optional frontmatter (--- ... ---) ---
    let markdown = raw;
    let title = slug.replace(/-/g, ' ');
    let date  = '';

    const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
    if (fmMatch) {
      markdown = raw.slice(fmMatch[0].length);
      const fm = fmMatch[1];

      const titleMatch = fm.match(/^title:\s*(.+)$/m);
      const dateMatch  = fm.match(/^date:\s*(.+)$/m);
      if (titleMatch) title = titleMatch[1].trim().replace(/^['"]|['"]$/g, '');
      if (dateMatch)  date  = dateMatch[1].trim();
    }

    // Inject metadata
    titleEl.textContent = title;
    pageTitleEl.textContent = `${title} — Martin Nikolov`;
    if (date) {
      const d = new Date(date);
      dateEl.textContent = d.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
    }

    // Render markdown
    bodyEl.innerHTML = marked.parse(markdown);

  } catch (err) {
    titleEl.textContent = 'Oops.';
    bodyEl.innerHTML = `<p>Couldn't load this post. Make sure the file exists in <code>blog/posts/${slug}.md</code>.</p>`;
    console.error('Blog loader error:', err);
  }
})();
