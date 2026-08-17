"use client";

import { useRouter } from "next/navigation";

const statuses = [
  "pending",
  "paid",
  "in-progress",
  "completed",
  "cancelled",
];

type Props = {
  orderId: string;
  currentStatus: string;
};

export default function StatusButtons({
  orderId,
  currentStatus,
}: Props) {
  const router = useRouter();

  async function updateStatus(
    status: string
  ) {
    const response = await fetch(
      `/api/admin/orders/${orderId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() =>
            updateStatus(status)
          }
          className={`rounded-lg px-4 py-2 font-medium transition ${
            currentStatus === status
              ? "bg-green-600"
              : "bg-zinc-800 hover:bg-zinc-700"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}