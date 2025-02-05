# 📦 Parcel Management System (Proyojon)

An advanced **MERN stack-based Parcel Management System** designed to streamline the process of **booking and delivering parcels**. This system is built with **scalable React components** for a smooth and efficient user experience.

## 🌍 Live Demo

🔗 **Live Site:** [Live Site URL](https://parcel-management-a12.web.app/)

📧 **Admin Credentials**

- **Email:** admin@proyojon.com
- **Password:** Admin43211@

---

## 🚀 Technologies Used

- **Frontend:** React, Tailwind CSS, Radix UI
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase, JWT
- **Payments:** Stripe API
- **Other Libraries:** Axios, ApexCharts, Leaflet, Mapbox, React Query, SweetAlert2, Lottie

---

## ✨ Features

✔ **Responsive Design** – Fully responsive for mobile, tablet, and desktop views, including the dashboard.  
✔ **Role-Based Access** – Separate dashboards for Users, Delivery Men, and Admins with conditional rendering.  
✔ **Parcel Booking** – Users can book parcels with automated price calculation.  
✔ **Real-Time Notifications** – Sweet alerts and toasts for actions like login and CRUD operations.  
✔ **Dynamic Statistics** – Fetches total parcels booked, delivered, and user stats from MongoDB.  
✔ **Top Delivery Men** – Ranks delivery personnel based on performance metrics.  
✔ **Admin Panel** – Manage parcels, assign delivery men, and analyze data with charts.  
✔ **Delivery Dashboard** – Allows delivery personnel to manage their assigned parcels.  
✔ **Review System** – Users can rate and provide feedback on delivery service.  
✔ **Secure Authentication** – JWT-based authentication ensures safe access.  
✔ **Payment Integration** – Secure **Stripe** payment with a success confetti effect.  
✔ **Environment Variables** – Sensitive keys stored securely.  
✔ **Advanced Search & Filters** – Search and filter parcels by date and status.  
✔ **Paginated Data Tables** – Enhances performance by displaying data in pages.

---

## 📦 Dependencies

```json
  "@radix-ui/react-alert-dialog": "^1.1.4",
  "@radix-ui/react-avatar": "^1.1.2",
  "@radix-ui/react-dialog": "^1.1.4",
  "@radix-ui/react-dropdown-menu": "^2.1.4",
  "@radix-ui/react-label": "^2.1.1",
  "@radix-ui/react-menubar": "^1.1.4",
  "@radix-ui/react-navigation-menu": "^1.2.3",
  "@radix-ui/react-select": "^2.1.4",
  "@radix-ui/react-separator": "^1.1.1",
  "@radix-ui/react-slot": "^1.1.1",
  "@radix-ui/react-tooltip": "^1.1.6",
  "@stripe/stripe-js": "^5.5.0",
  "@tanstack/react-query": "^5.64.1",
  "apexcharts": "^4.3.0",
  "axios": "^1.7.9",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "firebase": "^11.1.0",
  "leaflet": "^1.9.4",
  "lottie-react": "^2.4.0",
  "lucide-react": "^0.471.1",
  "mapbox-gl": "^3.9.3",
  "react": "^19.0.0-rc.1",
  "react-apexcharts": "^1.7.0",
  "react-confetti": "^6.2.2",
  "react-countup": "^6.5.3",
  "react-dom": "^19.0.0-rc.1",
  "react-hook-form": "^7.54.2",
  "react-hot-toast": "^2.5.1",
  "react-leaflet": "^5.0.0",
  "react-map-gl": "^7.1.8",
  "react-rating-stars-component": "^2.2.0",
  "react-router-dom": "^7.1.1",
  "sweetalert2": "^11.15.10",
  "tailwind-merge": "^2.6.0",
  "tailwindcss-animate": "^1.0.7"
```

---

# ⚙️ Installation & Setup Guide

Follow these steps to set up and run the **Parcel Management System (Proyojon)** locally on your machine.

---

## 🛠️ Prerequisites

Ensure you have the following installed before proceeding:

- **Node.js** (Recommended: Latest LTS version)
- **npm** (Node Package Manager) or **yarn**
- **Git** (for cloning the repository)

---

## 🚀 Step-by-Step Installation

### **1️⃣ Clone the Repository**

Open your terminal and run the following command:

```sh
git clone https://github.com/Durjoy96/parcel-management-client-side.git
```

### **2️⃣ Install Dependencies**

Install the required npm packages by running:

```sh
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a .env file in the root directory and add the following keys:

```sh
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID
VITE_imgbbApiKey=YOUR_IMGBB_API_KEY
VITE_stripePublicKey=YOUR_STRIPE_PUBLIC_KEY
```

### **4️⃣ Start the Development Server**

```sh
npm run dev
```

The application will be available at http://localhost:5173/

---

## 🛠️ Troubleshooting
- If the frontend does not start, ensure you have installed Node.js and npm.
- Check that you have set up your .env variables correctly.
- If Firebase authentication does not work, make sure API keys and Firestore rules are properly configured.

---

## 📜 License
This project is licensed under the **MIT License**.