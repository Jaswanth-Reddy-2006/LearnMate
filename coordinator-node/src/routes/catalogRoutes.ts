import { Router } from 'express'
import { getEnhancedCatalog } from '../data/catalog'

const router = Router()

router.get('/catalog', async (_req, res) => {
  try {
    const catalog = await getEnhancedCatalog()
    res.json(catalog)
  } catch (error) {
    console.error('Failed to fetch enhanced catalog:', error)
    res.status(500).json({ error: 'Failed to fetch catalog' })
  }
})

export default router
