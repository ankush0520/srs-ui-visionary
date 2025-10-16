import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  Target,
  Upload
} from "lucide-react";

export function StudentDashboard({ user, onLogout }) {
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

  const [activityDetails, setActivityDetails] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const totalPoints = activities
    .filter(a => a.status === "approved")
    .reduce((sum, a) => sum + a.points, 0);
  
  const pendingActivities = activities.filter(a => a.status === "pending").length;
  const approvedActivities = activities.filter(a => a.status === "approved").length;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activityDetails.trim()) {
      alert("Please enter activity details");
      return;
    }
    if (!selectedFile) {
      alert("Please upload proof document");
      return;
    }
    // TODO: Handle form submission
    console.log("Activity Details:", activityDetails);
    console.log("Proof File:", selectedFile);
    alert("Activity submitted successfully!");
    setActivityDetails("");
    setSelectedFile(null);
  };

  const getStatusBadge = (status) => {
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
          <TabsList>
            <TabsTrigger value="activities">My Activities</TabsTrigger>
            <TabsTrigger value="submit">Submit New</TabsTrigger>
          </TabsList>

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
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="activity-details">Activity Details *</Label>
                    <Textarea
                      id="activity-details"
                      placeholder="Please describe your activity in detail including what you did, when, where, and any achievements or learnings..."
                      value={activityDetails}
                      onChange={(e) => setActivityDetails(e.target.value)}
                      className="min-h-[120px] resize-none"
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Provide comprehensive details about your activity participation
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proof-upload">Upload Proof Documents *</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors">
                      <div className="text-center space-y-4">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground">
                            PDF, JPG, PNG files up to 10MB
                          </p>
                        </div>
                        <Input
                          id="proof-upload"
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('proof-upload')?.click()}
                        >
                          Choose File
                        </Button>
                      </div>
                    </div>
                    {selectedFile && (
                      <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                        <FileText className="h-4 w-4 text-success" />
                        <span className="text-sm font-medium">{selectedFile.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedFile(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Upload certificates, photos, or any documents that prove your participation
                    </p>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Activity
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}
