import { authOptions } from "@/lib/auth";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { isValidJSONString } from "@/lib/utils";
import RavesResizableContainer from "@/components/raves/raves-resizable-container";
import { RavesDatatable } from "@/components/raves/raves-datatable";
import { columns } from "@/components/raves/columns";
import { getAllRaves } from "@/lib/raves";

export default async function RavePage() {
  const user = await getCurrentUser();
  const raves = await getAllRaves();

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
        <RavesResizableContainer
          user={{
            name: user.name || null,
            image: user.image || null,
            email: user.email || null,
          }}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
          raves={raves}
        />
      </div>
      <div className="h-screen md:hidden">
        <RavesDatatable data={raves} columns={columns} />
      </div>
    </div>
  );
}
