import Header from "@Components/app/header";
import AuthenticateButton from "@Components/auth/authenticate-button";
import Hero from "@Components/auth/hero";

export const Auth = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <Header />
      <Hero />
    </div>
  );
};
