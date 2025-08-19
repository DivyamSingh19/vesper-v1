import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AuthLayout from "@/components/functions/layout/AuthLayout";
import { UserSidebar } from "@/components/ui-elements/sidebar/userSidebar";
import DashboardLayout from "@/components/functions/layout/DashboardLayout";
export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      <SidebarProvider>
        <AuthLayout>
          <div className="flex min-h-screen">
            <UserSidebar />

            <div className="flex-1">
              <SidebarInset>
                <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                </header>
                <main className="p-4">{children}</main>
              </SidebarInset>
            </div>
          </div>
        </AuthLayout>
      </SidebarProvider>
    </DashboardLayout>
  );
}
