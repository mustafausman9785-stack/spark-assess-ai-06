
import { 
  LayoutDashboard, 
  FolderOpen, 
  BarChart3, 
  ClipboardList, 
  Settings, 
  HelpCircle,
  Bot
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';

const navigationItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Categories', url: '/categories', icon: FolderOpen },
  { title: 'Reports', url: '/reports', icon: BarChart3 },
  { title: 'Exam Tracker', url: '/exam-tracker', icon: ClipboardList },
  { title: 'AI Assistant', url: '/ai-assistant', icon: Bot },
  { title: 'Support & Settings', url: '/support-settings', icon: HelpCircle },
];

export const AppSidebar = () => {
  const { state } = useSidebar();
  
  return (
    <Sidebar className="border-r border-ai-gray-200">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-ai-blue rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          {state !== 'collapsed' && (
            <div>
              <h2 className="font-semibold text-ai-gray-900">Assessment Pro</h2>
              <p className="text-xs text-ai-gray-500">AI-Powered Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center space-x-3 p-2 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-ai-blue-light text-ai-blue font-medium' 
                            : 'text-ai-gray-700 hover:bg-ai-gray-50'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
