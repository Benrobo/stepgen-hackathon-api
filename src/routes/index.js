
const express = require("express")
const router = express.Router()

router.post("/", (req, res) => {
    res.json({ welcome: "true" })
})

module.exports = router

