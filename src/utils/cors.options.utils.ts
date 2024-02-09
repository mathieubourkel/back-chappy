export const corsOptions = {
    origin: [`${process.env.VITE_PROTOCOL}://${process.env.FRONT_HOST}${process.env.FRONT_PORT != '80' && process.env.FRONT_PORT != '443' ? ":" + process.env.FRONT_PORT : ''}`, process.env.FINAL_URL_PROD],
    methods: 'GET,PUT,POST,DELETE,OPTIONS,PATCH,HEAD',
    credentials: true,
    allowedHeaders: 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
  };