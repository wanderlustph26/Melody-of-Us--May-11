import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { Loader2, AlertCircle } from "lucide-react";

/* -----------------------------
   PAYPAL BUTTON WRAPPER
------------------------------*/
const PayPalButtonWrapper = ({ createOrder, onApprove, onError }: any) => {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();

  return (
    <div className="relative w-full flex justify-center min-h-[120px]">

      {/* LOADING */}
      {isPending && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
          <p className="text-[10px] uppercase font-black text-pink-500">
            Loading PayPal...
          </p>
        </div>
      )}

      {/* ERROR */}
      {isRejected && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-xl text-center w-full">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p className="font-bold text-white">PayPal Failed to Load</p>
          <p className="text-xs text-gray-300">
            Check your PayPal Client ID configuration.
          </p>
        </div>
      )}

      {/* BUTTON */}
      {!isPending && !isRejected && (
        <div className="w-full">
          <PayPalButtons
            style={{
              layout: "vertical",
              color: "gold",
              shape: "pill",
              label: "paypal",
              tagline: false
            }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          />
        </div>
      )}
    </div>
  );
};

/* -----------------------------
   CHECKOUT PAGE
------------------------------*/
export const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderData = location.state?.orderData;

  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID?.trim();

  /* Redirect if no order */
  useEffect(() => {
    if (!orderData) {
      navigate("/order");
      return;
    }

    if (orderData?.personalDetails?.email) {
      setEmail(orderData.personalDetails.email);
    }
  }, [orderData, navigate]);

  /* BLOCK invalid config */
  if (!PAYPAL_CLIENT_ID.trim()) {
    return (
      <div className="p-10 text-white">
        Missing PayPal Client ID (VITE_PAYPAL_CLIENT_ID)
      </div>
    );
  }

  /* CREATE ORDER */
  const createPayPalOrder = async () => {
    if (!orderData) throw new Error("Missing order data");

    try {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalPrice: orderData.totalPrice,
          description: `Custom Music for ${orderData.personalDetails.fullName}`
        })
      });

      const data = await res.json();

      if (!data?.id) throw new Error("Invalid order response");

      return data.id;
    } catch (err) {
      console.error(err);
      setPaymentError("Unable to start payment.");
      throw err;
    }
  };

  /* CAPTURE ORDER */
  const capturePayPalOrder = async (orderID: string) => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      const res = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID, orderData })
      });

      const data = await res.json();

      if (data.status === "COMPLETED") {
        navigate("/thank-you", { state: { success: true } });
      } else {
        setPaymentError("Payment not completed.");
      }
    } catch (err) {
      console.error(err);
      setPaymentError("Payment failed. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
        components: "buttons"
      }}
    >
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">

        {/* LOADING OVERLAY */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        )}

        {/* ERROR */}
        {paymentError && (
          <div className="text-red-500 mb-4">{paymentError}</div>
        )}

        {/* PAYPAL BUTTON */}
        <div className="w-full max-w-md">
          <PayPalButtonWrapper
            createOrder={createPayPalOrder}
            onApprove={(data: any) => capturePayPalOrder(data.orderID)}
            onError={(err: any) => {
              console.error(err);
              setPaymentError("PayPal error occurred.");
            }}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
};
