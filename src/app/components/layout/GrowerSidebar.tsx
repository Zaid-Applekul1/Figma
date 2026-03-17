"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// Recursive Menu Item Type with active path propagation
const SidebarItem = ({ item, level = 0, activePath = [], onSelect, parentPath = [] }) => {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;

  // Build the path for this item
  const itemPath = [...parentPath, item.label];
  const isActive = activePath.length === itemPath.length && activePath.every((v, i) => v === itemPath[i]);
  const isParentActive = activePath.length > itemPath.length && activePath.slice(0, itemPath.length).every((v, i) => v === itemPath[i]);

  // Open if parent or self is active
  React.useEffect(() => {
    if (hasChildren && (isActive || isParentActive)) setOpen(true);
  }, [isActive, isParentActive, hasChildren]);

  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
    } else {
      onSelect(itemPath);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer rounded-lg transition
          ${isActive ? "bg-[#ECFDF5] text-green-600" : isParentActive ? "text-green-600" : "text-gray-700 hover:bg-gray-100"}
        `}
        style={{ paddingLeft: `${16 + level * 12}px` }}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={18} />}
          <span>{item.label}</span>
        </div>
        {hasChildren && (
          <ChevronDown
            size={16}
            className={`transition ${open ? "rotate-180" : ""}`}
          />
        )}
      </div>
      {hasChildren && open && (
        <div className="space-y-1">
          {item.children.map((child, idx) => (
            <SidebarItem
              key={idx}
              item={child}
              level={level + 1}
              activePath={activePath}
              onSelect={onSelect}
              parentPath={itemPath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const GrowerSidebar = () => {
  const [activePath, setActivePath] = useState(["Dashboard", "Overview"]);
  const menu = [
    {
      label: "Dashboard",
      children: [
        { label: "Overview" },
        { label: "Analytics" },
        { label: "Insights" },
        { label: "Reports" },
      ],
    },
    {
      label: "GONGUL",
      children: [
        {
          label: "Orchard",
          children: [
            { label: "Create Orchard" },
            { label: "Orchard Map" },
            { label: "Blocks" },
          ],
        },
        { label: "Scouting" },
        { label: "Calendar" },
        { label: "Weather" },
      ],
    },
    {
      label: "Team",
      children: [
        {
          label: "Directory",
          children: [
            { label: "Members" },
            { label: "Roles" },
          ],
        },
      ],
    },
    {
      label: "Operations",
      children: [
        { label: "Tasks" },
        { label: "Pruning" },
        { label: "Gudai" },
        { label: "Spraying" },
      ],
    },
  ];

  const handleSelect = (path) => {
    setActivePath(path);
  };

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-4 border-b">
          <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <p className="font-semibold text-sm">Applekul One</p>
            <p className="text-xs text-gray-400">Agritech Platform</p>
          </div>
        </div>

        {/* Recursive Menu */}
        <div className="mt-2 space-y-1">
          {menu.map((item, idx) => (
            <SidebarItem
              key={idx}
              item={item}
              activePath={activePath}
              onSelect={handleSelect}
              parentPath={[]}
            />
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="p-4 border-t">
        <div className="text-sm text-gray-700">Settings</div>
      </div>
    </div>
  );
};

export default GrowerSidebar;