import dotenv from "dotenv"
import express from "express"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(express.json())

// Routes


// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    })
})

app.listen(PORT, () => {
    console.log("server running on port", PORT);

})


