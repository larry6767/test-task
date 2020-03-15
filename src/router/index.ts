import express from 'express'
import readJSON from 'helpres/readJSON'

const router = express.Router()

router.get('/names', async (req, res) => {
  try {
    const names = await readJSON('names.json')
    res.json(names)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: 'Server Error',
    })
  }
})

export default router
