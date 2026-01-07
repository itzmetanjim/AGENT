import { getUserSession } from "@/utils/supabase/getUserSession";
import { redirect } from "next/navigation";
import { MainSidebar } from '@/components/sidebar/main-sidebar';
import { ChatInterface } from '@/components/chat/chat-interface';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TopBar } from '@/components/topbar/top-bar';
import ProtectedRoute from "@/components/ProtectedRoute";

export default async function Home() {
  const session = await getUserSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="flex flex-col h-[100dvh] w-screen overflow-hidden bg-background text-foreground">
          <TopBar />
          <div className="flex flex-1 overflow-hidden">
            <MainSidebar />
            <ChatInterface user={session.user} />
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
