import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from 'cors';
import clientRouter from "./routes/clientRoutes.js";
import coachRouter from "./routes/coachRoutes.js";
import dailyLogRouter from "./routes/dailyLogRoutes.js";
import bodyParser from 'body-parser';

const app: Express = express();
const PORT = 4343;

app.use(cors());
app.use(bodyParser.json());
app.use('/client', clientRouter);
app.use('/coach', coachRouter);
app.use('/log', dailyLogRouter);


const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.nhoulwn.mongodb.net/?retryWrites=true&w=majority`;
// const options = { useNewUrlParser: true, useUnifiedTopology: true }
const options = {}
// mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })

app.get("/", (req: Request, res: Response) => {
  res.json({ greeting: "Hello world!" });
});
