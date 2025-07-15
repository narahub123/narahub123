export const Navbar = () => {
  const tabs = [
    {
      title: "Home",
      path: "",
    },
    {
      title: "About",
      path: "",
    },
    {
      title: "Contact",
      path: "",
    },
  ];

  return (
    <div className="flex justify-between w-full p-4 mt-4 bg-black">
      <div className="font-bold text-white">MySite</div>
      <div className="flex gap-2 text-blue-400">
        {tabs.map((tab) => (
          <button
            onClick={() => {
              alert(`${tab.title}`);
            }}
            className="hover:text-blue-200"
          >
            {tab.title}
          </button>
        ))}
      </div>
    </div>
  );
};
