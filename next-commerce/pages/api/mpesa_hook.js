/** @format */

import { transfer_funds, save_transaction } from "../../utils/helpers";
import { connectToDatabase } from "../../utils/db";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { Amount, PhoneNumber } = req.body;

  transfer_funds({ Amount: `${Amount}`, PhoneNumber })
    .chain(save_transaction(db))
    .fork(res.json, res.json);
};
