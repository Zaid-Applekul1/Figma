import React from "react";

const Section = ({ title, children }) => (
  <div className="mt-4">
    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
      {title}
    </p>
    <div className="space-y-1">{children}</div>
  </div>
);

export default Section;
