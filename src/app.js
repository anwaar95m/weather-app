/** @format */

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewDirectoryPath = path.join(__dirname, "../templates/views");
const partialDirectoryPath = path.join(__dirname, "../templates/partials");

//Express Configs
app.set("view engine", "hbs");
app.set("views", viewDirectoryPath);
hbs.registerPartials(partialDirectoryPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Anwaar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    text: "Some Help text",
    title: "Help me",
    name: "Anwaar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About us",
    name: "Anwaar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({errMsg: "Please provide a valid address" });
  } else {
    geocode(req.query.address, (err, data) => {
      if (err) {
        return res.send({errMsg: err });
      }
      forecast(data, (err, forecastData) => {
        if (err) {
          return res.send({ errMsg: err });
        }
        const { location } = data;
        res.send({ location, forecast: forecastData , address: req.query.address});
      });
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("4O4", {
    title: "4O4",
    name: "Anwaar",
    errorMsg: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("4O4", {
    title: "4O4",
    name: "Anwaar",
    errorMsg: "Page not found",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
