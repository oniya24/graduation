import { Fragment } from 'react';
import {
  Layout,
  Menu,
  Breadcrumb
} from 'antd';
import logged from './logged/index';
import nolog from './nolog/index';


const layout = (props) => {
  const currentURL = props.location.pathname;
  const Container =  ["/login", "/register"].includes(currentURL) ? nolog : logged;
  return ( 
    <Fragment>
      <Container>
        { props.children }
      </Container>
    </Fragment>
  )
}

export default layout;