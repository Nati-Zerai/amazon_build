const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// const {log} = require("firebase-functions/logger");
const stripe = require("stripe")(
  'sk_test_51OYpQAFn3in9OkrheNj5ogQTsB8SVSOGYKB1jw6SUaJyPIg2ZaAVHBuZvvVs8RENMie9KNm5Vv9vkhxqelTESD2p00cEdmnbvQ'
);
// set up API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/users/activate-account", (req, res) => {
    const postedData = req.body;
    console.log("users/activate-account success: ", postedData);
    res.json({
      message: "users/activate-account success : ",
      data: postedData,
    });
  }); 

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payments Request Received! >> for this amount ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // Ok - Created (201)
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://127.0.0.1:5001/build-dfdda/us-central1/api
