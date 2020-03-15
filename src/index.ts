import express from 'express'
import dotenv from 'dotenv'
import router from 'router'

dotenv.config()

const port = process.env.PORT || 8080
const app = express()

app.use('/api', router)

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
