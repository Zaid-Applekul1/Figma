'use client';

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const DropdownSection = ({ title, icon: Icon, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mt-2">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 rounded-lg"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={18} />}
          <span>{title}</span>
        </div>
        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && <div className="ml-6 mt-1 space-y-1">{children}</div>}
    </div>
  );
};
export default DropdownSection;