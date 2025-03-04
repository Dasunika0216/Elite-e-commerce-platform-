import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// Placing orders using cash on delivery method
const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        } 

        const newOrder = new orderModel(orderData);
        await newOrder.save();          // New order is saved in the database

        await userModel.findByIdAndUpdate(userId, {cartData: {} });  // Cart data is cleared after placing the order

        res.json({success: true, message: "Order placed successfully!"});
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Placing orders using Stripe method
const placeOrderStripe = async (req, res) => {
    
}

// Placing orders using Razorpay method
const placeOrderRazorpay = async (req, res) => {
   
}

// All orders data for Admin panel
const allOrders = async (req, res) => {
   try {
    const orders = await orderModel.find({});
    res.json({success: true, orders});
   } 
   catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
   }
}

// User order data for frontend
const userOrders = async (req, res) => {
   try {
    const {userId} = req.body;
    const orders = await orderModel.find({userId});
    res.json({success: true, orders});
   } 
   catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
   }
}

// Update order staus from Admin panel. Only admin can change the order status manually.
const updateStatus = async (req, res) => {
   try {
    const {orderId, status} = req.body;
    await orderModel.findByIdAndUpdate(orderId, {status});
    res.json({success: true, message: "Order status updated successfully!"});
   } 
   catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
   }
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };