import Header from "@/components/ui/header";
import Hero from "./hero-auth";

export const Auth = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <Header isSidebarVisible={false} />
      <Hero />
    </div>
  );
};
