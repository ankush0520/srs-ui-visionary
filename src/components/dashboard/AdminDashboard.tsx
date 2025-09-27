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
  Search,
  TrendingUp,
  Calendar,
  Trophy,
  Heart,
  Briefcase,
  Music,
  Check
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

  // Activity categories data
  const [activityCategories] = useState([
    {
      id: 1,
      name: "Sports & Athletics",
      icon: <Trophy className="h-6 w-6" />,
      color: "text-blue-600 border-blue-200",
      activities: [
        { name: "Basketball Tournament", students: 25, points: 20, status: "pending" },
        { name: "Marathon Participation", students: 12, points: 15, status: "pending" },
        { name: "Cricket Championship", students: 30, points: 25, status: "approved" }
      ]
    },
    {
      id: 2,
      name: "Social Service",
      icon: <Heart className="h-6 w-6" />,
      color: "text-green-600 border-green-200",
      activities: [
        { name: "Blood Donation Camp", students: 45, points: 30, status: "pending" },
        { name: "Village Cleanup Drive", students: 20, points: 25, status: "approved" },
        { name: "Teaching Underprivileged", students: 15, points: 35, status: "pending" }
      ]
    },
    {
      id: 3,
      name: "Technical & Academic",
      icon: <Briefcase className="h-6 w-6" />,
      color: "text-purple-600 border-purple-200", 
      activities: [
        { name: "Hackathon Competition", students: 18, points: 40, status: "pending" },
        { name: "Research Publication", students: 8, points: 50, status: "approved" },
        { name: "Technical Workshop", students: 35, points: 20, status: "pending" }
      ]
    },
    {
      id: 4,
      name: "Cultural & Arts",
      icon: <Music className="h-6 w-6" />,
      color: "text-orange-600 border-orange-200",
      activities: [
        { name: "Annual Cultural Fest", students: 50, points: 25, status: "pending" },
        { name: "Art Exhibition", students: 12, points: 15, status: "approved" },
        { name: "Drama Performance", students: 22, points: 20, status: "pending" }
      ]
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
            <TabsTrigger value="activities">Activity Categories</TabsTrigger>
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

          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Activity Categories</CardTitle>
                <CardDescription>Manage activities by categories and approve submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activityCategories.map((category) => (
                    <Card key={category.id} className={`border-2 ${category.color}`}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={category.color}>
                            {category.icon}
                          </div>
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {category.activities.map((activity, index) => (
                            <div key={index} className="border rounded-lg p-3">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <h4 className="font-medium text-foreground">{activity.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {activity.students} students • {activity.points} points
                                  </p>
                                </div>
                                <Badge 
                                  variant={activity.status === "approved" ? "default" : "outline"}
                                  className={activity.status === "approved" ? "bg-success text-success-foreground" : "border-warning text-warning"}
                                >
                                  {activity.status}
                                </Badge>
                              </div>
                              {activity.status === "pending" && (
                                <Button 
                                  variant="success" 
                                  size="sm" 
                                  className="w-full mt-2"
                                  onClick={() => console.log("Approved activity:", activity.name)}
                                >
                                  <Check className="h-4 w-4" />
                                  Approve Activity
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Analytics</CardTitle>
                  <CardDescription>Real-time platform usage statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <TrendingUp className="h-8 w-8 mx-auto text-success mb-2" />
                        <p className="text-2xl font-bold text-foreground">89%</p>
                        <p className="text-sm text-muted-foreground">Activity Approval Rate</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <Calendar className="h-8 w-8 mx-auto text-primary mb-2" />
                        <p className="text-2xl font-bold text-foreground">2.3</p>
                        <p className="text-sm text-muted-foreground">Avg Review Days</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Monthly Activity Growth</span>
                        <span className="text-sm text-success">+23%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Faculty Engagement</span>
                        <span className="text-sm text-success">+15%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
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