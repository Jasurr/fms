import {combineReducers} from "redux";
import test from "./test";
import table from "views/TableList/reducer";
import orderProduct from 'views/Pages/reducer';
import parcel from "views/Parcel/reducer";
import extra_payment from 'views/Pages/OrderProduct/Common/ExtraPayment/reducer'
import {reducer as formReducer} from "redux-form";
import auth from '../../views/Auth/reducer'
import invoice_reducer from '../../views/Pages/DeliveringOrder/reducer'
import searchText from '../../components/Header/reducers'
import EmployeeReducer from '../../admin/common/reducers/EmployeeReducer';
import RegionReducer from "../../admin/common/reducers/RegionReducer";
import BoxReducer from "../../admin/common/reducers/BoxReducer";
import PackageReducer from "../../admin/common/reducers/PackageReducer";
import InvoiceReducer from "../../admin/common/reducers/InvoiceReducer";
import TariffReducer from "../../admin/common/reducers/TariffReducer";
import MethodReducer from "../../admin/common/reducers/MethodReducer";
import ServiceReducer from "../../admin/common/reducers/ServiceReducer";
import FeedbackReducer from "../../admin/common/reducers/FeedbackReducer";
import AdditionReducer from "../../admin/common/reducers/AdditionReducer";
import MessageReducer from "../../admin/common/reducers/MessageReducer";


export default combineReducers({
    form: formReducer,
    test,
    table,
    orderProduct,
    parcel,
    extra_payment,
    auth,
    searchText,
    invoice_reducer,
    employee: EmployeeReducer,
    region: RegionReducer,
    box: BoxReducer,
    package: PackageReducer,
    invoice: InvoiceReducer,
    tariff: TariffReducer,
    method: MethodReducer,
    service: ServiceReducer,
    feedback: FeedbackReducer,
    addition: AdditionReducer,
    message: MessageReducer
});
