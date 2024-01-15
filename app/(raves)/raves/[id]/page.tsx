import { Metadata } from "next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { cookies } from "next/headers";
import { isValidJSONString } from "@/lib/utils";
import SingleRaveResizableContainer from "@/components/single-rave-resizable-container";
import { getRave } from "@/lib/raves";
import SingleRave from "@/components/single-rave";

export const metadata: Metadata = {
  title: "Single rave",
};

export default async function SingleRavePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();
  const rave = await getRave(params.id);

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

  if (rave === null) {
    // Handle the case where data is null, such as showing an error message
    return (
      <div className="flex justify-center items-center mt-16">
        Rave not found
      </div>
    );
  }

  return (
    <div>
      <div className="hidden md:flex">
        <SingleRaveResizableContainer
          user={{
            id: user.id,
            name: user.name || null,
            image: user.image || null,
            email: user.email || null,
          }}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
          rave={rave}
        />
      </div>
      <div className="h-screen mx-2 my-2 md:hidden">
        <SingleRave rave={rave} />
      </div>
    </div>
  );
}
