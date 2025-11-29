import React from "react";

const images = [
  "/images/img1.png",
  "/images/img2.png",
  "/images/img3.png",
  "/images/img4.png",
  "/images/img5.png",
  "/images/img6.png",
];

const InfiniteScroll = () => {
  return (
    <div className="overflow-hidden w-full bg-white">
      {/* Custom CSS for animation */}
      <style>
        {`
          @keyframes scrollRightToLeft {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }

          .scroll-animation {
            animation: scrollRightToLeft 5s linear infinite;
          }
        `}
      </style>

      <div className="flex whitespace-nowrap scroll-animation">
        {[...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`img-${index}`}
            className="h-14 w-auto mx-4 inline-block"
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;