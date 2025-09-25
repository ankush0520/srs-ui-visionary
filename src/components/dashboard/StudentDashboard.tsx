import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "./StatCard";
import { Header } from "@/components/layout/Header";
import { 
  Plus, 
  Trophy, 
  Clock, 
  CheckCircle, 
  XCircle,
  FileText,
  Calendar,
  Target
} from "lucide-react";

interface StudentDashboardProps {
  user: {
    name: string;
    email: string;
    studentId: string;
    department: string;
  };
  onLogout: () => void;
}

export function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [activities] = useState([
    {
      id: 1,
      title: "Technical Workshop - React.js",
      category: "Technical",
      points: 15,
      status: "approved",
      submittedDate: "2024-01-15",
      facultyComments: "Well documented participation"
    },
    {
      id: 2,
      title: "Basketball Tournament",
      category: "Sports",
      points: 10,
      status: "pending",
      submittedDate: "2024-01-20",
      facultyComments: null
    },
    {
      id: 3,
      title: "Blood Donation Camp",
      category: "Social Service",
      points: 20,
      status: "rejected",
      submittedDate: "2024-01-10",
      facultyComments: "Insufficient documentation"
    }
  ]);

  const totalPoints = activities
    .filter(a => a.status === "approved")
    .reduce((sum, a) => sum + a.points, 0);
  
  const pendingActivities = activities.filter(a => a.status === "pending").length;
  const approvedActivities = activities.filter(a => a.status === "approved").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="default" className="bg-success text-success-foreground">Approved</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-warning text-warning">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={{ name: user.name, role: "student", email: user.email }} 
        onLogout={onLogout} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            Track your activity points and submit new activities for approval
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Points"
            value={totalPoints}
            subtitle="Required: 100 points"
            icon={<Trophy className="h-5 w-5" />}
            variant="success"
          />
          <StatCard
            title="Pending Reviews"
            value={pendingActivities}
            subtitle="Awaiting approval"
            icon={<Clock className="h-5 w-5" />}
            variant="warning"
          />
          <StatCard
            title="Approved Activities"
            value={approvedActivities}
            subtitle="Successfully completed"
            icon={<CheckCircle className="h-5 w-5" />}
            variant="success"
          />
          <StatCard
            title="Progress"
            value={`${Math.round((totalPoints / 100) * 100)}%`}
            subtitle="Towards graduation"
            icon={<Target className="h-5 w-5" />}
            variant="default"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="activities" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="activities">My Activities</TabsTrigger>
              <TabsTrigger value="submit">Submit New</TabsTrigger>
              <TabsTrigger value="progress">Progress Report</TabsTrigger>
            </TabsList>
            
            <Button variant="academic">
              <Plus className="h-4 w-4" />
              Quick Submit
            </Button>
          </div>

          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Activity History</CardTitle>
                <CardDescription>
                  View all your submitted activities and their approval status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground">{activity.category} • {activity.points} points</p>
                        </div>
                        {getStatusBadge(activity.status)}
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Submitted: {activity.submittedDate}
                        </span>
                      </div>
                      
                      {activity.facultyComments && (
                        <div className="mt-3 p-3 bg-muted rounded-md">
                          <p className="text-xs font-medium text-muted-foreground mb-1">Faculty Comments:</p>
                          <p className="text-sm">{activity.facultyComments}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle>Submit New Activity</CardTitle>
                <CardDescription>
                  Submit your activity for faculty review and point allocation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Activity Submission Form</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload proof documents and fill activity details
                  </p>
                  <Button variant="academic">
                    <Plus className="h-4 w-4" />
                    Start Submission
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Points Breakdown</CardTitle>
                  <CardDescription>Points by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "Technical", points: 15, required: 30, color: "bg-primary" },
                      { category: "Sports", points: 0, required: 20, color: "bg-warning" },
                      { category: "Social Service", points: 0, required: 25, color: "bg-success" },
                      { category: "Cultural", points: 0, required: 25, color: "bg-secondary-dark" }
                    ].map((item) => (
                      <div key={item.category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{item.category}</span>
                          <span>{item.points}/{item.required} points</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.color} transition-all duration-300`}
                            style={{ width: `${(item.points / item.required) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Graduation Status</CardTitle>
                  <CardDescription>Your progress towards requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="relative w-32 h-32 mx-auto">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="hsl(var(--muted))"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="hsl(var(--success))"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - totalPoints / 100)}`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-foreground">{totalPoints}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">
                        {totalPoints >= 100 ? "Requirements Complete!" : `${100 - totalPoints} points remaining`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {totalPoints >= 100 ? "Ready for graduation" : "Keep up the great work!"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}