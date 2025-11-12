import { Outlet } from 'react-router-dom';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col" dir="inherit">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
