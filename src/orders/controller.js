import mongoose from 'mongoose';
import Order from './model.js';

exports.getAllOrders = (req, res) => {
    Order.find()
    .then(orders => {
        res.json(orders)
    }) 
    .catch(err => {
        res
        .status(500)
    })
}

exports.createOrder = (req, res) => {
    const newOrder = new Order(req.body);
    newOrder.save()
    .then(order => {
        res.json(order)
    }) 
    .catch(err => {
        res
        .status(500)
    })
}