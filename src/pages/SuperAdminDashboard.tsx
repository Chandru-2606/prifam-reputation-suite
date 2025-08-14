import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReviewsChart } from "@/components/charts/ReviewsChart";
import { SentimentChart } from "@/components/charts/SentimentChart";
import { PlatformChart } from "@/components/charts/PlatformChart";
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Settings,
  Plus,
  MoreHorizontal,
  Shield,
  CheckCircle,
  XCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockReviewsData = [
  { month: "Jan", reviews: 1245 },
  { month: "Feb", reviews: 1352 },
  { month: "Mar", reviews: 1138 },
  { month: "Apr", reviews: 1467 },
  { month: "May", reviews: 1571 },
  { month: "Jun", reviews: 1683 },
];

const mockSentimentData = [
  { name: "Positive", value: 2145, color: "hsl(var(--positive))" },
  { name: "Neutral", value: 1023, color: "hsl(var(--neutral))" },
  { name: "Negative", value: 687, color: "hsl(var(--negative))" },
];

const mockPlatformData = [
  { name: "Zomato", value: 1256 },
  { name: "Swiggy", value: 1143 },
  { name: "BlinkIT", value: 789 },
  { name: "Others", value: 567 },
];

const mockAdminAccounts = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    status: "active",
    createdDate: "2024-01-15",
    lastLogin: "2024-01-20"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    status: "active",
    createdDate: "2024-01-10",
    lastLogin: "2024-01-19"
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.wilson@company.com",
    status: "inactive",
    createdDate: "2024-01-05",
    lastLogin: "2024-01-12"
  },
];

const StatCard = ({ title, value, icon: Icon, change, changeType }: {
  title: string;
  value: string;
  icon: any;
  change: string;
  changeType: "positive" | "negative" | "neutral";
}) => (
  <Card className="card-hover">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-4 w-4 text-positive mr-1" />
            <span className={`text-sm font-medium ${
              changeType === "positive" ? "text-positive" : 
              changeType === "negative" ? "text-negative" : "text-neutral"
            }`}>
              {change}
            </span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary-muted flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const StatusBadge = ({ status }: { status: string }) => (
  <Badge className={status === "active" ? "status-positive" : "status-neutral"}>
    {status === "active" ? (
      <CheckCircle className="h-3 w-3 mr-1" />
    ) : (
      <XCircle className="h-3 w-3 mr-1" />
    )}
    {status}
  </Badge>
);

export default function SuperAdminDashboard() {
  return (
    <AppLayout userRole="admin">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Super Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">System-wide overview and admin management</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Admin
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Admins"
            value="23"
            icon={Users}
            change="+2"
            changeType="positive"
          />
          <StatCard
            title="Total Reviews"
            value="8,455"
            icon={MessageSquare}
            change="+15.5%"
            changeType="positive"
          />
          <StatCard
            title="Active Systems"
            value="12"
            icon={Settings}
            change="100%"
            changeType="positive"
          />
          <StatCard
            title="System Health"
            value="99.9%"
            icon={Shield}
            change="+0.1%"
            changeType="positive"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>System-wide Reviews</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ReviewsChart data={mockReviewsData} />
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Overall Sentiment</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <SentimentChart data={mockSentimentData} />
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Platform Usage</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <PlatformChart data={mockPlatformData} />
            </CardContent>
          </Card>
        </div>

        {/* Admin Management Table */}
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Admin Account Management</CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Email</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Created Date</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Last Login</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAdminAccounts.map((admin) => (
                    <tr key={admin.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-muted flex items-center justify-center">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium text-foreground">{admin.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{admin.email}</td>
                      <td className="p-4">
                        <StatusBadge status={admin.status} />
                      </td>
                      <td className="p-4 text-muted-foreground">{admin.createdDate}</td>
                      <td className="p-4 text-muted-foreground">{admin.lastLogin}</td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Admin</DropdownMenuItem>
                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}