import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';  

//Globlal variables
const currency = 'USD';  //Currency for the payment
const deliveryCharge = 10;  //Delivery charge for the order

//Getway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
    try {
        const {userId, items, amount, address} = req.body;
        const {origin} = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        } 

        const newOrder = new orderModel(orderData);
        await newOrder.save();          // New order is saved in the database

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,  //Delivery charge is fixed
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({success: true, session_url: session.url});
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//Verify stripe payment
const veriftStripe = async (req, res) => {
    const {orderId, success, userId} = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true}); // Payment is verified.
            await userModel.findByIdAndUpdate(userId, {cartData: {} }); // Cart data is cleared after placing the payment.

            res.json({success: true});
        }
        else{
            await orderModel.findByIdAndDelete(orderId); // Order is deleted if payment is not successful.
            res.json({success: false});
        }
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
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