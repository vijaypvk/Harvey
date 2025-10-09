import { useNavigate } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { MessageSquare } from "lucide-react";
import { Button } from "../ui/button";

export const MainLayout = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <Header />
            
            <main className="ml-64 pt-16 min-h-screen">
                <div className="p-6">
                    {children}
                </div>
            </main>

            {/* Floating Chatbot Button */}
            <Button
                onClick={() => navigate("/chatbot")}
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-primary shadow-glow hover:shadow-[0_0_40px_hsl(var(--primary-glow)/0.5)] transition-all"
                size="icon"
            >
                <MessageSquare className="h-6 w-6" />
            </Button>
        </div>
    );
};
