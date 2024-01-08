import { authOptions } from "@/lib/auth";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { isValidJSONString } from "@/lib/utils";
import RavesContainer from "@/components/raves-container";

export default async function RavePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout =
    layout && isValidJSONString(layout.value)
      ? JSON.parse(layout.value)
      : undefined;
  const defaultCollapsed =
    collapsed && isValidJSONString(collapsed.value)
      ? JSON.parse(collapsed.value)
      : undefined;

  return (
    <div className="">
      <div className="hidden md:flex">
        <RavesContainer
          user={{
            name: user.name || null,
            image: user.image || null,
            email: user.email || null,
          }}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </div>
  );
}
