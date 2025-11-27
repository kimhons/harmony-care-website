import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Mail,
  MousePointerClick,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#667eea", "#764ba2", "#f093fb", "#4facfe", "#43e97b"];

export default function EmailEngagement() {
  const { data: metrics, isLoading } =
    trpc.emailEngagement.getMetrics.useQuery();
  const { data: sourcePerformance } =
    trpc.emailEngagement.getPerformanceBySource.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-12 w-96" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600">No email engagement data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Email Engagement Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor newsletter performance and nurture sequence effectiveness
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Subscribers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.totalSubscribers.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.activeSubscribers} active, {metrics.unsubscribed}{" "}
                unsubscribed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.overallOpenRate.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.totalOpens.toLocaleString()} opens /{" "}
                {metrics.totalEmailsSent.toLocaleString()} sent
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.overallClickRate.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.totalClicks.toLocaleString()} clicks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Nurture Completion
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.completionRate.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.nurtureCompleted} completed,{" "}
                {metrics.nurtureInProgress} in progress
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Email Type Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Email Performance by Type</CardTitle>
            <CardDescription>
              Open and click rates for each email in the nurture sequence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={metrics.emailTypeBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="emailType" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="openRate" fill="#667eea" name="Open Rate %" />
                <Bar dataKey="clickRate" fill="#764ba2" name="Click Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Email Type Stats Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Email Statistics</CardTitle>
            <CardDescription>
              Breakdown of sends, opens, and clicks by email type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">
                      Email Type
                    </th>
                    <th className="text-right py-3 px-4 font-medium">Sent</th>
                    <th className="text-right py-3 px-4 font-medium">Opens</th>
                    <th className="text-right py-3 px-4 font-medium">Clicks</th>
                    <th className="text-right py-3 px-4 font-medium">
                      Open Rate
                    </th>
                    <th className="text-right py-3 px-4 font-medium">
                      Click Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.emailTypeBreakdown.map(email => (
                    <tr
                      key={email.emailType}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 font-medium capitalize">
                        {email.emailType}
                      </td>
                      <td className="text-right py-3 px-4">
                        {email.sent.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        {email.opens.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        {email.clicks.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        {email.openRate.toFixed(1)}%
                      </td>
                      <td className="text-right py-3 px-4">
                        {email.clickRate.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Performance by Source */}
        {sourcePerformance && sourcePerformance.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Performance by Blog Article</CardTitle>
              <CardDescription>
                Which blog articles drive the most engaged subscribers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">
                        Source
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        Subscribers
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        Avg Opens
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        Avg Clicks
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        Open Rate
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        Click Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sourcePerformance.slice(0, 10).map(source => (
                      <tr
                        key={source.source}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 font-medium">
                          {source.source}
                        </td>
                        <td className="text-right py-3 px-4">
                          {source.subscribers.toLocaleString()}
                        </td>
                        <td className="text-right py-3 px-4">
                          {source.avgOpens.toFixed(1)}
                        </td>
                        <td className="text-right py-3 px-4">
                          {source.avgClicks.toFixed(1)}
                        </td>
                        <td className="text-right py-3 px-4">
                          {source.openRate.toFixed(1)}%
                        </td>
                        <td className="text-right py-3 px-4">
                          {source.clickRate.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top Engaged Subscribers */}
        <Card>
          <CardHeader>
            <CardTitle>Most Engaged Subscribers</CardTitle>
            <CardDescription>
              Top 10 subscribers by total email engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Email</th>
                    <th className="text-left py-3 px-4 font-medium">Name</th>
                    <th className="text-right py-3 px-4 font-medium">Opens</th>
                    <th className="text-right py-3 px-4 font-medium">Clicks</th>
                    <th className="text-left py-3 px-4 font-medium">
                      Nurture Stage
                    </th>
                    <th className="text-left py-3 px-4 font-medium">
                      Last Engagement
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.topEngagedSubscribers.map(sub => (
                    <tr key={sub.email} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{sub.email}</td>
                      <td className="py-3 px-4">{sub.name || "-"}</td>
                      <td className="text-right py-3 px-4">{sub.opens}</td>
                      <td className="text-right py-3 px-4">{sub.clicks}</td>
                      <td className="py-3 px-4 capitalize">
                        {sub.nurtureStage || "Not started"}
                      </td>
                      <td className="py-3 px-4">
                        {sub.lastEngagement
                          ? new Date(sub.lastEngagement).toLocaleDateString()
                          : "Never"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Subscriber Growth Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Subscriber Growth (Last 30 Days)</CardTitle>
            <CardDescription>Daily new subscriber signups</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={metrics.engagementTimeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="newSubscribers"
                  stroke="#667eea"
                  strokeWidth={2}
                  name="New Subscribers"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
