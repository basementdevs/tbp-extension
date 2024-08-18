const Stats = () => {
  const statsData = {
    hoursWatched: 254,
    messages: 420,
    topChannels: [
      "https://static-cdn.jtvnw.net/jtv_user_pictures/f5c84939-a415-4654-b5da-60ff968280e6-profile_image-150x150.png",
      "https://static-cdn.jtvnw.net/jtv_user_pictures/f5c84939-a415-4654-b5da-60ff968280e6-profile_image-150x150.png",
      "https://static-cdn.jtvnw.net/jtv_user_pictures/f5c84939-a415-4654-b5da-60ff968280e6-profile_image-150x150.png",
      "https://static-cdn.jtvnw.net/jtv_user_pictures/f5c84939-a415-4654-b5da-60ff968280e6-profile_image-150x150.png",
    ],
    topCategories: [
      "https://static-cdn.jtvnw.net/jtv_user_pictures/f5c84939-a415-4654-b5da-60ff968280e6-profile_image-150x150.png",
      "https://static-cdn.jtvnw.net/jtv_user_pictures/f5c84939-a415-4654-b5da-60ff968280e6-profile_image-150x150.png",
      "https://static-cdn.jtvnw.net/jtv_user_pictures/f5c84939-a415-4654-b5da-60ff968280e6-profile_image-150x150.png",
      "https://static-cdn.jtvnw.net/jtv_user_pictures/f5c84939-a415-4654-b5da-60ff968280e6-profile_image-150x150.png",
    ],
  };

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
