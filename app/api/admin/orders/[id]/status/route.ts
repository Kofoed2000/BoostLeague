import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const { status } = body;

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          message: "Status is required.",
        },
        {
          status: 400,
        }
      );
    }

    const order =
      await prisma.order.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update order status.",
      },
      {
        status: 500,
      }
    );
  }
}