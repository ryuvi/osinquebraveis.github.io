import Image from "next/image";

type Sponsor = {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
};

type SponsorsGridProps = {
  backgroundColor: string;
  id: string;
};

const SponsorCard = ({ sponsor }: { sponsor: Sponsor | null }) => {
  if (!sponsor) return <SponsorTemplate />;
  return (
    <a
      href={sponsor.websiteUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center p-4 bg-white rounded-xl shadow hover:shadow-md transition"
    >
      <Image
        src={sponsor.logoUrl}
        alt={`Logo ${sponsor.name}`}
        width={512}
        height={512}
        className="max-h-12 object-contain grayscale hover:grayscale-0 transition duration-300"
      />
    </a>
  );
};

const SponsorTemplate = () => (
  <div className="bg-orange-200 p-1 rounded-lg">
    <div className=" w-full h-28 md:h-32 rounded-lg border-3 border-dashed border-orange-400/50  flex items-center justify-center" >
      <span className="text-black text-shadow-md text-shadow-white text-bold text-center transform rotate-[-45deg]">Anúncie<br/>Aqui</span>
    </div>
  </div>
);

const sponsors: (Sponsor | null)[] = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

export default function SponsorsGrid({
  id,
  backgroundColor,
}: SponsorsGridProps) {
  return (
    <section
      id={id}
      className={`min-h-screen flex flex-col items-center justify-start px-6 py-12 gap-8 ${backgroundColor}`}
    >
      <h2
        className="text-3xl md:text-4xl font-bold text-center mb-6 text-orange-600"
        data-aos="fade-down"
      >
        Patrocinadores
      </h2>

      <div
        className="grid grid-cols-3 gap-6 w-full md:w-3/5 max-w-7xl"
        data-aos="fade-up"
      >
        {sponsors.map((sponsor, index) => {
          const isFullWidth = index === 0 || index === 1;
          const delay = index * 100
          return (
            <div
              key={sponsor?.name || index}
              className={isFullWidth ? "col-span-full" : ""}
              data-aos="zoom-in"
              data-aos-delay={delay}
            >
              <SponsorCard sponsor={sponsor} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
