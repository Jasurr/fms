import Invoice from '../views/Pages/OrderProduct/index';
import DeliveringProduct from '../views/Pages/DeliveringOrder/index';
import ArrivedProduct from '../views/Pages/ArrivedProduct/index';
import FinishedProduct from '../views/Pages/FinishedProduct/index';
import EditInvoice from "../views/Pages/EditInvoice";

const dashboardRoutes = [
    {
        path: '/main',
        name: 'Главная',
        icon: "icon_home.png",
        component: Invoice,
    },
    {
        path: '/store',
        name: 'Накладные',
        icon: "icon_dashboard.png",
        component: DeliveringProduct,
    },
    {
        path: '/inbox',
        name: 'Почта',
        icon: "icon_inbox.png",
        component: ArrivedProduct,
    },
    {
        path: '/notification',
        name: 'Уведомления',
        icon: "icon_products.png",
        component: FinishedProduct,
    },
    {
        path: '/edit',
        name: 'Edit',
        icon: "icon_products.png",
        component: EditInvoice,
    },
    {redirect: true, path: '/', to: '/main', name: 'Накладные'},

];

export default dashboardRoutes;
