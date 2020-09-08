import {getAllOrders,createOrder} from './orders/controller.js';
import { getReports } from './reports/controller.js'

export default (app) => {
    app.route('/api/v1/orders')
        .get(getAllOrders)
        .post(createOrder);

    app.route('/api/v1/reports/:invoiceNumber')
        .get(getReports)    
}