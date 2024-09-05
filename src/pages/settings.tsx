import ColorCustomizer from "@/components/color-customize";
import EffectCustomize from "@/components/effect-customize";
import SettingsForm from "@/components/settings-form";
import ChatAppearance from "@/components/ui/chat-appearance";
import Tabs from "@/components/ui/tabs";
import type UserStorageService from "@/services/user/user-storage-service";
import type { User } from "@/types/types";

type SettingsProps = {
  userService: UserStorageService;
  channelName?: string;
};

const Settings: React.FC<SettingsProps> = ({ userService, channelName }) => {
  const renderChannelSettings = (isLiveProfile: boolean) => {
    return (
      <>
        <SettingsForm liveProfile={isLiveProfile} channelName={channelName} />

        <div className="flex flex-col gap-y-3 mb-5">
          <p className="text-text-high text-xs font-bold">
            Adicione Efeitos ao seu Nickname
          </p>
          <EffectCustomize
            liveProfile={isLiveProfile}
            channelName={channelName}
          />
        </div>

        <div className="flex flex-col gap-y-3 mb-5">
          <p className="text-text-high text-xs font-bold">
            Customize suas cores
          </p>
          <ColorCustomizer
            liveProfile={isLiveProfile}
            channelName={channelName}
          />
        </div>
        <ChatAppearance
          userService={userService}
          liveProfile={isLiveProfile}
          channelName={channelName}
        />
      </>
    );
  };

  const tabItems = [
    {
      name: "Perfil Global",
      value: "global-profile",
      disabled: false,
      content: renderChannelSettings(false),
    },
    {
      name: "Perfil da Live",
      value: "channel-profile",
      disabled: !channelName,
      content: renderChannelSettings(true),
    },
  ];

  return <Tabs tabItems={tabItems} />;
};

export default Settings;
