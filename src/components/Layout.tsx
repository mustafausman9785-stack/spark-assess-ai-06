
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="h-14 flex items-center border-b border-ai-gray-200 px-4 bg-white">
            <SidebarTrigger className="mr-4" />
            <h1 className="font-semibold text-ai-gray-900">Assessment Creation Platform</h1>
          </header>
          <main className="flex-1 p-6 bg-ai-gray-50">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
