import { Router } from 'express'
import { catalog } from '../data/catalog'

const router = Router()

router.get('/catalog', (_req, res) => {
  res.json(catalog)
})

export default router
