import { FileText, Users, MessageSquare, TrendingUp } from "lucide-react";
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
  },
  {
    title: "Lawyers",
    value: "24",
    description: "Nearby available",
    icon: Users,
    color: "text-purple-400",
  },
  {
    title: "Chat Queries",
    value: "0",
    description: "Questions asked",
    icon: MessageSquare,
    color: "text-green-400",
  },
  {
    title: "Success Rate",
    value: "100%",
    description: "Query resolution",
    icon: TrendingUp,
    color: "text-yellow-400",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="card-glow bg-gradient-glow border-border">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to LawAssist Portal</CardTitle>
          <CardDescription className="text-base">
            Your AI-powered legal companion for guidance, document analysis, and lawyer connections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => navigate("/chatbot")}
            className="bg-gradient-primary shadow-glow hover:shadow-[0_0_40px_hsl(var(--primary-glow)/0.5)]"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Ask the LegalBot
          </Button>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="card-glow bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="card-glow bg-card border-border">
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>
              Analyze legal documents with AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary/10"
              onClick={() => navigate("/documents")}
            >
              Go to Documents
            </Button>
          </CardContent>
        </Card>

        <Card className="card-glow bg-card border-border">
          <CardHeader>
            <CardTitle>Find Lawyers</CardTitle>
            <CardDescription>
              Connect with legal professionals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full border-accent text-accent hover:bg-accent/10"
              onClick={() => navigate("/lawyers")}
            >
              Browse Lawyers
            </Button>
          </CardContent>
        </Card>

        <Card className="card-glow bg-card border-border">
          <CardHeader>
            <CardTitle>Recent Queries</CardTitle>
            <CardDescription>
              View your chat history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full border-muted-foreground hover:bg-muted"
              onClick={() => navigate("/chatbot")}
            >
              View History
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Legal Updates */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="card-glow bg-card border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions on the portal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: "Uploaded document", file: "Contract_Agreement.pdf", time: "2 hours ago" },
                { action: "Consulted with", file: "Adv. Priya Sharma", time: "1 day ago" },
                { action: "Chat query about", file: "Section 498A IPC", time: "2 days ago" },
                { action: "Downloaded document", file: "Legal_Notice.docx", time: "3 days ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="text-muted-foreground">{activity.action}</span>
                      <span className="font-medium ml-1">{activity.file}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-glow bg-card border-border">
          <CardHeader>
            <CardTitle>Legal Updates</CardTitle>
            <CardDescription>Recent changes in law</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "New Amendment to IPC Section 377", date: "Dec 15, 2024" },
                { title: "Consumer Protection Act Updates", date: "Dec 10, 2024" },
                { title: "Changes in Property Tax Laws", date: "Dec 5, 2024" },
                { title: "New Data Privacy Regulations", date: "Nov 28, 2024" },
              ].map((update, i) => (
                <div key={i} className="p-3 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                  <p className="text-sm font-medium">{update.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{update.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
