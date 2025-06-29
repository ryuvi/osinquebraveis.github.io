import Image from 'next/image'

export default function HeroSection( {id, backgroundColor}: {id: string, backgroundColor: string} ) {
  return (
    <section
      id={id}
      className={`min-h-screen flex flex-col items-center justify-center my-auto px-4 text-center ${backgroundColor}`}
      data-aos="fade-up"
    >
      <Image
        src="/logo.png"
        alt="Logo do time Os Inquebráveis"
        width={512}
        height={512}
        className="w-auto max-w-xs md:max-w-sm drop-shadow-md"
        priority
      />

      <h2 className="text-5xl md:text-4xl font-bold leading-snug">
        Rumo ao <span className="text-sky-500">COCAR 2025</span>
      </h2>
    </section>
  )
}
