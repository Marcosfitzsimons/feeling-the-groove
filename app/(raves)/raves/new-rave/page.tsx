import NewRaveContainer from "@/components/new-rave-container";
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
  console.log(user);
  return (
    <div>
      <div className="hidden md:flex">
        <NewRaveContainer
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
    </div>
  );
};

export default NewRavePage;
