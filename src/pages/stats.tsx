import { useAccessToken } from "@/providers/access-token-provider";
import { useGetMetricsQuery } from "@/services/stats-service";

export default function Stats() {
  const { accessToken } = useAccessToken();
  const { data } = useGetMetricsQuery(accessToken.access_token);

  const StatItem = ({
    label,
    value,
  }: { label: string; value: number | undefined }) => (
    <div className="w-1/2">
      <p className="font-bold text-xs text-text-hight">{label}</p>
      <span className="font-medium text-xxs text-text-medium">{value}</span>
    </div>
  );

  const ImageGrid = ({
    title,
    images,
  }: { title: string; images: string[] | undefined }) => (
    <div className="space-y-4">
      <p className="font-bold text-xs text-text-hight">{title}</p>
      <div className="flex flex-row gap-5">
        {images?.map((src) => (
          <div key={src} className="relative w-16 h-16">
            <img
              src={src}
              alt={title}
              width={64}
              height={64}
              className="border border-helper-outline rounded-sm object-cover w-full h-full"
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
        <StatItem label="Horas assistidas" value={data?.hoursWatched} />
        <StatItem label="Mensagens" value={data?.messages} />
      </div>
      <hr className="border-helper-outline w-full my-4" />
      <ImageGrid title="Canais mais assistidos" images={data?.topChannels} />
      <div className="my-4">
        <ImageGrid
          title="Categorias mais assistidas"
          images={data?.topCategories}
        />
      </div>
    </div>
  );
}
