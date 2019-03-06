import Merchant from '../../api/Merchant/sagas'
import User from '../../api/User/sagas'
import Admin from '../../api/Admin/sagas';

export default function sagas (api) {
    return [
        Merchant(api),
        User(api),
        Admin(api)
    ]
}
