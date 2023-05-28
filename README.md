# E-Commerce App

A full-stack e-commerce site created using the MERN stack technologies. This app was deployed on Render.com (front-end/back-end). Here is a [DEMO](https://mern-ecommerce-app-client.onrender.com/) of the project.

### Technologies used in this project:
* React
* Node JS/ Express
* Bootstrap framework
* Mongo DB (to store user and order data)
* Firebase Auth
* Firebase admin sdk
* Redux Toolkit
* Stripe payment integration / Stripe webhooks
* Cloudinary for image storage.

### Application Features:
* Account creation
* Save products to wishlist
* Leave feedback comments on a product.
* Checkout process using Stripe.

Create your Firebase Admin SDK, MongoDB, Cloudinary, and Stripe credentials, and include them in your .env file with the following:

# Mongo
ATLAS_URI= 

# Firebase
FIREBASE_AUTH_CERT_URL= 
FIREBASE_AUTH_URI= 
FIREBASE_CLIENT_CERT_URL= 
FIREBASE_CLIENT_EMAIL= 
FIREBASE_CLIENT_ID= 
FIREBASE_PRIVATE_KEY= 
FIREBASE_PRIVATE_KEY_ID= 
FIREBASE_PROJECT_ID= 
FIREBASE_TOKEN_URI= 

# Stripe
STRIPE_PUBLISHABLE_KEY= 
STRIPE_SECRET_KEY= 
STRIPE_WEBHOOK_SECRET= 
SUCCESS_URL=http://localhost:3000
CANCEL_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
