import { Storage } from "@plasmohq/storage";
import { LogOut } from "lucide-react";
import type { User } from "~types/types";

type ProfileRibbonType = {
  user: User;
};

function ProfileRibbon({ user }: ProfileRibbonType) {
  const onStorageClear = async () => {
    const storage = new Storage();
    await storage.clear();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <img
          src={user?.accounts[0]?.avatar}
          alt="avatar"
          width={32}
          className="rounded-pill"
        />
        <div className="flex flex-col">
          <span className="text-text-high text-xs font-bold">{user.name}</span>
          <span className="text-text-medium font-medium text-xxs">
            {user.settings.occupation.name}
          </span>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="focus:outline-none"
          onClick={onStorageClear}
        >
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );
}

export default ProfileRibbon;
