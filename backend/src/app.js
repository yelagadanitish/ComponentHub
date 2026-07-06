require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// =========================
// Routes
// =========================

const visitorRoutes = require("./routes/visitorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const componentRoutes = require("./routes/componentRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const imageRoutes = require("./routes/imageRoutes");

const issueRoutes = require("./routes/issueRoutes");
const activityRoutes = require("./routes/activityRoutes");

const userRoutes = require("./routes/userRoutes");
const userActivityRoutes = require("./routes/userActivityRoutes");

// Kit Routes
const kitRoutes = require("./routes/kitRoutes");
const issueKitRoutes = require("./routes/issueKitRoutes");
const kitUploadRoutes = require("./routes/kitUploadRoutes");
const kitImageRoutes = require("./routes/kitImageRoutes");

// =========================
// Middlewares
// =========================


app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, curl, etc.)
      if (!origin) return callback(null, true);

      if (
        origin === "http://localhost:5173" ||
        origin === "https://component-hub.vercel.app" ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

// =========================
// API Routes
// =========================

app.use("/api/visitor", visitorRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/components", componentRoutes);

app.use("/api/transaction", transactionRoutes);

app.use("/api/image", imageRoutes);

app.use("/api/user", userRoutes);

app.use("/api/user-activity", userActivityRoutes);

app.use("/api/issue", issueRoutes);

app.use("/api/activity", activityRoutes);

// =========================
// Kit Management Routes
// =========================

// CRUD Operations (GET, POST, PUT, DELETE)
app.use("/api/kits", kitRoutes);

// Issue Kit
app.use("/api/kits/issue", issueKitRoutes);

// Upload Kit Data (if used)
app.use("/api/kits/upload", kitUploadRoutes);

// Upload Kit Image
app.use("/api/kit-images", kitImageRoutes);

// =========================
// Root
// =========================

app.get("/", (req, res) => {
  res.send("ComponentHub API Running...");
});

module.exports = app;