/** @format */

import moment from "moment";
import { Task } from "./types";
import fetchJson from "./fetchJson";

const url = `https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials`;
const auth_token =
  "Basic " +
  new Buffer(
    process.env.CONSUMER_KEY + ":" + process.env.CONSUMER_SECRET
  ).toString("base64");

export const get_credentials = Task((rej, res) =>
  fetchJson(url, {
    headers: {
      Authorization: auth_token,
    },
  })
    .then((result) => res(result))
    .catch((err) => rej(err))
);
// Shortcode+Passkey+Timestamp
const process_url = `https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest`;
const format_time = moment().format("YYYYMMDDHHMMSS");

const create_password = () => {
  const encode_str = process.env.Shortcode + process.env.Passkey + format_time;
  return Buffer.from(encode_str).toString("base64");
};
//phone number and amount from client
const credentials = {
  Shortcode: process.env.Shortcode,
  Password: create_password(),
  Timestamp: format_time,
  PartyB: process.env.Shortcode,
  CallBackURL: "https://87dc70cda7df.ngrok.io/api/mpesa-callback",
  AccountReference: "Easy Shop",
  TransactionDesc: "Products",
};

const initiate_transaction = (({
  Shortcode,
  Password,
  Timestamp,
  CallBackURL,
  AccountReference,
  TransactionDesc,
}) => ({ PhoneNumber, Amount }) => ({ access_token }) => {
  return Task((rej, res) =>
    fetchJson(process_url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token} `,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: Shortcode,
        Password: Password,
        Timestamp: Timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Amount,
        PartyA: PhoneNumber,
        PartyB: Shortcode,
        PhoneNumber: PhoneNumber,
        CallBackURL: CallBackURL,
        AccountReference: AccountReference,
        TransactionDesc: TransactionDesc,
      }),
    })
      // .then(result => result.json())
      .then((data) => res(data))
      .catch((err) => rej(err))
  );
})({ ...credentials });

export const transfer_funds = ({ PhoneNumber, Amount }) =>
  get_credentials.chain(initiate_transaction({ PhoneNumber, Amount }));

export const save_transaction = (db) => (transaction) => {
  console.log("ajmzaax ", transaction);
  return Task((rej, res) => {
    db.collection("transaction")
      .insertOne({ ...transaction, status: "processing" })
      .then((data) => res(data.ops[0]))
      .catch((err) => rej(err));
  });
};
