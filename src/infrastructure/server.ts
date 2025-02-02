import express from "express";
import routes from "../routes.js";
import cors from "cors";
const app = express();

app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(express.json());
app.use("/api", routes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


export default app; 
