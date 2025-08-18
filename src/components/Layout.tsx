
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
          <header className="sticky top-0 z-40 h-14 flex items-center border-b border-ai-gray-200 px-4 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <SidebarTrigger className="mr-4" />
            <h1 className="font-semibold text-ai-gray-900 text-lg md:text-xl">Assessment Creation Platform</h1>
          </header>
          <main className="flex-1 p-4 md:p-6 bg-ai-gray-50 min-h-[calc(100vh-3.5rem)]">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
