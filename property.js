const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUrl = 'mongodb+srv://finder:finder1234@cluster0.h80grim.mongodb.net/';
const secret_key = 'qwertyuiop';

let users;
let properties;

// MongoDB connection
async function initMongo() {
  try {
    const client = new MongoClient(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    const db = client.db('property');

    users = db.collection('users');
    properties = db.collection('properties');

    console.log('✅ Connected to MongoDB at mongodb://localhost:27017');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

// Test route
app.get('/', (req, res) => {
  res.send('Backend server running on port 4000.');
});

// User Registration
app.post('/userregister', async (req, res) => {
  try {
    const { name, mobile, email, gender, password, rpassword, dob } = req.body;
    if (password !== rpassword) return res.json({ response: '0' });

    const existingUser = await users.findOne({ email });

    if (!existingUser) {
      await users.insertOne({ name, mobile, email, gender, password, dob });
      return res.json({ response: '1' });
    } else {
      return res.json({ response: '2' }); // user already exists
    }
  } catch (err) {
    return res.json({ response: err.message });
  }
});

// User Login
app.post('/userlogin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });

    if (!user) return res.json({ response: '0' }); // no user
    if (user.password !== password) return res.json({ response: '2' }); // wrong password

    const token = jwt.sign({ data: { useremail: email, usertype: 'users' } }, secret_key);
    return res.json({ response: '1', token });
  } catch (err) {
    return res.json({ response: err.message });
  }
});

// Reset Password
app.post('/resetpassword', async (req, res) => {
  try {
    const { newpassword, rnewpassword, email } = req.body;
    if (newpassword !== rnewpassword) return res.json({ response: '0' });

    await users.updateOne({ email }, { $set: { password: newpassword } });
    return res.json({ response: '1' });
  } catch (err) {
    return res.json({ response: err.message });
  }
});

// Sell House
app.post('/sellhouse', async (req, res) => {
  try {
    const { year, area, housetype, address, img1, img2, cost, token } = req.body;
    const decoded = jwt.verify(token, secret_key);

    if (!decoded.data.useremail) return res.json({ response: '0' });

    await properties.insertOne({
      year,
      area,
      housetype,
      address,
      img1,
      img2,
      cost,
      category: 'house',
      owner: decoded.data.useremail,
    });

    return res.json({ response: '1' });
  } catch (err) {
    return res.json({ response: err.message });
  }
});

// Sell Apartment
app.post('/sellapartment', async (req, res) => {
  try {
    const { year, area, roomstype, address, floors, parking, img1, img2, cost, token } = req.body;
    const decoded = jwt.verify(token, secret_key);

    await properties.insertOne({
      year,
      area,
      roomstype,
      address,
      floors,
      parking,
      img1,
      img2,
      cost,
      category: 'apartment',
      owner: decoded.data.useremail,
    });

    return res.json({ response: '1' });
  } catch (err) {
    return res.json({ response: err.message });
  }
});

// Sell Land
app.post('/sellland', async (req, res) => {
  try {
    const { year, area, landtype, address, img1, img2, cost, token } = req.body;
    const decoded = jwt.verify(token, secret_key);

    await properties.insertOne({
      year,
      area,
      landtype,
      address,
      img1,
      img2,
      cost,
      category: 'land',
      owner: decoded.data.useremail,
    });

    return res.json({ response: '1' });
  } catch (err) {
    return res.json({ response: err.message });
  }
});

// Get Properties
app.get('/gethouses', async (req, res) => {
  try {
    const data = await properties.find({ category: 'house' }).toArray();
    return res.status(200).json(data);
  } catch (err) {
    return res.json({ response: err.message });
  }
});

app.get('/getapartments', async (req, res) => {
  try {
    const data = await properties.find({ category: 'apartment' }).toArray();
    return res.status(200).json(data);
  } catch (err) {
    return res.json({ response: err.message });
  }
});

app.get('/getlands', async (req, res) => {
  try {
    const data = await properties.find({ category: 'land' }).toArray();
    return res.status(200).json(data);
  } catch (err) {
    return res.json({ response: err.message });
  }
});

// Get Owner Details
app.post('/getownerdetails', async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, secret_key);
    const owner = await users.findOne({ email: decoded.data.useremail });

    return res.json({ response: '1', owner });
  } catch (err) {
    return res.json({ response: err.message });
  }
});

// Start server
initMongo().then(() => {
  app.listen(4000, () => {
    console.log('✅ Server started on http://localhost:4000');
  });
});
