import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import axios from "../axios";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setPrecessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer

    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: "post",
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        });
        setClientSecret(response.data.clientSecret);
        // Handle the response
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };
    getClientSecret();
  }, [basket]);

  console.log("The SECRET is >>>", clientSecret);

  const handleSubmit = async (event) => {
    // do all the stripe shit
    event.preventDefault();
    setPrecessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.create,
          });

        // Add a new document with a generated id.
        // const docRef = addDoc(collection(db, "users"), {
        //   name: "Tokyo",
        //   country: "Japan"
        // });
        // console.log("Document written with ID: ", docRef.id);

        // try {
        //   const userDocRef = db.collection("users").doc(user?.id);
        //   const ordersCollectionRef = userDocRef.collection("orders");
        //   const orderDocRef = ordersCollectionRef.doc(paymentIntent.id);

        //   userDocRef.set({}); // Create the user document if it doesn't exist
        //   ordersCollectionRef.add({}); // Create the orders collection if it doesn't exist

        //   orderDocRef.set({
        //     basket: basket,
        //     amount: paymentIntent.amount,
        //     created: paymentIntent.create,
        //   });

        //   console.log("Data added successfully!");
        // } catch (error) {
        //   console.error("Error adding data:", error);
        // }

        setSucceeded(true);
        setError(null);
        setPrecessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        navigate("/orders", { replace: true });
      });
  };
  const handleChange = (event) => {
    // listen to the changes in the CardElement
    // and display any errors as the customer types their cair details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout ( <Link to="/checkout"> {basket?.length} items</Link> )
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>12 Harnet Ave</p>
            <p>San Pablo, CA</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            {/* {Stripe goes here} */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* {Errors} */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
