import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import StatusButtons from "./StatusButtons";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderPage({
  params,
}: Props) {
  const { id } = await params;

  const order =
    await prisma.order.findUnique({
      where: { id },
    });

  if (!order) {
    notFound();
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        {order.orderNumber}
      </h1>

      <div className="space-y-6">

        <div>
          <p className="mb-3 flex items-center gap-2">
            <strong>Status:</strong>

            <span
              className={`px-2 py-1 rounded-md text-sm font-medium ${getStatusClass(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </p>

          <StatusButtons
            orderId={order.id}
            currentStatus={order.status}
          />
        </div>

        <div className="space-y-3">

          <p>
            <strong>Service:</strong>{" "}
            {order.serviceType}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {order.email}
          </p>

          <p>
            <strong>Discord:</strong>{" "}
            {order.discord}
          </p>

          <p>
            <strong>Platform:</strong>{" "}
            {order.platform}
          </p>

          <p>
            <strong>Gamemode:</strong>{" "}
            {order.gameMode}
          </p>

          <p>
            <strong>Price:</strong> €
            {order.price}
          </p>

          <p>
            <strong>Current Rank:</strong>{" "}
            {order.currentRank ?? "-"}
          </p>

          <p>
            <strong>Desired Rank:</strong>{" "}
            {order.desiredRank ?? "-"}
          </p>

          <p>
            <strong>Reward Rank:</strong>{" "}
            {order.rewardRank ?? "-"}
          </p>

          <p>
            <strong>Reward Wins:</strong>{" "}
            {order.rewardWins ?? "-"}
          </p>

          <p>
            <strong>Placement Rank:</strong>{" "}
            {order.placementRank ?? "-"}
          </p>

          <p>
            <strong>Placement Matches:</strong>{" "}
            {order.placementMatches ??
              "-"}
          </p>

          <p>
            <strong>Tournament Rank:</strong>{" "}
            {order.tournamentRank ??
              "-"}
          </p>

          <p>
            <strong>Tournament Wins:</strong>{" "}
            {order.tournamentWins ??
              "-"}
          </p>

          <p>
            <strong>Extras:</strong>{" "}
            {order.extras ?? "-"}
          </p>

          <p>
            <strong>Notes:</strong>{" "}
            {order.notes ?? "-"}
          </p>

        </div>
      </div>
    </div>
  );
}

function getStatusClass(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-500/20 text-yellow-400";

    case "paid":
      return "bg-blue-500/20 text-blue-400";

    case "in-progress":
      return "bg-orange-500/20 text-orange-400";

    case "completed":
      return "bg-green-500/20 text-green-400";

    case "cancelled":
      return "bg-red-500/20 text-red-400";

    default:
      return "bg-gray-500/20 text-gray-400";
  }
}