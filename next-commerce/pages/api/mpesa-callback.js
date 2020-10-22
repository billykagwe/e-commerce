/** @format */
import { connectToDatabase } from "../../utils/db";
import { Task } from "../../utils/types";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const { Body } = req.body;

  if (Body.stkCallback) {
    const { ResultCode, ResultDesc, MerchantRequestID } = Body?.stkCallback;
    db.collection("transaction")
      .updateOne(
        { MerchantRequestID: MerchantRequestID },
        { $set: { status: ResultCode === 0 ? "success" : "fail" } }
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
};
