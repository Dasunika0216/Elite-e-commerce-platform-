import userModel from "../models/userModel.js";

// Add products to user's cart
const addToCart = async (req, res) => {
    try {
        const {userId, itemId, size} = req.body;           // userId, itemId and size are sent in the request body to add the item to the user's cart

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if (cartData[itemId]){                    // If the item is already present in the cart 
            if (cartData[itemId][size]){             // If the given size of the item is already present in the cart 
                cartData[itemId][size] += 1;         // Increase the quantity of the item by 1
            }
            else{
                cartData[itemId][size] = 1;           // Add the item of the given size to the cart
            }
        }
        else{
            cartData[itemId] = {};                // If the item is not present in the cart, add the item to the cart
            cartData[itemId][size] = 1;           
        }

        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success:true, message:"Item added to cart!"});
    } 
    catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
};

// Update user's cart
const updateCart = async (req, res) => {
    try {
        const {userId, itemId, size, quantity} = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success:true, message:"Updated successfully!"});
    } 
    catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
};

// Get user's cart data
const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body;   // userId is sent in the request body to get the cart data of the user

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        res.json({success:true, cartData});
    } 
    catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
};

export { addToCart, updateCart, getUserCart };