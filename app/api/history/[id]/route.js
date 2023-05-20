import users from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/util/mongodb";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const data = await users.findOne({ username: params.id }, { pin: 0 });

    const history = await Promise.all(
      data.history.map(async (user) => {
        const us = await users.findOne(
          { _id: user.id },
          { firstname: 1, username: 1, lastname: 1 }
        );

        return { user: us, amountDetail: user };
      })
    );

    return NextResponse.json(history, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
