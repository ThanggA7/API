const express = require('express');
const moment = require('moment-timezone');
const cors = require('cors');
const app = express();
const port = 3000;


app.use(cors());

app.get('/time', (req, res) => {
  const country = req.query.country;
  
  if (!country) {
    return res.status(400).json({ error: 'Country parameter is required.' });
  }

  const timezoneInfo = moment.tz.zone(country);
  if (!timezoneInfo) {
    return res.status(400).json({ error: 'Invalid timezone.' });
  }

  const unixTimestamp = Math.floor(new Date().getTime() / 1000);
  const timezoneDatetime = moment.tz(unixTimestamp * 1000, country);
  
  const response = {
    timezone: country,
    date: timezoneDatetime.format('YYYY-MM-DD'),
    time: timezoneDatetime.format('HH:mm:ss'),
    utc_offset: timezoneInfo.utcOffset(unixTimestamp) / 60, // Chia cho 60 để chuyển sang đơn vị phút
    author: "Nhu Thang Luu"
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
