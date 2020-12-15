import { Fragment } from 'react';
import {
  Layout,
  Menu,
  Breadcrumb
} from 'antd';
import logged from './logged/index';
import nolog from './nolog/index';
import { nologRoutes } from '@/const/router';


const layout = (props) => {
  const currentURL = props.location.pathname;
  const Container =  nologRoutes.includes(currentURL) ? nolog : logged;
  return ( 
    <Fragment>
      <Container>
        { props.children }
      </Container>
    </Fragment>
  )
}

export default layout;