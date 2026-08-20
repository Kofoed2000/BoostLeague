import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
};

export default async function OrdersPage({
  searchParams,
}: Props) {
  const { search, status } =
    await searchParams;

  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const orders = await prisma.order.findMany({
    where: {
      ...(search && {
        orderNumber: {
          contains: search,
          mode: "insensitive",
        },
      }),

      ...(status &&
        status !== "all" && {
        status,
      }),
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Orders
      </h1>

      <form className="mb-6">
        <input
          type="text"
          name="search"
          placeholder="Search order number..."
          defaultValue={search}
          className="
            w-full
            max-w-md
            rounded-lg
            border
            border-gray-700
            bg-zinc-900
            px-4
            py-2
          "
        />
      </form>

      <div className="flex flex-wrap gap-2 mb-6">

        <Link
          href="/admin/orders"
          className="rounded-lg bg-zinc-800 px-3 py-2 hover:bg-zinc-700"
        >
          All
        </Link>

        <Link
          href="/admin/orders?status=pending"
          className="rounded-lg bg-yellow-500/20 px-3 py-2 text-yellow-400"
        >
          Pending
        </Link>

        <Link
          href="/admin/orders?status=paid"
          className="rounded-lg bg-blue-500/20 px-3 py-2 text-blue-400"
        >
          Paid
        </Link>

        <Link
          href="/admin/orders?status=in-progress"
          className="rounded-lg bg-orange-500/20 px-3 py-2 text-orange-400"
        >
          In Progress
        </Link>

        <Link
          href="/admin/orders?status=completed"
          className="rounded-lg bg-green-500/20 px-3 py-2 text-green-400"
        >
          Completed
        </Link>

        <Link
          href="/admin/orders?status=cancelled"
          className="rounded-lg bg-red-500/20 px-3 py-2 text-red-400"
        >
          Cancelled
        </Link>

      </div>

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
                  <span
                    className={`px-2 py-1 rounded-md text-sm font-medium ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
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

function getStatusClass(
  status: string
) {
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