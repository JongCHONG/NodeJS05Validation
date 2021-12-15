const express = require("express")
const app = express()
const port = 5000

const usersRoutes = require("./routes/users")

app.use(express.json())

app.use('/users', usersRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})