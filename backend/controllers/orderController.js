// Placing orders using cash on delivery method
const placeOrder = async (req, res) => {

}

// Placing orders using Stripe method
const placeOrderStripe = async (req, res) => {
    
}

// Placing orders using Razorpay method
const placeOrderRazorpay = async (req, res) => {
   
}

// All orders data for Admin panel
const allOrders = async (req, res) => {
   
}

// User order data for frontend
const userOrders = async (req, res) => {
   
}

// Update order staus from Admin panel. Only admin can change the order status manually.
const updateStatus = async (req, res) => {
   
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };