require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const logger = require("./logger");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev", {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connesione avviata"))
    .catch((err) => {
        console.error("Errore di connessione a MongoDB:", err.message)
        process.exit(1);
    });

const taskRoutes = require("./routes/tasks");
app.use("/task", taskRoutes);

app.get("/", (req, res) => {
  res.send("✅ Server online e funzionante!");
});
//Rotta di saluto per verificare che il server risponda
app.get(`/task/health`, (req, res) => {
    res.json({ status: `ok`}); //risponde con JSON {status: "ok"}
});

//Middleware 404: se arrivi qui, nessuna rotta precedente ha risposto
app.use((req, res) => {
    res.status(404).json({ error : `Not found`});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`)
})