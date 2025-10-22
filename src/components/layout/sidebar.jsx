import { Home, FileText, Users, MessageSquare, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Lawyers", href: "/lawyers", icon: Users },
  { name: "Chatbot", href: "/chatbot", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-gray-200 bg-white shadow-lg z-10">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-gray-200 bg-white">
          <h1 className="text-xl font-bold bg-black text-transparent bg-clip-text">
            Legal AI assistant
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-[#242424] text-white shadow"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-400 group-hover:text-blue-500")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Guest User</p>
              <p className="text-xs text-gray-400">Public Access</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
