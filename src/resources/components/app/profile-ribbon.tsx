import { LogOut } from "lucide-react";

function ProfileRibbon() {
  const onStorageClear = async () => {
    const { Storage } = await import("@plasmohq/storage");
    const storage = new Storage();
    await storage.clear();
  };

  return (
    <div className="flex items-center justify-between px-6">
      <div className="flex items-center gap-x-2">
        <img
          src="https://i.imgur.com/faSBdW9.jpg"
          alt="avatar"
          width={32}
          className="rounded-pill"
        />
        <div className="flex flex-col">
          <span className="text-text-high text-xs font-bold">Moov</span>
          <span className="text-text-medium font-medium text-xxs">
            Front-end Engineer
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
