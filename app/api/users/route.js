import users from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/util/mongodb";

export async function GET() {
  await dbConnect();
  try {
    const data = await users.find({}, { pin: 0 });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
