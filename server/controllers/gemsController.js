import { readCollection } from '../utils/dataStore.js';

export async function listGems(req, res, next) {
  try {
    const gems = await readCollection('gems');

    // Optional filtering by `tag` query param: /api/gems?tag=Precious
    const { tag } = req.query;
    const filtered = tag
      ? gems.filter((g) => g.tag.toLowerCase() === tag.toLowerCase())
      : gems;

    res.json(filtered);
  } catch (err) {
    next(err);
  }
}

export async function getGem(req, res, next) {
  try {
    const gems = await readCollection('gems');
    const gem = gems.find((g) => g.id === req.params.id);
    if (!gem) return res.status(404).json({ error: 'Gem not found' });
    res.json(gem);
  } catch (err) {
    next(err);
  }
}
