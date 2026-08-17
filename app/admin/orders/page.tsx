import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Orders
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">
                Order
              </th>

              <th className="text-left p-3">
                Service
              </th>

              <th className="text-left p-3">
                Discord
              </th>

              <th className="text-left p-3">
                Price
              </th>

              <th className="text-left p-3">
                Status
              </th>

              <th className="text-left p-3">
                Created
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b"
              >
                <td className="p-3">
                    <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-blue-400 hover:underline"
                    >
                        {order.orderNumber}
                    </Link>
                </td>

                <td className="p-3">
                  {order.serviceType}
                </td>

                <td className="p-3">
                  {order.discord}
                </td>

                <td className="p-3">
                  €{order.price}
                </td>

                <td className="p-3">
                  {order.status}
                </td>

                <td className="p-3">
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}