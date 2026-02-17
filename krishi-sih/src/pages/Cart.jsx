import React from "react";
import { useUpdateCartQuantityMutation, useRemoveFromCartMutation, useClearCartMutation, useGetCartQuery } from "../store/api/CartApi";
import { animated, useSpring } from "@react-spring/web";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  // Fetch cart from backend
  const { data, isLoading } = useGetCartQuery();

  const cart = data?.items || [];
  const subtotal = data?.subtotal || 0;
  const platformFee = data?.platformFee || 20;
  const finalAmount = data?.finalAmount || 0;

  const [updateQty] = useUpdateCartQuantityMutation();
  const [removeItem] = useRemoveFromCartMutation();
  const [clearCart] = useClearCartMutation();
  const navigate = useNavigate();

  // Animated total
  const totalSpring = useSpring({
    val: finalAmount,
    config: { tension: 170, friction: 26 },
  });

  // Loading state
  if (isLoading) return <p className="text-center">Loading cart...</p>;

  const handleQuantityChange = (itemId, action) => {
    updateQty({ itemId, action });
  };

  const SERVICE_IMAGE_URL = {
    crop: "http://localhost:8000/images/",
    fruit: "http://localhost:8002/images/",
    vegetable: "http://localhost:8001/images/",
    rental: "http://localhost:8095/images/",
    tool: "http://localhost:8004/images/",
  };

  const resolveImage = (item) => {
    if (!item || !item.image) return "/default.png";

    const serviceKey = String(item.service).toLowerCase().trim();
    const baseUrl = SERVICE_IMAGE_URL[serviceKey];

    if (!baseUrl) {
      console.warn("Unknown service:", serviceKey, SERVICE_IMAGE_URL);
      return "/default.png";
    }

    return baseUrl + item.image;
  };




  console.log(data);

  cart.forEach(i => console.log(i.service, resolveImage(i)));


  return (
    <div className="bg-[#F9F3E0] min-h-screen flex justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT: Cart Items */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold mb-4">Shopping Bag</h1>

          {cart.length === 0 ? (
            <p className="text-gray-600 text-center text-lg mt-10">
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.itemId}
                className="border p-4 rounded-lg bg-white flex gap-4 relative"
              >
                {/* Image */}
                <img
                  src={resolveImage(item) ? resolveImage(item) : `${item.name}`}
                  alt={item.name}
                  className="w-28 h-36 object-cover rounded-md"
                />

                {/* Product Info */}
                <div className="flex-1">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Category : {item.category}
                  </p>

                  {/* Qty */}
                  <div className="flex gap-6 mt-2 text-sm items-center">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.itemId, "dec")}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>

                      <span className="w-10 text-center">{item.quantity}</span>

                      <button
                        onClick={() => handleQuantityChange(item.itemId, "inc")}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-3">
                    <span className="font-semibold text-lg">₹{item.price}</span>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.itemId)}
                  className="absolute top-2 right-2"
                >
                  <X className="text-gray-500 hover:text-red-500" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT: Price Summary */}
        {cart.length > 0 && (
          <div className="space-y-4 mt-12">

            {/* Price Details */}
            <div className="border p-4 rounded-lg bg-white">
              <p className="font-semibold mb-3">
                Price Details ({cart.length} items)
              </p>

              <div className="flex justify-between text-sm mb-2">
                <p>Total Price</p>
                <p>₹{subtotal.toFixed(2)}</p>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <p>Platform Fee</p>
                <p>₹{platformFee}</p>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between font-bold text-lg">
                <p>Final Amount</p>
                <animated.p>
                  {totalSpring.val.to((v) => `₹${v.toFixed(2)}`)}
                </animated.p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => clearCart()}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors w-1/2"
              >
                Clear Cart
              </button>

              <button onClick={() => navigate("/checkout")} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors w-1/2">
                Checkout
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
