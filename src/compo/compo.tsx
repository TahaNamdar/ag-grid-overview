import { useState, useEffect, useRef } from "react";
import { FaAlignJustify } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export default function Compo() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const headerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      headerRef.current &&
      !headerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className="flex items-center justify-between bg-slate-800 text-white">
        <div onClick={() => setIsOpen(true)} className="cursor-pointer p-4">
          <FaAlignJustify size={32} />
        </div>
        <h1 className="pl-8 font-bold">شرکت چوگان</h1>
      </div>

      <header
        ref={headerRef}
        className={`w-72 bg-slate-800 h-screen z-50 fixed right-0 top-0 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          onClick={() => setIsOpen(false)}
          className="cursor-pointer absolute top-4 left-4"
        >
          <MdClose size={32} color="white" />
        </div>
        <ul className="mt-16 p-4 space-y-4">
          <li className="p-2 text-white rounded shadow">Item</li>
          <li className="p-2 text-white rounded shadow">Item</li>
          <li className="p-2 text-white rounded shadow">Item</li>
          <li className="p-2 text-white rounded shadow">Item</li>
          <li className="p-2 text-white rounded shadow">Item</li>
        </ul>
      </header>
    </>
  );
}
