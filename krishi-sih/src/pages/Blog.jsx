import React from 'react';
import './Blog.css';

const BlogCard = ({ title, description, image, imageAlt }) => {
  return (
    <div className="blog-card">
      <img 
        src={image} 
        alt={imageAlt}
        className="blog-image"
      />
      <div className="blog-content">
        <div className="blog-title-container">
          <h3 className="blog-title">{title}</h3>
        </div>
        <div className="blog-description-container">
          <p className="blog-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Lorem Ipsum",
      description: "Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained. Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained. Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained. Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained. Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/d14f6c41b8425ff8d534c2be70e9ba42d5920521?width=327",
      imageAlt: "Blog post image"
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      description: "Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained. Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained. Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained. Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained. Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/d14f6c41b8425ff8d534c2be70e9ba42d5920521?width=327",
      imageAlt: "Blog post image"
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      description: "Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained. Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained. Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained. Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained. Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/d14f6c41b8425ff8d534c2be70e9ba42d5920521?width=327",
      imageAlt: "Blog post image"
    },
    {
      id: 4,
      title: "Lorem Ipsum",
      description: "Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained. Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained. Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained. Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained. Figma Responsive Design | Auto Layout Figma 2024 | #autolayout #responsivedesign In this video, I have explained",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/d14f6c41b8425ff8d534c2be70e9ba42d5920521?width=327",
      imageAlt: "Blog post image"
    }
  ];

  return (
    <div className="blog-container">
      {blogPosts.map((post) => (
        <BlogCard
          key={post.id}
          title={post.title}
          description={post.description}
          image={post.image}
          imageAlt={post.imageAlt}
        />
      ))}
    </div>
  );
}
