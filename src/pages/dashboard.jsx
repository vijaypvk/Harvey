import { FileText, Users, MessageSquare, TrendingUp, UserCircle, File, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    title: "Documents",
    value: "0",
    description: "Total uploaded",
    icon: FileText,
    color: "text-blue-400",
    bg: "bg-blue-50",
  },
  {
    title: "Lawyers",
    value: "24",
    description: "Nearby available",
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-50",
  },
  {
    title: "Chat Queries",
    value: "0",
    description: "Questions asked",
    icon: MessageSquare,
    color: "text-green-400",
    bg: "bg-green-50",
  },
  {
    title: "Success Rate",
    value: "100%",
    description: "Query resolution",
    icon: TrendingUp,
    color: "text-yellow-400",
    bg: "bg-yellow-50",
  },
];

const activities = [
  { action: "Uploaded document", file: "Contract_Agreement.pdf", time: "2 hours ago", icon: File },
  { action: "Consulted with", file: "Adv. Priya Sharma", time: "1 day ago", icon: UserCircle },
  { action: "Chat query about", file: "Section 498A IPC", time: "2 days ago", icon: MessageSquare },
  { action: "Downloaded document", file: "Legal_Notice.docx", time: "3 days ago", icon: File },
];

const updates = [
  { title: "New Amendment to IPC Section 377", date: "Dec 15, 2024" },
  { title: "Consumer Protection Act Updates", date: "Dec 10, 2024" },
  { title: "Changes in Property Tax Laws", date: "Dec 5, 2024" },
  { title: "New Data Privacy Regulations", date: "Nov 28, 2024" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <Card className="card-glow bg-gradient-to-r from-blue-100 via-white to-purple-100 border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Welcome to LawAssist Portal</CardTitle>
          <CardDescription className="text-lg">
            Your AI-powered legal companion for guidance, document analysis, and lawyer connections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => navigate("/chatbot")}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:scale-105 transition-transform"
            size="lg"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Ask the LegalBot
          </Button>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card 
            key={stat.title} 
            className={`card-glow border-0 shadow-md hover:shadow-xl transition-shadow duration-200 ${stat.bg} hover:scale-105`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold text-muted-foreground">
                {stat.title}
              </CardTitle>
              <span className={`rounded-full p-2 bg-white shadow ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-glow border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>
              Analyze legal documents with AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary/10 font-semibold"
              onClick={() => navigate("/documents")}
              size="lg"
            >
              Go to Documents
            </Button>
          </CardContent>
        </Card>

        <Card className="card-glow border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Find Lawyers</CardTitle>
            <CardDescription>
              Connect with legal professionals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full border-accent text-accent hover:bg-accent/10 font-semibold"
              onClick={() => navigate("/lawyers")}
              size="lg"
            >
              Browse Lawyers
            </Button>
          </CardContent>
        </Card>

        <Card className="card-glow border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Recent Queries</CardTitle>
            <CardDescription>
              View your chat history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full border-muted-foreground hover:bg-muted font-semibold"
              onClick={() => navigate("/chatbot")}
              size="lg"
            >
              View History
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Legal Updates */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-glow border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions on the portal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <span className="rounded-full bg-primary/10 p-2">
                    <activity.icon className="h-5 w-5 text-primary" />
                  </span>
                  <div className="flex-1">
                    <p className="text-base">
                      <span className="text-muted-foreground">{activity.action}</span>
                      <span className="font-semibold ml-1">{activity.file}</span>
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-glow border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Legal Updates</CardTitle>
            <CardDescription>Recent changes in law</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {updates.map((update, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                  <span className="rounded-full bg-yellow-100 p-2">
                    <TrendingUp className="h-5 w-5 text-yellow-500" />
                  </span>
                  <div>
                    <p className="text-base font-semibold">{update.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{update.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
