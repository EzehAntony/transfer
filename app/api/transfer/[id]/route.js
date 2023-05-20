import users from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/util/mongodb";

export async function POST(req, { params }) {
  await dbConnect();
  const data = await req.json();
  try {
    const sender = await users.findOne({ username: data.from });
    const receiver = await users.findOne({ username: params.id });
    if (!sender || !receiver) {
      return NextResponse.json("Sender or receiver is invalid", {
        status: 401,
      });
    } else {
      if (data.amount <= 0) {
        return NextResponse.json("Amount should be greater than 0", {
          status: 401,
        });
      } else if (sender.account < data.amount) {
        return NextResponse.json("Insuffcient funds", { status: 401 });
      } else if (sender._id.toString() == receiver._id.toString()) {
        return NextResponse.json(
          "Unable to send funds to yourself, don't be too cleaver!",
          { status: 401 }
        );
      } else {
        //if password is correct
        const hashPin = await bcrypt.compare(data.pin, sender.pin);
        if (hashPin) {
          await sender.updateOne({
            $set: { account: sender.account - data.amount },
            $push: {
              history: {
                id: receiver._id,
                amount: data.amount,
                details: "debit",
                time: Date.now(),
                username: params.id,
              },
            },
          });
          await receiver.updateOne({
            $set: { account: receiver.account + data.amount },
            $push: {
              history: {
                id: sender._id,
                amount: data.amount,
                details: "credit",
                time: Date.now(),
                username: data.username,
              },
            },
          });

          return NextResponse.json(`Sent Funds to ${receiver.username}`, {
            status: 200,
          });
        } else {
          return NextResponse.json("Pin is incorrect, buddy!", {
            status: 401,
          });
        }
      }
    }
  } catch (err) {
    return NextResponse.json("An unexpected error occured", { status: 500 });
  }
}
