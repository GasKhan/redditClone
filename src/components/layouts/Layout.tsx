import { ReactPropTypes } from 'react';
import Navbar from '../navbar/Navbar';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default Layout;
