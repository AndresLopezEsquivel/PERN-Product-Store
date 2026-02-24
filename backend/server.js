import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import { aj } from "./lib/arcjet.js";
import { sql } from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Enable Helmet for security
app.use(morgan("dev")); // Enable request logging

// Apply rate limiting to all routes
app.use(async (req, res) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1 // Specifies that each request consumes 1 token
    });

    if(decision.isDenied()) {
      if(decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Rate Limit exceeded" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot Access Denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return; // If decision results in denial, we'll stop here
    }
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/api/products/', productRoutes);

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initializing Database. ", error);
  }
}

app.get('/', (req, res) => {
  res.send('Hello from root');
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
