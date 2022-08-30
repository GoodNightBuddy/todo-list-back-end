import { json } from 'body-parser';
import express, {Request, Response, NextFunction} from 'express';
import todoRoutes from './routes/todos';
import cors from 'cors';

const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
};

const app = express();

app.use(json());

app.use(cors(corsOptions));

app.use('/todos', todoRoutes);

app.get('/', (req, res, next) => {
  res.end('<h1>Hello world</h1>')
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({message: err.message});
});

const port = process.env.PORT || 3001;

app.listen(port);