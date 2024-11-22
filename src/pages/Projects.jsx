const entries = [
  {
    id: 1,
    label: "Anime",
    image: "/images/animep.png",
  },
  {
    id: 2,
    label: "MPI",
    image: "/images/mpip.png",
  },
  {
    id: 3,
    label: "Zawwar",
    image: "/images/zawwarp.png",
  },
  {
    id: 4,
    label: "Star Launch",
    image: "/images/starlaunchp.png",
  },
  {
    id: 5,
    label: "Vantrail",
    image: "/images/vantrailp.png",
  },
];

const Home = () => {
  return (
    <div className="container mx-auto py-16 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Portfolio Entries</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="w-[150px] h-[250px] flex flex-col items-center justify-between border rounded-lg shadow-md p-4"
          >
            <img
              src={entry.image}
              alt={entry.label}
              className="w-[300px] h-[250px] object-contain rounded-md "
            />
            <h2 className="text-lg font-semibold mt-4">{entry.label}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
