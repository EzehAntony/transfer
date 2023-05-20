import users from "@/models/users";
import dbConnect from "@/util/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req, res) {
  await dbConnect();
  try {
    const body = await req.json();
    const user = await users.findOne({ username: body.username });

    if (user) {
      return NextResponse.json("user already exists", { status: 500 });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPin = await bcrypt.hash(body.pin, salt);
      const newUser = new users({
        username: body.username,
        firstname: body.firstname,
        lastname: body.lastname,
        pin: hashedPin,
        age: body.age,
      });
      const savedUser = await newUser.save();
      const { pin, ...others } = savedUser._doc;
      return NextResponse.json(others, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json("An unexpected error occured", { status: 500 });
  }
}
