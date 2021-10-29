import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './router.js';
import loginRouter from './loginRouter.js';

const PORT = 5000;
const DB_URL = 'mongodb+srv://kevin:exceed123@cluster0.zosvp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);
app.use('/auth', loginRouter);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
    app.listen(PORT, () => console.log('I`m Working on', PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
