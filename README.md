# Secondhand Marketplace Web Application

## 🚀 Frontend Development

## Overview
The Secondhand Marketplace application is a user-friendly e-commerce platform with secure authentication, intuitive product management, and a seamless shopping experience. The application is designed to be responsive and visually appealing while maintaining strong security practices.

## 🛠️ Technologies Used
- **Frontend:** TypeScript, Next.js, Tailwind CSS.
- **Authentication:** JWT
- **Routing:** Next.js routing
- **Form:** React Hook Form
- **UI Components:** Shadcn UI

## Features
### User Authentication & Authorization
- **User Registration & Login:**
  - Register with name, email, and password.
  - User role: `user` & `admin`.
  - Secure password hashing before storage.
  - Login using email and password.
- **JWT Authentication:**
  - JWT tokens for session management.
  - Tokens stored in cookies storage.
- **Logout:**
  - Clears authentication token on logout.

### Public Pages
#### Home Page
- **Navigation Bar:**
  - Logo, menu links, login buttons.
- **Hero Section:**
  - Highlight key features and special offers.
  - product image carousel.
- **Featured Products:**
  - Showcase up to 6 top products.
  - "View All" button navigates to the product listing.
- **Additional Sections:**
  - Company Overview, Testimonials, Image Gallery & Office Location.
- **Footer:**
  - Essential links, social media, and contact information.

#### Products Page
- **Search & Filter Options:**
  - Search by title, category.
  - Filter by price range, category.
- **Dynamic Product Display:**
  - Search and filter results update in real-time.
- **Product Cards:**
  - Show product name, price, image, and "View Details" button.

#### Product Details
- **Detailed View:**
  - High-quality image and comprehensive product details.

#### About Page
- Information about the shop and its mission - What We Offer - Why Choose Us - FAQ.**

### Private Pages
#### Cart & Checkout
- **Cart Management:**
  - Users can add and remove products.
  - Quantity cannot exceed available stock.
- **Order Summary:**
  - Shows total price, user details, and product list.
- **Order Confirmation:**
  - "Order Now" button for purchase confirmation.
- **Payment Integration:**
  - Stripe payment gateways.

#### User Dashboard
- **Order Tracking:**
  - View order history and statuses.
- **Payment History:**
  - View payment history and payment statuses.
- **Add Review:**
  - Add client review feedback option.
- **Profile Edit:**
  - Update personal details and default shipping address and image upload.

#### Admin Dashboard
- **Dashboard:**
  - Admin access dashboard company full overview info.
- **User Management:**
  - Ability to status user accounts `In-progress` & `Blocked`.
- **Product Management:**
  - Add, edit, and delete products.
- **Order Management:**
  - Approve and update order statuses from "Pending" to "Shipping".
- **Profile Edit:**
  - Update personal details and default shipping address and image upload.  

### UI/UX Enhancements
- **Fully Responsive:**
  - Works on all devices and screen sizes.
- **Error Handling:**
  - Friendly messages for login errors, duplicate emails, and stock issues.
- **Loading Indicators:**
  - Spinners/loaders during API requests.
- **Toasts & Alerts:**
  - Notifications for key actions like login, logout, and purchases.

## Installation
### Prerequisites
- Node.js & npm installed

## Deployment
- Deployable on Vercel platforms.

## 👨‍💻 Contributors
- **[MD. AZIM UDDIN]**

## License
This project is licensed under the MIT License.
