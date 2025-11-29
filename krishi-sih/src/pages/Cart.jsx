import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart, updateQuantity } from "../store/cartSlice";
import { animated, useSpring } from "@react-spring/web";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Cart() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const [animatedTotal, setAnimatedTotal] = useState(0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.qty, 0);

  const totalSpring = useSpring({
    val: totalPrice,
    from: { val: animatedTotal },
    config: { tension: 170, friction: 26 },
  });

  useEffect(() => {
    setAnimatedTotal(totalPrice);
  }, [totalPrice]);

  const handleQuantityChange = (id, qty) => {
    if (qty < 1) return;
    dispatch(updateQuantity({ id, qty }));
  };

  return (
    <div className="bg-[#F9F3E0] min-h-screen flex justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT: Cart Items */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold mb-4">{t("shoppingBag")}</h1>

          {cart.length === 0 ? (
            <p className="text-gray-600 text-center text-lg mt-10">
              {t("cartEmpty")}
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded-lg bg-white flex gap-4 relative"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-36 object-cover rounded-md"
                />

                {/* Product Info */}
                <div className="flex-1">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {t("category")} : {item.subCategory || t("na")}
                  </p>

                  {/* Size & Qty */}
                  <div className="flex gap-6 mt-2 text-sm items-center">
                    <p>
                      {t("size")}:{" "}
                      <span className="font-medium">M</span>
                    </p>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.qty - 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>

                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          if (!isNaN(value) && value > 0) {
                            handleQuantityChange(item.id, value);
                          }
                        }}
                        className="w-14 text-center border rounded py-1"
                      />

                      <button
                        onClick={() => handleQuantityChange(item.id, item.qty + 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-3">
                    <span className="font-semibold text-lg">₹{item.price}</span>

                    {item.mrp && (
                      <>
                        <span className="line-through text-gray-400 ml-2">
                          ₹{item.mrp}
                        </span>
                        <span className="text-pink-500 ml-2 text-sm">
                          {Math.round(((item.mrp - item.price) / item.mrp) * 100)}%
                          {t("off")}
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    {t("returnPolicy")}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="absolute top-2 right-2"
                >
                  <X className="text-gray-500 hover:text-red-500" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT: Price Details */}
        {cart.length > 0 && (
          <div className="space-y-4 mt-12">

            {/* Coupons */}
            <div className="border p-4 rounded-lg bg-white">
              <p className="font-semibold mb-2">{t("coupons")}</p>

              <div className="flex justify-between items-center">
                <input
                  type="text"
                  placeholder={t("applyCoupons")}
                  className="border rounded-md px-3 py-2 w-full mr-3"
                />

                <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600">
                  {t("apply")}
                </button>
              </div>
            </div>

            {/* Price Details */}
            <div className="border p-4 rounded-lg bg-white">
              <p className="font-semibold mb-3">
                {t("priceDetails")} ({cart.length} {t("items")})
              </p>

              <div className="flex justify-between text-sm mb-2">
                <p>{t("totalMRP")}</p>
                <p>
                  ₹
                  {cart
                    .reduce((acc, item) => acc + (item.mrp || item.price), 0)
                    .toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between text-sm mb-2 text-green-600">
                <p>{t("discountOnMRP")}</p>
                <p>
                  -₹
                  {cart
                    .reduce(
                      (acc, item) =>
                        acc + ((item.mrp || item.price) - item.price),
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <p>{t("platformFee")}</p>
                <p>₹20</p>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between font-bold text-lg">
                <p>{t("totalAmount")}</p>
                <animated.p>
                  {totalSpring.val.to((v) => `₹${(v + 20).toFixed(2)}`)}
                </animated.p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors w-1/2"
              >
                {t("clearCart")}
              </button>

              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors w-1/2">
                {t("checkout")}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
