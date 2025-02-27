import { THeaderData } from "@/types";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = ({ data }:{ data: THeaderData[]}) => {
  return (
    <header className="flex border-b py-3 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[65px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center gap-4 max-w-screen-xl mx-auto w-full">
        
              <a href="javascript:void(0)" className="max-sm:hidden">
                <img src="/logo_zurich.png" alt="logo" className="w-32" />
              </a>
              <a href="javascript:void(0)" className="hidden max-sm:block">
                <img src="/z_logo.jpg" alt="logo" className="w-24" />
              </a>


        <div className="max-lg:hidden lg:!block max-lg:w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
          <ul className="lg:flex lg:ml-14 lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            {data
              .filter((df) => df.id > 2)
              .map((dt) => (
                <li key={dt.id} className="max-lg:border-b max-lg:py-3 px-3">
                  <a
                    href="javascript:void(0)"
                    className="lg:hover:text-[#007bff] text-[#007bff] block text-[15px]"
                  >
                    {dt.name}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <div className="flex gap-4 ml-auto">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn >
            <UserButton  />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
