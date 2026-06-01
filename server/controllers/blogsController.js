import { readCollection } from '../utils/dataStore.js';

export async function listBlogs(_req, res, next) {
  try {
    const blogs = await readCollection('blogs');
    // Return without the full content for the list view
    const summaries = blogs.map(({ content, ...rest }) => rest);
    res.json(summaries);
  } catch (err) {
    next(err);
  }
}

export async function getBlog(req, res, next) {
  try {
    const blogs = await readCollection('blogs');
    const post = blogs.find((b) => b.slug === req.params.slug);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
}
