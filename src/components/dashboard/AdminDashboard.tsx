import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { StatCard } from "./StatCard";
import { Header } from "@/components/layout/Header";
import { 
  Users, 
  Activity,
  Settings,
  BarChart3,
  UserPlus,
  FileSpreadsheet,
  ShieldCheck,
  Database,
  Globe,
  Download,
  Upload,
  Search
} from "lucide-react";

interface AdminDashboardProps {
  user: {
    name: string;
    email: string;
  };
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [systemStats] = useState({
    totalUsers: 156,
    totalStudents: 120,
    totalFaculty: 15,
    totalActivities: 324,
    pendingApprovals: 18,
    thisMonthActivities: 45
  });

  const [recentActivities] = useState([
    {
      id: 1,
      studentName: "John Doe",
      facultyName: "Dr. Smith",
      activity: "Research Paper Publication", 
      points: 40,
      status: "faculty_approved",
      submittedDate: "2024-01-22"
    },
    {
      id: 2,
      studentName: "Jane Wilson",
      facultyName: "Dr. Johnson",
      activity: "Technical Workshop",
      points: 25,
      status: "admin_pending", 
      submittedDate: "2024-01-21"
    },
    {
      id: 3,
      studentName: "Mike Brown",
      facultyName: "Dr. Davis",
      activity: "Volunteer Work",
      points: 30,
      status: "faculty_approved",
      submittedDate: "2024-01-20"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "faculty_approved":
        return <Badge variant="outline" className="border-success text-success">Faculty Approved</Badge>;
      case "admin_pending":
        return <Badge variant="outline" className="border-warning text-warning">Admin Review</Badge>;
      case "completed":
        return <Badge variant="default" className="bg-success text-success-foreground">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={{ name: user.name, role: "admin", email: user.email }} 
        onLogout={onLogout} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            System overview and administrative controls
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={systemStats.totalUsers}
            subtitle={`${systemStats.totalStudents} Students, ${systemStats.totalFaculty} Faculty`}
            icon={<Users className="h-5 w-5" />}
            variant="default"
          />
          <StatCard
            title="Total Activities"
            value={systemStats.totalActivities}
            subtitle="All time submissions"
            icon={<Activity className="h-5 w-5" />}
            variant="success"
          />
          <StatCard
            title="Pending Final Approvals"
            value={systemStats.pendingApprovals}
            subtitle="Awaiting admin review"
            icon={<ShieldCheck className="h-5 w-5" />}
            variant="warning"
          />
          <StatCard
            title="This Month"
            value={systemStats.thisMonthActivities}
            subtitle="New submissions"
            icon={<BarChart3 className="h-5 w-5" />}
            variant="success"
            trend={{ value: 12, isPositive: true }}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">System Overview</TabsTrigger>
            <TabsTrigger value="approvals">Final Approvals</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity Feed */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity Feed</CardTitle>
                  <CardDescription>Latest system activities requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{activity.activity}</h4>
                            <p className="text-sm text-muted-foreground">
                              {activity.studentName} • Reviewed by {activity.facultyName}
                            </p>
                          </div>
                          {getStatusBadge(activity.status)}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{activity.points} points</span>
                          <span className="text-xs text-muted-foreground">{activity.submittedDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <UserPlus className="h-6 w-6 mb-2" />
                      Add User
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <FileSpreadsheet className="h-6 w-6 mb-2" />
                      Export Data
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Database className="h-6 w-6 mb-2" />
                      Backup System
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Settings className="h-6 w-6 mb-2" />
                      System Config
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Final Approvals Required</CardTitle>
                    <CardDescription>Activities approved by faculty, awaiting admin confirmation</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search approvals..." className="pl-10 w-64" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.filter(a => a.status === "faculty_approved" || a.status === "admin_pending").map((activity) => (
                    <div key={activity.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{activity.activity}</h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            Student: {activity.studentName} • Faculty: {activity.facultyName}
                          </p>
                          <p className="text-sm text-muted-foreground">Points: {activity.points}</p>
                        </div>
                        {getStatusBadge(activity.status)}
                      </div>
                      <div className="flex gap-3">
                        <Button variant="success" size="sm">
                          <ShieldCheck className="h-4 w-4" />
                          Final Approve
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="destructive" size="sm">
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage students, faculty, and administrative users</CardDescription>
                  </div>
                  <Button variant="academic">
                    <UserPlus className="h-4 w-4" />
                    Add New User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">User Management System</h3>
                  <p className="text-muted-foreground mb-4">
                    Add, edit, and manage user accounts and permissions
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline">
                      <Upload className="h-4 w-4" />
                      Import Users
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4" />
                      Export Users
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Analytics</CardTitle>
                  <CardDescription>Usage statistics and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Analytics Dashboard</h3>
                    <p className="text-muted-foreground mb-4">
                      Detailed charts and reports coming soon
                    </p>
                    <Button variant="academic">View Analytics</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Export Reports</CardTitle>
                  <CardDescription>Generate and download system reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <h4 className="font-medium">Student Activity Report</h4>
                        <p className="text-sm text-muted-foreground">All student activities and points</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <h4 className="font-medium">Faculty Performance</h4>
                        <p className="text-sm text-muted-foreground">Review times and statistics</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <h4 className="font-medium">System Usage</h4>
                        <p className="text-sm text-muted-foreground">Platform usage analytics</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Manage system settings and configurations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Point Categories</h3>
                    <div className="space-y-2">
                      {[
                        { category: "Technical", points: "10-50" },
                        { category: "Sports", points: "5-25" },
                        { category: "Cultural", points: "5-30" },
                        { category: "Social Service", points: "15-40" }
                      ].map((item) => (
                        <div key={item.category} className="flex justify-between items-center p-2 border rounded">
                          <span>{item.category}</span>
                          <span className="text-sm text-muted-foreground">{item.points} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">System Settings</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Globe className="h-4 w-4 mr-2" />
                        General Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        Security Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Database className="h-4 w-4 mr-2" />
                        Database Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}