import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CustomerDashboard() {
  const stats = [
    { title: "Total Orders", value: 124 },
    { title: "Pending Orders", value: 7 },
    { title: "Total Spent", value: "$3,420" },
    { title: "Rewards Points", value: 560 },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
      <p>This is a demo page</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Order #1023 - Completed</li>
              <li>Order #1024 - Pending</li>
              <li>Order #1025 - Shipped</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
