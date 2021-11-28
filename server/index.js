import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import postsRouter from './routers/posts.js';
import userRouter from './routers/users.js';
import mongoose from 'mongoose';
mongoose
  .connect('mongodb://localhost/MERNAPP')
  .then(() => {
    console.log('connect to DB');
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
const PORT = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.json('success');
});

app.use('/posts', postsRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
