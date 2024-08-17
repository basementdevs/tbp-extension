import { LogOut } from "lucide-react";
import type UserStorageService from "~services/user/user-storage-service";
import type { User } from "~types/types";

type ProfileRibbonType = {
  user: User;
};

function ProfileRibbon({ user }: ProfileRibbonType) {
  const onStorageClear = async () => {
    const { Storage } = await import("@plasmohq/storage");
    const storage = new Storage();
    await storage.clear();
  };

  console.log(user);

  return (
    <div className="flex items-center justify-between px-6">
      <div className="flex items-center gap-x-2">
        <img
          src={user.accounts[0].avatar}
          alt="avatar"
          width={32}
          className="rounded-pill"
        />
        <div className="flex flex-col">
          <span className="text-text-high text-xs font-bold">{user.name}</span>
          <span className="text-text-medium font-medium text-xxs">
            {user.settings.pronouns.name}
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
