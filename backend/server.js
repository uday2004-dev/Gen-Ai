import "dotenv/config"
import { connectDB } from "./config/database.js"
import app from "./src/app.js"
import {invoke} from "./services/aiService.js"
// import { generateInterviewReport } from "./services/aiService.js"
// import {resume,selfDescription,jobDescription} from "./services/aiService.js"    
// import { generateInterviewReport } from "./services/aiService.js";

const PORT = process.env.PORT || 3000


// generateInterviewReport()
invoke()
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("DB connection failed:", err)
    process.exit(1)
  })

// import "dotenv/config"
// import { connectDB } from "./config/database.js"
// import {invoke} from "./services/aiService.js"
// import app from "./src/app.js"

// const PORT = process.env.PORT || 3000
// invoke()
// async function startServer() {
//   try {
//     await connectDB()
//     console.log("Database connected")

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`)
//     })
//   } catch (err) {
//     console.error("DB connection failed:", err)
//     process.exit(1)
//   }
// }

// startServer()