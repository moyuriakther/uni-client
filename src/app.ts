import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import cookieParser from 'cookie-parser'

const app: Application = express()
// const port = 3000;

//parser
app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: ['http://localhost:5173'] }))

//application routes
app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

// global error handler
app.use(globalErrorHandler)


export default app
 