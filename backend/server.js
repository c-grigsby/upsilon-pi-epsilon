// @packages
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const { readdirSync } = require('fs');
// @scripts
dotenv.config({ path: './config/config.env' });

const app = express();

// middleware_body_parser
app.use(express.json());
// middleware_cors
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// mount_routers
readdirSync('./routes').map((route) =>
  app.use('/', require(`./routes/${route}`))
);

// home
app.get('/', (_req, res) => {
  res.status(200).json({ success: true, message: 'Hello from UPE API' });
});

const PORT = process.env.PORT || 3001;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);
