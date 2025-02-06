import userModel from "../models/userModel";

// Add products to user's cart
const addToCart = async (req, res) => {
    try {
        const {userId, itemId, size} = req.body;

        const userdata = await userModel.findById(userId);
        let cartData = await userdata.cartData;

        if (cartData[itemId]){
            if (cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
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
    
};

// Get user's cart data
const getUserCart = async (req, res) => {
    
};

export { addToCart, updateCart, getUserCart };