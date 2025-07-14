import * as D from "../data";

const Tailwindcss = () => {
  return (
    <div className="bg-black/70">
      <p className="w-full p-4 text-3xl text-white">Tailwindcss</p>
      <p className="italic text-gray-50 line-clamp-3">{D.randomParagraphs()}</p>
      <button className="btn btn-primary" style={{ textTransform: "none" }}>
        Button
      </button>
    </div>
  );
};

export default Tailwindcss;
