import AuthenticateButton from "@Components/auth/authenticate-button";
import Hero from "@Components/auth/hero";
import Header from "~resources/components/app/header";

export const Auth = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <Header isSidebarVisible={false} />
      <Hero />
    </div>
  );
};
