const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const schema = require("./schema/schema.js")
const typeDefs = require("./graphql/typeDefs")
const resolver = require("./graphql/resolvers")
const { DATABASE_URL } = require("./config")

// router handlers
const app = express()

// Middlewares
app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

// router  middlewares
app.get("/", (req, res) => {
    res.send(`
        welcome
    `)
})


const PORT = process.env.PORT || 8080

mongoose.connect(DATABASE_URL, { useNewUrlParser: true }).then((res) => {
    console.log("MONGODB CONNECTED")
    return app.listen(PORT, () => {
        console.log(`Server listening @ http://localhost:${PORT}`);
    })

}).catch((err) => {
    console.log(`Error connecting database: ${err.message}`);
})
