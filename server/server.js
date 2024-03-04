require('dotenv').config()
const express = require('express');
const cors = require('cors')
const morgan = require('morgan') // this is a third-party middleware (HTTP request logger middleware for node.js)
const db = require("./db");

const app = express();

// app.use(morgan("tiny")) // By default every third-party middleware have te next func in it.
// app.use(morgan("dev"))

app.use(cors()) // this middleware allowing in comming request from other domain
app.use(express.json()) // we use this third-party middleware to get the data of the body in req.

app.get("/", (req, res) => {
    res.send("Welcome to Yelp App");
})


// this is the meddileware that will path something to its following RouteHandeler
// app.use((req, res, next) => {
//     console.log("Hello from the middleware")
//     next(); // this function tells the middleware to pass the request to the next RouteHnadeler
// })

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const result = await db.query("select * from restaurants;");
        // console.log(result.rows);
        res.status(200).json({
            status: "Success",
            result: result.rows.length,
            data: {
                restaurants: result.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// Get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const result = await db.query(
            "select * from restaurants where id = $1", [req.params.id]
        );
        res.status(200).json({
            status: "Success",
            data: {
                restaurants: result.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    try {
        const result = await db.query("INSERT INTO restaurants(name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range])
        res.status(201).json({
            status: "Success",
            data: {
                restaurants: result.rows[0],
            },
        });
    } catch (err) {
        console.log(err)
    }
})

// Update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const result = await db.query("UPDATE restaurants SET name=$1, location=$2, price_range=$3 where id = $4 returning *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id])
        res.status(200).json({
            status: "Success",
            data: {
                restaurants: result.rows[0]
            }
        })
    } catch (err) {
        console.log(err);
    }
})

// Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const result = await db.query("DELETE from restaurants where id = $1", [req.params.id]);
        res.status(204).json({
            status: "Success"
        })
    } catch (err) {
        console.log(err)
    }
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server is up and listenning on port ${port}`);
})