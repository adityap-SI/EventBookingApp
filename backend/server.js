const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require('pg');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'BookingData',
  password: 'postgres',
  port: 5432,
});

async function selectAll() {
  try {
    const res = await client.query(`SELECT * FROM public."Basic"`);
    dbdata = res.rows;
  } catch (error) {
    console.error(error);
  }
}

async function loginQuery() {
  try {
    const res = await client.query(
      `SELECT "ID", "FirstName", "LastName", "Email", "Password"
      FROM "SportsApp"."Employee"
      WHERE "Email"=$1 AND "Password"=$2`,
      [empemail, emppass]
    );

    dbuserdata = res.rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function insertIntoSport(sport, venue, equipment, duration) {
  try {
    const res = await client.query(
      `INSERT INTO "SportsApp"."Sports"("Name", "Venue", "Equipment", "duration")
      VALUES ($1, $2, $3, $4)`,
      [sport, venue, JSON.stringify(equipment), duration]
    );
  } catch (error) {
    console.error(error);
  }
}

const handleGetSportsInfo = async () => {
  try {
    const res = await client.query(`SELECT DISTINCT "Name" FROM "SportsApp"."Sports"`);
    sportsinfo = res.rows;
  } catch (error) {
    console.error(error);
  }
};

app.get("/api", (req, res) => {
  res.json(data);
});

app.post("/hrsportsdata", (req, res) => {
  const { sport, venue, equipment, duration } = req.body;
  insertIntoSport(sport, venue, equipment, duration);
  res.send();
});

app.post("/logincheck", (req, res) => {
  empemail = req.body.email;
  emppass = req.body.password;
  loginQuery().then(() => {
    if (dbuserdata !== undefined) {
      console.log("true");
      res.send(true);
    } else {
      res.send(false);
    }
  });
});

app.post("/geteqsinfo", async (req, res) => {
  const { sport, venue } = req.body;
  const data = await client.query(
    `SELECT DISTINCT "Equipment" FROM "SportsApp"."Sports" WHERE "Name"=$1 AND "Venue"=$2`,
    [sport, venue]
  );
  res.send(data.rows);
});

app.post("/getvenuesinfo", async (req, res) => {
  const { sport } = req.body;
  const data = await client.query(
    `SELECT DISTINCT "Venue" FROM "SportsApp"."Sports" WHERE "Name"=$1`,
    [sport]
  );
  res.send(data.rows);
});

app.post("/admincheck", (req, res) => {
  if (req.body.email == "adityapandey@gmail.com" && req.body.password == "adi1234") {
    res.send(true);
  } else {
    res.send(false);
  }
});

let notiData = {};

app.get("/api/notifications/requestreceived", (req, res) => {
  res.json(notiData);
});

app.post("/api/notifications/requestreceived", (req, res) => {
  notiData = { sport: req.body.sport, venue: req.body.venue,equipment:req.body.equipment, approval: "pending" };
  res.send();
});

app.put("/api/notifications/requestreceived", (req, res) => {
  notiData.approval = req.body.approval;
  res.json(notiData);
});

let sportsinfo = [];

app.get("/getsportinfo", (req, res) => {
  handleGetSportsInfo().then(() => {
    res.send(sportsinfo);
  });
});

client.connect(() => {
  console.log("Connected to the database.");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
