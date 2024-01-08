import { Icons } from "@/components/icons";
import { MainNavConfig } from "@/types";

export const navConfig: MainNavConfig = {
    mainNav: [
        {
            title: "Raves",
            icon: Icons.party,
            link: "/raves",
          },
          {
            title: "New Rave",
            icon: Icons.add,
            link: "/raves/new-rave",
          },
    ]
}