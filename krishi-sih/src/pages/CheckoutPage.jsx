import React from "react";
import { useGetCartQuery } from "../store/api/CartApi";
import { useCreateCheckoutSessionMutation } from "../store/api/PaymentApi";

export default function CheckoutPage() {
    const { data, isLoading } = useGetCartQuery();
    const [createSession] = useCreateCheckoutSessionMutation();

    if (isLoading) return <p>Loading...</p>;
    if (!data?.items?.length) return <p>Your cart is empty</p>;

    const { items, subtotal, platformFee, finalAmount } = data;

    const handlePayment = async () => {
        try {
            // Convert cart items → stripe format
            const paymentBody = {
                mode: "cart",
                items: items.map((i) => ({
                    title: i.name,
                    price: i.price,
                    quantity: i.quantity,
                })),
                rideData: null
            };

            const res = await createSession(paymentBody).unwrap();

            // Stripe hosted checkout
            window.location.href = res.url;

        } catch (err) {
            console.error("Payment error:", err);
            alert("Payment failed");
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            {/* ORDER SUMMARY */}
            <div className="bg-white shadow rounded p-4 mb-6">
                <h2 className="text-xl font-bold mb-3">Order Summary</h2>

                {items.map((item) => (
                    <div
                        key={item.itemId}
                        className="flex items-center justify-between border-b py-3"
                    >
                        {/* IMAGE */}
                        <img
                            src={item.image || "https://via.placeholder.com/80"}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded"
                        />

                        {/* NAME + QTY */}
                        <div className="flex-1 ml-4">
                            <p className="font-bold">{item.name}</p>
                            <p className="text-gray-600 text-sm">
                                Qty: {item.quantity}
                            </p>
                        </div>

                        {/* PRICE */}
                        <p className="font-bold text-lg">₹{item.itemTotal}</p>
                    </div>
                ))}

                {/* TOTAL SUMMARY */}
                <div className="mt-4 border-t pt-4">
                    <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Subtotal:</span>
                        <span>₹{subtotal}</span>
                    </div>

                    <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Platform Fee:</span>
                        <span>₹{platformFee}</span>
                    </div>

                    <div className="flex justify-between font-bold text-xl mt-2">
                        <span>Total Amount:</span>
                        <span>₹{finalAmount}</span>
                    </div>
                </div>
            </div>

            {/* PAYMENT BUTTON */}
            <button
                onClick={handlePayment}
                className="w-full bg-green-600 text-white py-4 rounded-lg text-xl hover:bg-green-700 transition"
            >
                Pay ₹{finalAmount}
            </button>
        </div>
    );
}
