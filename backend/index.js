const express = require("express")
const morgan = require ("morgan")
const cors = require("cors")
const app = express()
const port = 5000

//relier back et front
app.use(cors())

const usersRoutes = require("./routes/users")

app.use(express.json())

//middleware gobal des requetes
app.use(morgan('tiny'))

app.use('/users', usersRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})