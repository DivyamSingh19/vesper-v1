import  LawyerSidebar  from "@/components/ui-elements/sidebar/lawyerSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
 
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
       
      <div className="flex min-h-screen">
        
        <LawyerSidebar/>

        {/* Content Area */}
        <div className="flex-1">
          <SidebarInset>
            <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              {/* Add breadcrumb or other header content here */}
            </header>

            <main className="p-4">
              {children}
            </main>
          </SidebarInset>
        </div>
      </div>
      
    </SidebarProvider>
  );
}
