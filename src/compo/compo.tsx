import { useEffect, useRef } from "react";
import { FaAlignJustify } from "react-icons/fa";
import { MdClose } from "react-icons/md";

type Props = {
  children: React.ReactNode;
  title?: string;
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function Compo({
  children,
  title,
  className,
  isOpen,
  setIsOpen,
}: Props) {
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
      <div
        className={`${className} flex items-center justify-between bg-slate-800 text-white`}
      >
        <div onClick={() => setIsOpen(true)} className="cursor-pointer p-4">
          <FaAlignJustify size={32} />
        </div>
        <h1 className="pl-8 font-bold">{title}</h1>
      </div>

      <header
        ref={headerRef}
        className={` ${className} w-72 bg-slate-800 h-screen z-50 fixed right-0 top-0 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          onClick={() => setIsOpen(false)}
          className="cursor-pointer absolute top-4 left-4"
        >
          <MdClose size={32} color="white" />
        </div>
        <ul className="mt-16 p-4 space-y-4">{children}</ul>
      </header>
    </>
  );
}
