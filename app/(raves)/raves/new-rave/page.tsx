import NewRaveForm from "@/components/new-rave-form";
import NewRaveResizableContainer from "@/components/new-rave-resizable-container";
import { authOptions } from "@/lib/auth";
import { getNearestPastRave } from "@/lib/raves";
import { getCurrentUser } from "@/lib/session";
import { isValidJSONString } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "New Rave",
  description: "Create a new rave",
};

const NewRavePage = async () => {
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

  const nearestPastDate = await getNearestPastRave();

  return (
    <div>
      <div className="hidden md:flex">
        <NewRaveResizableContainer
          user={{
            id: user.id,
            name: user.name || null,
            image: user.image || null,
            email: user.email || null,
          }}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
          nearestPastDate={nearestPastDate}
        />
      </div>
      <div className="h-screen mx-2 mt-4 md:hidden">
        <h2 className="text-center text-3xl font-semibold mb-4">
          Create New Rave
        </h2>
        <NewRaveForm nearestPastDate={nearestPastDate} user={{ id: user.id }} />
      </div>
    </div>
  );
};

export default NewRavePage;
