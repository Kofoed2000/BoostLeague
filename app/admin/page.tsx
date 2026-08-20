import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
    const session = await auth();

    if (!session) {
        redirect("/api/auth/signin");
    }

    const totalOrders =
        await prisma.order.count();

    const pendingOrders =
        await prisma.order.count({
            where: {
                status: "pending",
            },
        });

    const paidOrders =
        await prisma.order.count({
            where: {
                status: "paid",
            },
        });

    const inProgressOrders =
        await prisma.order.count({
            where: {
                status: "in-progress",
            },
        });

    const completedOrders =
        await prisma.order.count({
            where: {
                status: "completed",
            },
        });

    const cancelledOrders =
        await prisma.order.count({
            where: {
                status: "cancelled",
            },
        });

    const revenue =
        await prisma.order.aggregate({
            _sum: {
                price: true,
            },
        });

    const latestOrders =
        await prisma.order.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
        });

    return (
        <div className="p-8">
            <h1 className="mb-8 text-4xl font-bold">
                Admin Dashboard
            </h1>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                <div className="rounded-2xl bg-zinc-900 p-6">
                    <p className="text-gray-400">
                        Total Orders
                    </p>

                    <p className="mt-2 text-4xl font-bold">
                        {totalOrders}
                    </p>
                </div>

                <div className="rounded-2xl bg-yellow-500/10 p-6">
                    <p className="text-yellow-400">
                        Pending
                    </p>

                    <p className="mt-2 text-4xl font-bold">
                        {pendingOrders}
                    </p>
                </div>

                <div className="rounded-2xl bg-blue-500/10 p-6">
                    <p className="text-blue-400">
                        Paid
                    </p>

                    <p className="mt-2 text-4xl font-bold">
                        {paidOrders}
                    </p>
                </div>

                <div className="rounded-2xl bg-orange-500/10 p-6">
                    <p className="text-orange-400">
                        In Progress
                    </p>

                    <p className="mt-2 text-4xl font-bold">
                        {inProgressOrders}
                    </p>
                </div>

                <div className="rounded-2xl bg-green-500/10 p-6">
                    <p className="text-green-400">
                        Completed
                    </p>

                    <p className="mt-2 text-4xl font-bold">
                        {completedOrders}
                    </p>
                </div>

                <div className="rounded-2xl bg-red-500/10 p-6">
                    <p className="text-red-400">
                        Cancelled
                    </p>

                    <p className="mt-2 text-4xl font-bold">
                        {cancelledOrders}
                    </p>
                </div>

            </div>

            <div className="mt-6 rounded-2xl bg-blue-500/10 p-6">
                <p className="text-blue-400">
                    Total Revenue
                </p>

                <p className="mt-2 text-5xl font-bold">
                    €
                    {revenue._sum.price?.toFixed(2) ??
                        "0.00"}
                </p>
            </div>

            <div className="mt-8 rounded-2xl bg-zinc-900 p-6">

                <div className="mb-4 flex items-center justify-between">

                    <h2 className="text-2xl font-bold">
                        Latest Orders
                    </h2>

                    <Link
                        href="/admin/orders"
                        className="text-blue-400 hover:underline"
                    >
                        View All
                    </Link>

                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">

                        <thead>
                            <tr className="border-b border-zinc-700">
                                <th className="p-3 text-left">
                                    Order
                                </th>

                                <th className="p-3 text-left">
                                    Service
                                </th>

                                <th className="p-3 text-left">
                                    Discord
                                </th>

                                <th className="p-3 text-left">
                                    Price
                                </th>

                                <th className="p-3 text-left">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {latestOrders.map(
                                (order) => (
                                    <tr
                                        key={order.id}
                                        className="border-b border-zinc-800"
                                    >
                                        <td className="p-3">
                                            <Link
                                                href={`/admin/orders/${order.id}`}
                                                className="text-blue-400 hover:underline"
                                            >
                                                {
                                                    order.orderNumber
                                                }
                                            </Link>
                                        </td>

                                        <td className="p-3">
                                            {
                                                order.serviceType
                                            }
                                        </td>

                                        <td className="p-3">
                                            {order.discord}
                                        </td>

                                        <td className="p-3">
                                            €
                                            {order.price}
                                        </td>

                                        <td className="p-3">
                                            {order.status}
                                        </td>
                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    );
}