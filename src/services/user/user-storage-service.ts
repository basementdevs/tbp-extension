import type { User, UserSettings } from "@/types/types";
import { Storage } from "@plasmohq/storage";

export default class UserStorageService {
  user: User;
  storageAccessor: Storage;

  constructor(user: User) {
    this.user = user;
    this.storageAccessor = new Storage();
  }

  getSettings(): UserSettings {
    return this.user.settings;
  }

  async updateSettings(settings: UserSettings): Promise<void> {
    this.user.settings = settings;
    await this.storageAccessor.set("user", this.user);
  }
}
