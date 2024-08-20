import { useStorage } from "@plasmohq/storage/dist/hook";
import { useEffect, useMemo, useState } from "react";
import { getMetrics } from "~services/user/user-consumer-service";
import type { AccessTokenResponse, MetricsResponse } from "~types/types";

const Stats = () => {
  const [authorization] = useStorage<AccessTokenResponse>("accessToken");

  const [stats, setStats] = useState<MetricsResponse>();

  useEffect(() => {
    getMetrics(authorization?.access_token)
      .then((res) => {
        setStats(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [authorization]);

  const statsData = useMemo(() => {
    if (!stats) {
      return {
        hoursWatched: 0,
        messages: 0,
        topChannels: ["https://http.cat/404"],
        topCategories: ["https://http.cat/404"],
      };
    }
    return {
      hoursWatched:
        stats.main_metrics.minutes_watched > 0
          ? Math.round(stats.main_metrics.minutes_watched / 60)
          : 0,
      messages: 0,
      topChannels: stats.user_metrics_by_channel.slice(0, 4).map((channel) => {
        return `https://twitch-cdn.danielheart.dev/u/${channel.channel_id}.png`;
      }),
      topCategories: stats.user_metrics_by_category
        .slice(0, 4)
        .map((channel) => {
          return `https://twitch-cdn.danielheart.dev/c/${channel.category_id}.png`;
        }),
    };
  }, [stats]);

  const StatItem = ({ label, value }) => (
    <div className="w-1/2">
      <p className="font-bold text-xs text-text-hight">{label}</p>
      <span className="font-medium text-xxs text-text-medium">{value}</span>
    </div>
  );

  const ImageGrid = ({ title, images }) => (
    <div className="space-y-4">
      <p className="font-bold text-xs text-text-hight">{title}</p>
      <div className="flex flex-row gap-5">
        {images.map((src) => (
          <div key={src} className="relative">
            <img
              src={src}
              alt={title}
              width={64}
              height={64}
              className="border border-helper-outline rounded-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(9,9,10,0.64)] rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col mt-8">
      <div className="flex items-center w-full">
        <StatItem label="Horas assistidas" value={statsData.hoursWatched} />
        <StatItem label="Mensagens" value={statsData.messages} />
      </div>
      <hr className="text-helper-outline w-full my-4" />
      <ImageGrid
        title="Canais mais assistidos"
        images={statsData.topChannels}
      />
      <div className="my-4">
        <ImageGrid
          title="Categorias mais assistidas"
          images={statsData.topCategories}
        />
      </div>
    </div>
  );
};

export default Stats;
