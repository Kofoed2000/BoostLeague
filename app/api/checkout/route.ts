import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const checkout = await request.json();

    console.log("Received checkout:", checkout);

    return NextResponse.json({
      success: true,
      message: "Checkout received successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}