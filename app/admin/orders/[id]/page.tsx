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
          <p className="mb-3">
            <strong>Status:</strong>{" "}
            {order.status}
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