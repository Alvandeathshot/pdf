import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// project import
import Loader from 'components/Loader';
import { LoginLayoutType } from 'config';

const Header = lazy(() => import('./Header'));
const FooterBlock = lazy(() => import('./FooterBlock'));

// ==============================|| LAYOUT - Login / LANDING ||============================== //

export default function LoginLayout({ layout = LoginLayoutType.SIMPLE }) {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <Outlet />
      <FooterBlock isFull={layout === LoginLayoutType.LANDING} />
    </Suspense>
  );
}

LoginLayout.propTypes = { layout: PropTypes.any };
