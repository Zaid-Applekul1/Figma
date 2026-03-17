

const MenuItem = ({ icon: Icon, label, active = false }) => (
  <div
    className={`flex items-center gap-3 px-4 py-2 text-sm rounded-lg cursor-pointer transition ${
      active ? "bg-green-50 text-green-600 font-medium" : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    <Icon size={18} />
    <span>{label}</span>
  </div>
);

export default MenuItem;