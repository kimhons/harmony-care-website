import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Search, TrendingUp, Users, DollarSign, Target } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AdminCalculatorLeads() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [facilityTypeFilter, setFacilityTypeFilter] = useState<string>("all");

  // Fetch leads data
  const { data: leadsData, isLoading } = trpc.adminCalculatorLeads.getLeads.useQuery({});
  const { data: stats } = trpc.adminCalculatorLeads.getStats.useQuery();

  // Filter leads based on search and filters
  const filteredLeads = useMemo(() => {
    if (!leadsData?.leads) return [];

    return leadsData.leads.filter((lead) => {
      const matchesSearch =
        searchQuery === "" ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.facilityType && lead.facilityType.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSource =
        sourceFilter === "all" || lead.source === sourceFilter;

      const matchesFacilityType =
        facilityTypeFilter === "all" || lead.facilityType === facilityTypeFilter;

      return matchesSearch && matchesSource && matchesFacilityType;
    });
  }, [leadsData?.leads, searchQuery, sourceFilter, facilityTypeFilter]);

  // Export to CSV
  const handleExportCSV = () => {
    if (!filteredLeads || filteredLeads.length === 0) {
      toast.error("No leads to export");
      return;
    }

    const headers = [
      "Email",
      "Facility Type",
      "Residents",
      "Annual Savings",
      "Lead Score",
      "Lead Tier",
      "Source",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "Created At",
    ];

    const rows = filteredLeads.map((lead) => [
      lead.email,
      lead.facilityType || "N/A",
      lead.residentCount?.toString() || "0",
      lead.annualSavings ? `$${lead.annualSavings.toLocaleString()}` : "$0",
      lead.leadScore?.toString() || "0",
      lead.leadTier || "cold",
      lead.source,
      lead.utmSource || "N/A",
      lead.utmMedium || "N/A",
      lead.utmCampaign || "N/A",
      new Date(lead.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `calculator-leads-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success("CSV exported successfully!");
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24">
          <div className="text-center">
            <p className="text-muted-foreground">Loading leads data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats from API data
  const calculatorLeads = stats?.bySource.find(s => s.source === 'calculator')?.count || 0;
  const exitIntentLeads = stats?.bySource.find(s => s.source === 'exit-intent')?.count || 0;
  const totalLeads = stats?.total || 0;
  
  // Calculate total residents and avg from leads data
  const totalResidents = leadsData?.leads.reduce((sum, lead) => sum + (lead.residentCount || 0), 0) || 0;
  const avgResidents = totalLeads > 0 ? Math.round(totalResidents / totalLeads) : 0;
  
  // Calculate total projected savings
  const totalProjectedSavings = leadsData?.leads.reduce((sum, lead) => sum + (lead.annualSavings || 0), 0) || 0;
  const avgSavingsPerLead = stats?.avgSavings || 0;

  // Prepare chart data
  const leadsOverTimeData = {
    labels: stats?.leadsOverTime.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })) || [],
    datasets: [
      {
        label: 'New Leads',
        data: stats?.leadsOverTime.map(d => d.count) || [],
        borderColor: 'rgb(0, 102, 255)',
        backgroundColor: 'rgba(0, 102, 255, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const savingsBreakdownData = {
    labels: ['Overtime Reduction', 'Error Prevention', 'Compliance Savings', 'Retention Improvement'],
    datasets: [
      {
        label: 'Total Savings ($)',
        data: [
          stats?.savingsBreakdown.overtime || 0,
          stats?.savingsBreakdown.error || 0,
          stats?.savingsBreakdown.compliance || 0,
          stats?.savingsBreakdown.retention || 0,
        ],
        backgroundColor: [
          'rgba(0, 102, 255, 0.8)',
          'rgba(0, 204, 255, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
      },
    ],
  };

  const leadTierData = {
    labels: ['Hot Leads', 'Warm Leads', 'Cold Leads'],
    datasets: [
      {
        data: [
          stats?.byLeadTier.find(t => t.tier === 'hot')?.count || 0,
          stats?.byLeadTier.find(t => t.tier === 'warm')?.count || 0,
          stats?.byLeadTier.find(t => t.tier === 'cold')?.count || 0,
        ],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)', // Red for hot
          'rgba(245, 158, 11, 0.8)', // Orange for warm
          'rgba(59, 130, 246, 0.8)', // Blue for cold
        ],
        borderWidth: 0,
      },
    ],
  };

  const conversionFunnelData = {
    labels: ['Calculator Submissions', 'Exit-Intent Captures'],
    datasets: [
      {
        label: 'Lead Sources',
        data: [calculatorLeads, exitIntentLeads],
        backgroundColor: [
          'rgba(0, 102, 255, 0.8)',
          'rgba(0, 204, 255, 0.8)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Calculator Leads Dashboard</h1>
          <p className="text-muted-foreground">
            Track and manage leads captured from the savings calculator and exit-intent popup
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLeads}</div>
              <p className="text-xs text-muted-foreground">
                {calculatorLeads} calculator, {exitIntentLeads} exit-intent
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Residents</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalResidents}</div>
              <p className="text-xs text-muted-foreground">
                Avg: {avgResidents} per facility
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projected Savings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalProjectedSavings)}
              </div>
              <p className="text-xs text-muted-foreground">Annual across all leads</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Savings/Lead</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(avgSavingsPerLead)}
              </div>
              <p className="text-xs text-muted-foreground">Per facility annually</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Leads Over Time Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Leads Over Time (30 Days)</CardTitle>
              <CardDescription>Daily lead acquisition trend</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ height: '300px' }}>
                <Line data={leadsOverTimeData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Lead Scoring Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Quality Distribution</CardTitle>
              <CardDescription>Hot, Warm, and Cold leads by score</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ height: '300px' }}>
                <Doughnut data={leadTierData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Savings Breakdown Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Total Savings Breakdown</CardTitle>
              <CardDescription>Projected savings by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ height: '300px' }}>
                <Bar data={savingsBreakdownData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Conversion Funnel Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Source Performance</CardTitle>
              <CardDescription>Calculator vs Exit-Intent comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ height: '300px' }}>
                <Bar data={conversionFunnelData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email or facility..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Lead Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="calculator">Calculator</SelectItem>
                  <SelectItem value="exit-intent">Exit-Intent</SelectItem>
                </SelectContent>
              </Select>

              <Select value={facilityTypeFilter} onValueChange={setFacilityTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Facility Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Group Home">Group Home</SelectItem>
                  <SelectItem value="ICF-ID">ICF-ID</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleExportCSV} variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
            <CardDescription>Complete list of calculator and exit-intent leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Facility Type</TableHead>
                    <TableHead>Residents</TableHead>
                    <TableHead>Annual Savings</TableHead>
                    <TableHead>Lead Score</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        No leads found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.email}</TableCell>
                        <TableCell>{lead.facilityType || "N/A"}</TableCell>
                        <TableCell>{lead.residentCount || 0}</TableCell>
                        <TableCell>
                          {lead.annualSavings ? formatCurrency(lead.annualSavings) : "$0"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{lead.leadScore || 0}</span>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                lead.leadTier === "hot"
                                  ? "bg-red-100 text-red-800"
                                  : lead.leadTier === "warm"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {lead.leadTier || "cold"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              lead.source === "calculator"
                                ? "bg-primary/10 text-primary"
                                : "bg-accent/10 text-accent"
                            }`}
                          >
                            {lead.source}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
