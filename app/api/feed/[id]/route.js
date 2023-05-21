import users from "@/models/users";
import dbConnect from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    //to fetch the user data
    const user = await users.findOne({ _id: params.id }, { pin: 0 });
    //to fetch all the users in the database
    const allUsers = await users.find({}, { pin: 0 });
    //to get the history of the user
    const history = await Promise.all(
      user.history.map(async (user) => {
        const us = await users.findOne(
          { _id: user.id },
          { firstname: 1, username: 1, lastname: 1 }
        );

        return { user: us, amountDetail: user };
      })
    );
    const dataAll = await Promise.all([user, allUsers, history]).then(
      ([f, s, t]) => ({ user: f, allUsers: s, history: t })
    );
    return NextResponse.json(dataAll, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
