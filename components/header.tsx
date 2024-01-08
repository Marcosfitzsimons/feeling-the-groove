import Logo from "./logo";
import { MobileNavigation } from "./mobile-navigation";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between py-2 md:justify-center">
      <div className="w-9 md:hidden"></div>
      <Logo />
      <MobileNavigation />
    </header>
  );
};

export default Header;
