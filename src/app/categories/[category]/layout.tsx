export default function CategoryLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="">
      <aside className="bg-gray-300">Filters aside</aside>
      <div>{children}</div>
    </div>
  );
}
