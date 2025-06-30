import { HeartIcon } from "@heroicons/react/24/solid";


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-center gap-2">
        <small className="text-sm">
          &copy; 2025 — <strong>Os Inquebráveis</strong> | IFSP Caraguatatuba
        </small>
        <small className="text-sm flex">
          Feito com <HeartIcon className="mx-1" style={{width: 16, color: 'red'}} /> por estudantes de Engenharia Civil
        </small>
      </div>
    </footer>
  );
}
