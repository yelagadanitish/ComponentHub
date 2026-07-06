import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

function MainLayout({ children }) {

  return (

    <div className="bg-slate-50 min-h-screen">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="md:ml-72">

        <Navbar />

        <main
          className="
          p-6
          md:p-8
          overflow-x-hidden
          "
        >

          {children}

        </main>

      </div>

    </div>

  );

}

export default MainLayout;