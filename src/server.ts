// import config from './app/config'
import mongoose from 'mongoose'
import { Server } from 'http'
import app from './app'


let server: Server

async function main() {
  try {
    await mongoose.connect('mongodb+srv://islammou117:3D03BTd9M1rffkpq@cluster0.f2jle.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' as string)
    // seedSuperAdmin()
    server = app.listen(5000, () => {
      console.log(`Example app listening on port ${5000}`)
    })
  } catch (err) {
    console.log(err)
  }
}
main()

process.on('unhandledRejection', () => {
  console.log('unhandledRejection catch, server is shutting of')
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  console.log('uncaughtException catch, server is shutting of')
  process.exit(1)
})
