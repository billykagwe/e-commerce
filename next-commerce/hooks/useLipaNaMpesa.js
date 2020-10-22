/** @format */

import React, { useCallback, useState, useEffect } from "react";
import fetchJson from "../utils/fetchJson";
import useSWR from "swr";

function useLipaNaMpesa() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [transactionCode, setTransactionCode] = useState(null);

  console.log(transactionCode, loading);
  const { data } = useSWR(
    loading && transactionCode
      ? `/api/confirm-transaction?transactionCode=${transactionCode}`
      : null,
    { refreshInterval: 1000 }
  );

  if (data && data.status === "fail") {
    setSuccess(false);
    setLoading(false);
    setTransactionCode(null);
  }

  if (data && data.status === "success") {
    console.log("success");
    setSuccess(true);
    setLoading(false);
    setTransactionCode(null);
  }

  const defaultSuccess = useCallback(() => {
    setSuccess(null);
  });

  const requestToken = (Amount, PhoneNumber) => {
    return (e) => {
      e.preventDefault();

      fetchJson("/api/mpesa_hook", {
        method: "POST",
        body: JSON.stringify({ Amount, PhoneNumber }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          //set a waiting request to check for completion of payment
          console.log("first request", res);
          setTransactionCode(res.MerchantRequestID);
          setLoading(true);
        })
        .catch((err) => console.log(err));
    };
  };

  return { requestToken, success, loading, defaultSuccess };
}

export default useLipaNaMpesa;
