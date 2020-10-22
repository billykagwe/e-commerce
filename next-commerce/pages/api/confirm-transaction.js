/** @format */

import { connectToDatabase } from "../../utils/db";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { transactionCode } = req.query;
  console.log(typeof transactionCode, req.query);
  return db
    .collection("transaction")
    .findOne({ MerchantRequestID: `${transactionCode}` })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => console.log(err));
};
