import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Users, Building2, TrendingUp, Mail, BarChart3, Clock } from "lucide-react";
// Auth context not available in static template
// Will add auth check after upgrading
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { data: user } = trpc.auth.me.useQuery();
  
  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      setLocation('/');
    }
  }, [user, setLocation]);
  
  const { data: analytics, isLoading } = trpc.admin.analytics.useQuery();
  const { data: signups } = trpc.admin.signups.useQuery();
  
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You must be an admin to view this page.</p>
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto py-12">
          <div className="text-center">Loading dashboard...</div>
        </div>
      </div>
    );
  }
  
  if (!analytics) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto py-12">
          <div className="text-center text-red-500">Failed to load analytics data</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Founding Member Analytics & Campaign Statistics</p>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Signups</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics.totalSignups}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Founding members
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Residents</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics.totalResidents}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Avg: {analytics.avgResidentsPerFacility} per facility
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active in Campaign</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics.campaignStats.activeInCampaign}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {analytics.campaignStats.optedOut} opted out
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Object.values(analytics.campaignStats.emailsSentByType).reduce((a, b) => a + b, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all campaigns
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Signups by Tier */}
          <Card>
            <CardHeader>
              <CardTitle>Signups by Tier</CardTitle>
              <CardDescription>Distribution of founding member tiers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analytics.signupsByTier).map(([tier, count]) => {
                  const percentage = ((count / analytics.totalSignups) * 100).toFixed(1);
                  return (
                    <div key={tier}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{tier}</span>
                        <span className="text-sm text-muted-foreground">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          {/* Signups by Facility Type */}
          <Card>
            <CardHeader>
              <CardTitle>Signups by Facility Type</CardTitle>
              <CardDescription>Distribution across facility categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analytics.signupsByFacilityType).map(([type, count]) => {
                  const percentage = ((count / analytics.totalSignups) * 100).toFixed(1);
                  return (
                    <div key={type}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{type}</span>
                        <span className="text-sm text-muted-foreground">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-coral-500 h-2 rounded-full"
                          style={{ width: `${percentage}%`, background: '#FF6B6B' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Email Campaign Statistics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Email Campaign Performance</CardTitle>
            <CardDescription>Emails sent by campaign type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(analytics.campaignStats.emailsSentByType).map(([type, count]) => (
                <div key={type} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{count}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* UTM Marketing Attribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Signups by Source */}
          <Card>
            <CardHeader>
              <CardTitle>Signups by Source</CardTitle>
              <CardDescription>Where founding members are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analytics.utmStats.bySource)
                  .sort(([, a], [, b]) => b - a)
                  .map(([source, count]) => {
                    const percentage = ((count / analytics.totalSignups) * 100).toFixed(1);
                    return (
                      <div key={source}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{source || 'Direct/Unknown'}</span>
                          <span className="text-sm text-muted-foreground">{count} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
          
          {/* Signups by Medium */}
          <Card>
            <CardHeader>
              <CardTitle>Signups by Medium</CardTitle>
              <CardDescription>Marketing channels driving conversions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analytics.utmStats.byMedium)
                  .sort(([, a], [, b]) => b - a)
                  .map(([medium, count]) => {
                    const percentage = ((count / analytics.totalSignups) * 100).toFixed(1);
                    return (
                      <div key={medium}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{medium || 'Direct/Unknown'}</span>
                          <span className="text-sm text-muted-foreground">{count} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Top Campaigns */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Top Marketing Campaigns</CardTitle>
            <CardDescription>Most effective campaigns by signup volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(analytics.utmStats.byCampaign)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 6)
                .map(([campaign, count]) => (
                  <div key={campaign} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{campaign || 'No Campaign'}</span>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Top Interested Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Most Requested Features</CardTitle>
            <CardDescription>Features founding members are most interested in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(analytics.featureCounts)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 9)
                .map(([feature, count]) => (
                  <div key={feature} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{feature}</span>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Signups */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
            <CardDescription>Latest 10 founding member registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Facility</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.recentSignups.map((signup) => (
                  <TableRow key={signup.id}>
                    <TableCell className="font-medium">{signup.name}</TableCell>
                    <TableCell>{signup.email}</TableCell>
                    <TableCell>{signup.facilityName}</TableCell>
                    <TableCell>{signup.facilityType}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{signup.tier}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(signup.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* All Signups Table */}
        {signups && (
          <Card>
            <CardHeader>
              <CardTitle>All Signups ({signups.length})</CardTitle>
              <CardDescription>Complete list of founding member registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-[600px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Facility</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Residents</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {signups.map((signup) => (
                      <TableRow key={signup.id}>
                        <TableCell>{signup.id}</TableCell>
                        <TableCell className="font-medium">
                          {signup.firstName} {signup.lastName}
                        </TableCell>
                        <TableCell>{signup.email}</TableCell>
                        <TableCell>{signup.phone || '-'}</TableCell>
                        <TableCell>{signup.facilityName}</TableCell>
                        <TableCell>{signup.facilityType}</TableCell>
                        <TableCell>{signup.residentCount}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{signup.tier}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(signup.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
