// backend/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3001;

const ERGAST_API_BASE_URL = 'https://ergast.com/api/f1';

app.get('/champions', async (req, res) => {
  try {
    const promises = [];
    for (let year = 2005; year <= 2015; year++) {
      promises.push(axios.get(`${ERGAST_API_BASE_URL}/${year}/driverStandings/1.json`));
    }
    const results = await Promise.all(promises);
    const champions = results.map(result => {
      const driver = result.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver;
      const constructor = result.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0];
      return {
        year: result.data.MRData.StandingsTable.season,
        driver: {
          givenName: driver.givenName,
          familyName: driver.familyName,
          nationality: driver.nationality,
          driverId: driver.driverId
        },
        constructor: constructor.name
      };
    });
    res.json(champions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/races/:year', async (req, res) => {
  const { year } = req.params;
  try {
    const response = await axios.get(`${ERGAST_API_BASE_URL}/${year}/results/1.json`);
    const races = response.data.MRData.RaceTable.Races.map(race => ({
      round: race.round,
      raceName: race.raceName,
      date: race.date,
      winner: {
        givenName: race.Results[0].Driver.givenName,
        familyName: race.Results[0].Driver.familyName,
        driverId: race.Results[0].Driver.driverId
      },
      constructor: race.Results[0].Constructor.name
    }));
    res.json(races);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
