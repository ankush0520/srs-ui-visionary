import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatCard } from "./StatCard";
import { Header } from "@/components/layout/Header";
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle,
  Search,
  FileText,
  MessageSquare,
  Eye,
  Check,
  X
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export function FacultyDashboard({ user, onLogout }) {
  const [pendingRequests] = useState([
    {
      id: 1,
      studentName: "John Doe",
      studentId: "M251001CS",
      title: "Hackathon Participation",
      category: "Technical",
      points: 25,
      submittedDate: "2024-01-22",
      description: "Participated in 48-hour hackathon and developed a web application",
      proofDocuments: ["certificate.pdf", "project_screenshots.png"],
      status: "pending"
    },
    {
      id: 2,
      studentName: "Jane Smith",
      studentId: "M251002CS",
      title: "Volunteer Teaching",
      category: "Social Service",
      points: 30,
      submittedDate: "2024-01-21",
      description: "Taught programming basics to underprivileged children for 2 weeks",
      proofDocuments: ["volunteer_certificate.pdf"],
      status: "pending"
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      studentId: "M251003CS",
      title: "Research Paper Publication",
      category: "Academic",
      points: 40,
      submittedDate: "2024-01-20",
      description: "Published research paper in IEEE conference",
      proofDocuments: ["paper.pdf", "acceptance_letter.pdf"],
      status: "pending"
    }
  ]);

  const [recentlyReviewed] = useState([
    {
      id: 4,
      studentName: "Sarah Wilson",
      studentId: "M251004CS",
      title: "Art Exhibition",
      category: "Cultural",
      points: 15,
      status: "approved",
      reviewedDate: "2024-01-19",
      comments: "Excellent creativity and presentation"
    },
    {
      id: 5,
      studentName: "Tom Brown",
      studentId: "M251005CS",
      title: "Debate Competition",
      category: "Academic",
      points: 10,
      status: "rejected",
      reviewedDate: "2024-01-18",
      comments: "Need more substantial proof of participation"
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState(pendingRequests[0]);
  const [reviewComment, setReviewComment] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Sample student data for bulk actions
  const [allStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      studentId: "M251001CS",
      email: "john.doe@email.com",
      activities: 5,
      totalPoints: 125,
      pendingActivities: 2
    },
    {
      id: 2,
      name: "Jane Smith", 
      studentId: "M251002CS",
      email: "jane.smith@email.com",
      activities: 3,
      totalPoints: 80,
      pendingActivities: 1
    },
    {
      id: 3,
      name: "Mike Johnson",
      studentId: "M251003CS", 
      email: "mike.johnson@email.com",
      activities: 7,
      totalPoints: 190,
      pendingActivities: 1
    },
    {
      id: 4,
      name: "Sarah Wilson",
      studentId: "M251004CS",
      email: "sarah.wilson@email.com", 
      activities: 4,
      totalPoints: 95,
      pendingActivities: 0
    },
    {
      id: 5,
      name: "Tom Brown",
      studentId: "M251005CS",
      email: "tom.brown@email.com",
      activities: 6,
      totalPoints: 155,
      pendingActivities: 3
    }
  ]);

  const totalStudents = 45;
  const pendingCount = pendingRequests.length;
  const reviewedThisWeek = 12;

  const handleApprove = (requestId) => {
    console.log("Approved request:", requestId, "Comment:", reviewComment);
    setReviewComment("");
  };

  const handleReject = (requestId) => {
    console.log("Rejected request:", requestId, "Comment:", reviewComment);
    setReviewComment("");
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(allStudents.map(s => s.id));
    }
    setSelectAll(!selectAll);
  };

  const handleStudentSelect = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const handleBulkApprove = () => {
    console.log("Bulk approving students:", selectedStudents);
    setSelectedStudents([]);
    setSelectAll(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={{ name: user.name, role: "faculty", email: user.email }} 
        onLogout={onLogout} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Faculty Dashboard
          </h1>
          <p className="text-muted-foreground">
            Review and approve student activity submissions
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Assigned Students"
            value={totalStudents}
            subtitle="Under your guidance"
            icon={<Users className="h-5 w-5" />}
            variant="default"
          />
          <StatCard
            title="Pending Reviews"
            value={pendingCount}
            subtitle="Awaiting your approval"
            icon={<Clock className="h-5 w-5" />}
            variant="warning"
          />
          <StatCard
            title="Reviewed This Week"
            value={reviewedThisWeek}
            subtitle="Keep up the pace!"
            icon={<CheckCircle className="h-5 w-5" />}
            variant="success"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending Reviews ({pendingCount})</TabsTrigger>
            <TabsTrigger value="history">Review History</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Request List */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Requests</CardTitle>
                  <CardDescription>Click on a request to review details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingRequests.map((request) => (
                      <div 
                        key={request.id} 
                        className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                          selectedRequest?.id === request.id ? 'border-primary bg-primary-lighter/20' : 'border-border'
                        }`}
                        onClick={() => setSelectedRequest(request)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-foreground">{request.title}</h4>
                            <p className="text-sm text-muted-foreground">{request.studentName} • {request.studentId}</p>
                          </div>
                          <Badge variant="outline" className="border-warning text-warning text-xs">
                            {request.points} pts
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">{request.category}</span>
                          <span className="text-xs text-muted-foreground">{request.submittedDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Request Details */}
              {selectedRequest && (
                <Card>
                  <CardHeader>
                    <CardTitle>Review Request</CardTitle>
                    <CardDescription>
                      {selectedRequest.studentName} • {selectedRequest.studentId}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{selectedRequest.title}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                        <span>Category: {selectedRequest.category}</span>
                        <span>Points: {selectedRequest.points}</span>
                      </div>
                      <p className="text-sm">{selectedRequest.description}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Proof Documents</h4>
                      <div className="space-y-2">
                        {selectedRequest.proofDocuments.map((doc, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 border rounded">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm flex-1">{doc}</span>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Review Comments</h4>
                      <Textarea
                        placeholder="Add your comments for the student..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant="success" 
                        className="flex-1"
                        onClick={() => handleApprove(selectedRequest.id)}
                      >
                        <Check className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="flex-1"
                        onClick={() => handleReject(selectedRequest.id)}
                      >
                        <X className="h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Review History</CardTitle>
                    <CardDescription>Recently reviewed activities</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search reviews..." className="pl-10 w-64" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentlyReviewed.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{review.title}</h3>
                          <p className="text-sm text-muted-foreground">{review.studentName} • {review.studentId}</p>
                        </div>
                        <Badge 
                          variant={review.status === "approved" ? "default" : "destructive"}
                          className={review.status === "approved" ? "bg-success text-success-foreground" : ""}
                        >
                          {review.status === "approved" ? "Approved" : "Rejected"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                        <span>{review.category} • {review.points} points</span>
                        <span>Reviewed: {review.reviewedDate}</span>
                      </div>
                      
                      <div className="mt-3 p-3 bg-muted rounded-md">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <p className="text-sm">{review.comments}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulk">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Bulk Actions</CardTitle>
                    <CardDescription>Select and approve multiple students</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleSelectAll}
                      disabled={allStudents.length === 0}
                    >
                      {selectAll ? "Deselect All" : "Select All"}
                    </Button>
                    <Button 
                      variant="success" 
                      onClick={handleBulkApprove}
                      disabled={selectedStudents.length === 0}
                    >
                      <Check className="h-4 w-4" />
                      Approve Selected ({selectedStudents.length})
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allStudents.map((student) => (
                    <div key={student.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={() => handleStudentSelect(student.id)}
                        />
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <h4 className="font-semibold text-foreground">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">{student.studentId}</p>
                            <p className="text-xs text-muted-foreground">{student.email}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold text-foreground">{student.activities}</p>
                            <p className="text-xs text-muted-foreground">Total Activities</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold text-success">{student.totalPoints}</p>
                            <p className="text-xs text-muted-foreground">Total Points</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold text-warning">{student.pendingActivities}</p>
                            <p className="text-xs text-muted-foreground">Pending Activities</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
