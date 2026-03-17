import GrowerHeader from "./components/layout/GrowerHeader";
import GrowerLayout from "./components/layout/GrowerLayout";
import GrowerSidebar from "./components/layout/GrowerSidebar";


export default function HomePage() {
  return (
    <main>
      <GrowerHeader/>
      <GrowerLayout/>
      <GrowerSidebar/>
    </main>
  );
}