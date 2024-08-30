function AnnounceBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-2 rounded-sm border border-[#9747FF52] bg-[#9747FF0A] w-full text-center font-medium">
      {children}
    </div>
  );
}

export default AnnounceBadge;
