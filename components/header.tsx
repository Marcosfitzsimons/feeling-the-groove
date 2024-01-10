import Logo from "./logo";
import { MobileNavigation } from "./mobile-navigation";
import { getCurrentUser } from "@/lib/session";

const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header
      className={`w-full flex items-center ${
        !user ? "justify-center" : "justify-between"
      } py-2 md:justify-center`}
    >
      {user && <div className="w-9 md:hidden"></div>}
      <Logo />
      {user && <MobileNavigation user={user} />}
    </header>
  );
};

export default Header;
