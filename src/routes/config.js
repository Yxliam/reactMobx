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
/*广告位管理 */
const AdvertisingSpaceAdd = loadComponent(() => import('@/pages/adSpace/add' /* webpackChunkName: "AdSpace" */ ));
const AdvertisingSpaceEdit = loadComponent(() => import('@/pages/adSpace/edit' /* webpackChunkName: "AdSpace" */ ));
const AdvertisingSpaceList = loadComponent(() => import('@/pages/adSpace/list' /* webpackChunkName: "AdSpace" */ ));


/*嵌套路由*/
let routes = [{
  path: "/",
  component: Home,
  exact: true
},{
  path: "/adSpace/list",
  component: AdvertisingSpaceList,
  exact: true
},{
  path: "/adSpace/add",
  component: AdvertisingSpaceAdd,
  exact: true
},{
  path: "/adSpace/edit/:id",
  component: AdvertisingSpaceEdit,
  exact: true
}];


export default [{
  path: "/",
  component: process.env.NODE_ENV === 'development' ? Layout : LayoutSimple,
  routes
}]