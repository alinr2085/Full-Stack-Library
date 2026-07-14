import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Auth/context/AuthContext";
import { PaymentRequestModel } from "../../models/PaymentRequestModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const PaymentPage = () => {
  const auth = useContext(AuthContext);

  const [submitDisabled, setDisabled] = useState(false);
  const [fees, setFees] = useState(0);
  const [httpError, setHttpError] = useState(false);
  const [laodingFees, setLoadingFees] = useState(false);
  const [successPayment, setSuccessPayment] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    const fetchFees = async () => {
      if (auth) {
        const url = `https://localhost:8081/api/payments/search/findByUserEmail?email=${auth.session?.user.email}`;
        const requestOption = {
          method: "GET",
          headers: {
            authorization: `Bearer ${auth.session?.access_token}`,
          },
        };
        const paymentResponse = await fetch(url, requestOption);
        if (!paymentResponse.ok) {
          throw new Error("error in checking ckeckedout book by user");
        }
        const isCheckedoutResponseJson = await paymentResponse.json();
        setFees(isCheckedoutResponseJson.amount);
        setLoadingFees(false);
      }
    };

    fetchFees().catch((err) => {
      setLoadingFees(false);
      setHttpError(err.message);
    });
  }, [auth]);

  const element = useElements();
  const stripe = useStripe();

  async function handlePayment() {
    if (!stripe || !element) return;

    const cardElement = element.getElement(CardElement);
    if (!cardElement) return;

    setDisabled(true);

    const paymentReqeust = new PaymentRequestModel(
      fees * 100,
      "USD",
      auth.session?.user.email,
    );

    const url = `https://localhost:8081/payment/secure/payment-intent`;
    const requestOption = {
      method: "POST",
      headers: {
        authorization: `Bearer ${auth.session?.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentReqeust),
    };

    const paymentResponse = await fetch(url, requestOption);
    if (!paymentResponse.ok) {
      setHttpError(true);
      setDisabled(false);
      return;
    }

    const paymentResponseJson = await paymentResponse.json();

    stripe
      .confirmCardPayment(
        paymentResponseJson.client_secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: auth.session?.user.email,
            },
          },
        },
        { handleActions: false },
      )
      .then(async function (result: any) {
        if (result.error) {
          setDisabled(false);
          setDisplayError(true);
          setTimeout(() => setDisplayError(false), 3000);
        } else {
          const url = `https://localhost:8081/payment/secure/payment-complete`;
          const requestOption = {
            method: "PUT",
            headers: {
              authorization: `Bearer ${auth.session?.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentReqeust),
          };

          const stripeResponse = await fetch(url, requestOption);
          if (!stripeResponse.ok) {
            setHttpError(true);
            setDisabled(false);
            setDisplayError(true);
            setTimeout(() => setDisplayError(false), 3000);
            throw new Error("Error in submit review");
          }
          setFees(0);
          setDisplayError(false);
          setSuccessPayment(true);
          setTimeout(() => setSuccessPayment(false), 3000);
          setDisabled(false);
        }
      })
      .catch((err) => {
        setDisabled(false);
        setSuccessPayment(false);
        setDisplayError(true);
        setTimeout(() => setDisplayError(false), 3000);
      });
    setHttpError(false);
  }

  if (laodingFees) return <SpinnerLoading />;

  if (httpError) {
    return (
      <div className="container mt-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      {displayError && (
        <div
          className="position-fixed top-0 end-0 m-3 alert alert-danger"
          role="alert"
          style={{ zIndex: 9999 }}
        >
          ❌ Please check your card details and try again!
        </div>
      )}
      {successPayment && (
        <div
          className="position-fixed top-0 end-0 m-3 alert alert-success"
          role="alert"
          style={{ zIndex: 9999 }}
        >
          ✅ Payment successful!
        </div>
      )}
      <div className="container">
        {fees > 0 && (
          <div className="card mt-3">
            <h5 className="card-header">
              Fees pending: <span className="text-danger">${fees}</span>
            </h5>
            <div className="card-body">
              <h5 className="card-title mb-3">Credit Card</h5>
              <CardElement id="card-element" />
              <button
                disabled={submitDisabled}
                className="btn btn-md btn-primary mt-3"
                onClick={handlePayment}
              >
                Pay fees
              </button>
            </div>
          </div>
        )}
        {fees === 0 && (
          <div className="mt-3">
            <h5>You have no fees!</h5>
            <Link to="../search" className="btn btn-primary" type="button">
              Explore top books
            </Link>
          </div>
        )}
        {submitDisabled && <SpinnerLoading />}
      </div>
    </div>
  );
};
