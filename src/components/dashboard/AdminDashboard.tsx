import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  Check,
  ArrowLeft
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

  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<number[]>([]);

  const [allActivities] = useState([
    { id: 1, name: "Basketball Tournament", category: "Sports & Athletics", points: 20, description: "Inter-college basketball competition" },
    { id: 2, name: "Blood Donation Camp", category: "Social Service", points: 30, description: "Community blood donation drive" },
    { id: 3, name: "Hackathon Competition", category: "Technical & Academic", points: 40, description: "24-hour coding competition" },
    { id: 4, name: "Annual Cultural Fest", category: "Cultural & Arts", points: 25, description: "College cultural festival" },
    { id: 5, name: "Marathon Participation", category: "Sports & Athletics", points: 15, description: "City marathon event" },
    { id: 6, name: "Research Publication", category: "Technical & Academic", points: 50, description: "Academic research paper publication" },
    { id: 7, name: "Village Cleanup Drive", category: "Social Service", points: 25, description: "Environmental cleanup initiative" },
    { id: 8, name: "Art Exhibition", category: "Cultural & Arts", points: 15, description: "Student art showcase" }
  ]);

  const [facultyList] = useState([
    { id: 1, name: "Dr. Smith", department: "Computer Science", email: "smith@college.edu", experience: "10 years" },
    { id: 2, name: "Dr. Johnson", department: "Electronics", email: "johnson@college.edu", experience: "8 years" },
    { id: 3, name: "Dr. Davis", department: "Mechanical", email: "davis@college.edu", experience: "12 years" },
    { id: 4, name: "Dr. Wilson", department: "Civil", email: "wilson@college.edu", experience: "6 years" },
    { id: 5, name: "Dr. Brown", department: "Chemical", email: "brown@college.edu", experience: "15 years" },
    { id: 6, name: "Dr. Miller", department: "Physics", email: "miller@college.edu", experience: "9 years" },
    { id: 7, name: "Dr. Taylor", department: "Mathematics", email: "taylor@college.edu", experience: "7 years" },
    { id: 8, name: "Dr. Anderson", department: "Chemistry", email: "anderson@college.edu", experience: "11 years" }
  ]);

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
        <Tabs defaultValue="approvals" className="space-y-6">
          <TabsList>
            <TabsTrigger value="approvals">Final Approvals</TabsTrigger>
            <TabsTrigger value="manageUsers">Manage Users</TabsTrigger>
            <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
          </TabsList>

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

          <TabsContent value="manageUsers">
            {!selectedActivity ? (
              <Card>
                <CardHeader>
                  <CardTitle>Manage Users - Activities</CardTitle>
                  <CardDescription>Select an activity to assign faculty members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allActivities.map((activity) => (
                      <Card 
                        key={activity.id} 
                        className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary"
                        onClick={() => setSelectedActivity(activity)}
                      >
                        <CardHeader>
                          <CardTitle className="text-lg">{activity.name}</CardTitle>
                          <CardDescription>{activity.category}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                            <div className="flex justify-between items-center">
                              <Badge variant="outline">{activity.points} points</Badge>
                              <Button variant="ghost" size="sm">
                                Select →
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setSelectedActivity(null);
                        setSelectedFaculty([]);
                      }}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                    <div>
                      <CardTitle>Assign Faculty - {selectedActivity.name}</CardTitle>
                      <CardDescription>Select faculty members to assign to this activity</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="selectAll"
                          checked={selectedFaculty.length === facultyList.length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFaculty(facultyList.map(f => f.id));
                            } else {
                              setSelectedFaculty([]);
                            }
                          }}
                        />
                        <label htmlFor="selectAll" className="font-medium">
                          Select All Faculty ({selectedFaculty.length} selected)
                        </label>
                      </div>
                      <Button 
                        variant="default" 
                        disabled={selectedFaculty.length === 0}
                        onClick={() => {
                          console.log("Assigning faculty:", selectedFaculty, "to activity:", selectedActivity.name);
                          // Reset selection after assignment
                          setSelectedFaculty([]);
                        }}
                      >
                        Assign Selected Faculty
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {facultyList.map((faculty) => (
                        <div key={faculty.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id={`faculty-${faculty.id}`}
                              checked={selectedFaculty.includes(faculty.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedFaculty([...selectedFaculty, faculty.id]);
                                } else {
                                  setSelectedFaculty(selectedFaculty.filter(id => id !== faculty.id));
                                }
                              }}
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-foreground">{faculty.name}</h3>
                              <p className="text-sm text-muted-foreground">{faculty.department}</p>
                              <p className="text-sm text-muted-foreground">{faculty.email}</p>
                              <p className="text-xs text-muted-foreground mt-1">Experience: {faculty.experience}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}