import { Fragment } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useLocation } from 'umi';
import logged from './logged/index';
import nolog from './nolog/index';
import { nologRoutes } from '@/const/router';

const layout = props => {
  const { pathname } = useLocation();
  const Container = nologRoutes.includes(pathname) ? nolog : logged;
  return (
    <Fragment>
      <Container>{props.children}</Container>
    </Fragment>
  );
};

export default layout;
