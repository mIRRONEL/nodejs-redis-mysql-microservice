const express = require('express');
const redis = require('redis');
const mysql = require('mysql');
const cors = require('cors');

// Create Redis client
const redisClient = redis.createClient();
(async () => {
  await redisClient.connect();
})();

// Verify Redis connection
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

// Handle Redis client errors
redisClient.on('error', (error) => {
  console.error('Redis error:', error);
});

// Create MySQL connection pool
const mysqlPool = mysql.createConnection({
  host: 'localhost',
  user: 'ronel',
  password: '123',
  database: 'myapp',
});

mysqlPool.on('connect', () =>{
  console.log('Connected to the MySQL');
});

// Create Express app
const app = express();

app.use(express.json());
app.use(cors({
  origin: '*'
}));

// Store data in Redis and MySQL
app.post('/create', (req, res) => {
  const { username, id } = req.body;
  
  // Store data in Redis
  // redisClient.set(id, 3600, JSON.stringify({ username, id }));
  redisClient.set(id, JSON.stringify({ username, id }), 'EX', 3600);

  // Store data in MySQL
  mysqlPool.query('INSERT INTO mytable (username, id) VALUES (?, ?)', [username, id], (error) => {
    if (error) {
      console.error('Error storing data in MySQL:', error);
      res.status(500).json({ error: 'Error storing data' });
    } else {
      res.status(200).json({ message: 'Data stored successfully' });
    }
  });
});

// Retrieve data from Redis or MySQL
app.get('/data', (req, res) => {
  const { username, id } = req.query;
  console.log(id);
  // Check Redis first
  // redisClient.get(id, (redisError, redisData) => {
  //   console.log(redisData);
  //   if (redisError) {
  //     console.error('Error retrieving data from Redis:', redisError);
  //     executeMySQLQuery();
  //     return;
  //   }

  //   if (redisData) {
  //     const data = JSON.parse(redisData);
  //     res.status(200).json(data);
  //   } else {
  //     executeMySQLQuery();
  //   }
  // });
      // Retrieve data from MySQL
  // function executeMySQLQuery() {
    const query = `SELECT * FROM mytable WHERE id = ${mysql.escape(id)}`;
    mysqlPool.query(query,(mysqlError, mysqlData) => {
      if (mysqlError) {
        console.error('Error retrieving data from MySQL:', mysqlError);
        res.status(500).json({ error: 'Error retrieving data' });
      } else if (mysqlData.length > 0) {
        const data = mysqlData[0];
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
     }   
    )
  // }
 });

// Start the Express server
const port = 5001;
app.listen(port, () => {
  console.log(`Express API server is running on port ${port}`);
});

