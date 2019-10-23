// 路由页面配置
import Loadable from 'react-loadable'; // 实现按需加载
import DelayLoading from '@/components/common/delayLoading'

const loadComponent = (loader) => Loadable({
  loader,
  loading: DelayLoading,
  delay: 3000
})

const Layout = loadComponent(() => import('@/pages/layout' /* webpackChunkName: "Layout" */ ));
const LayoutSimple = loadComponent(() => import('@/pages/layout/simple' /* webpackChunkName: "LayoutSimple" */ ));
const Home = loadComponent(() => import('@/pages/home' /* webpackChunkName: "Home" */ ));

/*嵌套路由*/
let routes = [{
  path: "/",
  component: Home,
  exact: true
}];


export default [{
  path: "/",
  component: process.env.NODE_ENV === 'development' ? Layout : LayoutSimple,
  routes
}]