export default () => ({
  database: {
    name: process.env.POSTGRES_DBNAME,
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
