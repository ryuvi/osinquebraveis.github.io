function slugify(text: string): string {
  return text
    .normalize("NFD") // separa acentos das letras
    .replace(/[\u0300-\u036f]/g, "") // remove os acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove caracteres especiais
    .replace(/\s+/g, "-") // troca espaços por hífens
    .replace(/-+/g, "-"); // remove hífens duplicados
}

export function ImageDisplay({ title }: { title: string }) {
  const src = `/blog-imgs/${slugify(title)}.jpg`;

  return (
    <div className="flex flex-col items-center my-6">
      <div style={{ height: "fit-content", width: "fit-content" }}>
        <img
          src={src}
          alt={title}
          style={{
            width: "500px",
            marginTop: "0 !important",
            marginBottom: "0 !important",
          }}
          className="object-coverrounded"
        />
      </div>
      <p className="text-center mt-2 text-sm text-gray-500 italic">{title}</p>
    </div>
  );
}