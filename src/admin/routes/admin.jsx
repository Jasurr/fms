import EmployeePage from "../pages/EmployeePage/EmployeePage";
import RegionPage from "../pages/RegionPage/RegionPage";
import BoxPage from "../pages/BoxPage/BoxPage";
import TariffPage from "../pages/TariffPage/TariffPage";
import InvoicePage from "../pages/InvoicePage/InvoicePage";
import PackagePage from "../pages/PackagePage/PackagePage";
import MethodPage from "../pages/MethodPage/MethodPage";
import ServicePage from "../pages/ServicePage/ServicePage";
import FeedbackPage from "../pages/FeedbackPage/FeedbackPage";
import AdditionPage from "../pages/AdditionPage/AdditionPage";
import MessagePage from "../pages/MessagePage/MessagePage";


const adminDashboardRoutes = [
    {
        path: '/admin/user',
        name: 'Пользователи',
        icon: "icon_home.png",
        component: EmployeePage,
    },
    {
        path: '/admin/region',
        name: 'Регион',
        icon: "icon_home.png",
        component: RegionPage,
    },
    {
        path: '/admin/box',
        name: 'Коробка',
        icon: "icon_home.png",
        component: BoxPage,
    },
    {
        path: '/admin/tariff',
        name: 'Тариф',
        icon: "icon_home.png",
        component: TariffPage,
    },
    // {
    //     path: '/admin/invoice',
    //     name: 'Накладная',
    //     icon: "icon_home.png",
    //     component: InvoicePage,
    // },
    {
        path: '/admin/package',
        name: 'Упаковка',
        icon: "icon_home.png",
        component: PackagePage,
    },
    // {
    //     path: '/admin/method',
    //     name: 'Метод',
    //     icon: "icon_home.png",
    //     component: MethodPage,
    // },
    // {
    //     path: '/admin/delivery',
    //     name: 'Доставка',
    //     icon: "icon_home.png",
    //     component: ServicePage,
    // },
    // {
    //     path: '/admin/feedback',
    //     name: 'Отзывы',
    //     icon: "icon_home.png",
    //     component: FeedbackPage,
    // },
    {
        path: '/admin/addition',
        name: 'Addition',
        icon: "icon_home.png",
        component: AdditionPage,
    },{
        path: '/admin/message',
        name: 'Сообщение',
        icon: "icon_home.png",
        component: MessagePage,
    }
    // {redirect: true, path: '/', to: '/main', name: 'Накладные'}
];

export default adminDashboardRoutes;
