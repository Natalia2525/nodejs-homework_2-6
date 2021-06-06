const app = require('../app');
const path = require('path');

const db = require('../model/db');
const createFolderIsNotExist = require('../helpers/create-dir');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const UPLOAD_DIR = process.env.UPLOAD_DIR;
const PUBLIC_DIR = process.env.PUBLIC_DIR;
const AVATARS_OF_USERS = path.join(PUBLIC_DIR, process.env.AVATARS_OF_USERS);

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(UPLOAD_DIR);
    await createFolderIsNotExist(PUBLIC_DIR);
    await createFolderIsNotExist(AVATARS_OF_USERS);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch(err => {
  console.log(`Server not run. Error: ${err.message}`);
  process.exit(1);
});
