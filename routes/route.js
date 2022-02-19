var express = require('express');
var UserController = require('./controller');
var Station = require('../models/stations');
var router = express.Router();

router.get('/api/stations', async(req,res) => {
  try {
      const stations = await Station.find({});

      return res.status(200).json({
        success: true,
        count: stations.length,
        data: stations,
      });
  } catch (error) {
     console.error(error);
     res.status(500).json({ error: "Server error" });
  }
});

router.post('/api/stations', UserController.addStations);


module.exports = router;