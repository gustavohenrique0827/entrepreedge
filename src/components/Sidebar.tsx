
import * as React from "react"
import { SidebarProvider, Sidebar as SidebarComponent, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar"

export const Sidebar = (props) => (
  <SidebarProvider>
    <SidebarComponent {...props}>
      {/* Default sidebar layout */}
      <SidebarHeader>
        {/* Add header content */}
      </SidebarHeader>
      
      <SidebarContent>
        {/* Add main content */}
      </SidebarContent>
      
      <SidebarFooter>
        {/* Add footer content */}
      </SidebarFooter>
    </SidebarComponent>
  </SidebarProvider>
)

// Also export as default for compatibility
export default Sidebar
