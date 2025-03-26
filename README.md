Bakery App – Auto1 Frontend Challenge
=====================================

![bakery shop](https://static.vecteezy.com/system/resources/previews/002/045/877/large_2x/fancy-bakery-shop-with-trees-and-bike-vector.jpg)

Overview
--------

This application is a solution to the Auto1 Frontend Challenge for a local bakery that wants to offer its products online. The app allows customers to browse a list of bakery products, adjust the quantity they wish to order, see a live updated total, and submit orders. It also handles error states gracefully, supports responsive design for both mobile and desktop views, and follows modern accessibility practices.

Features
--------

*   **Product Listing:**

    *   Fetches product data from an API (`/api/storage`).

    *   Displays product name, thumbnail, price, and available stock.

    *   Adjusts available stock dynamically based on items added to the cart.

*   **Cart Functionality:**

    *   Users can increase or decrease the quantity of products.

    *   Cart state is persisted using local storage.

    *   Displays a live-updating total price.

    *   Uses a modern, sticky bottom bar on mobile to keep the checkout button always in view.

*   **Order Submission:**

    *   Submits orders via a POST request to `/api/order`.

    *   Displays a success page upon successful order submission.

    *   Implements error handling using react‑toastify (toast notifications) and a full‑screen error UI when products fail to load.

*   **Responsive Design:**

    *   Mobile: Uses Flexbox for a single-column layout with a sticky bottom bar.

    *   Desktop: Uses CSS Grid (or media queries) to display multiple columns of product cards.

*   **Accessibility & ARIA:**

    *   Uses semantic HTML elements (e.g., `<main>`).

    *   Provides descriptive alt text for images and aria-labels for interactive buttons.

    *   Dynamic error messages are announced using ARIA live regions via toast notifications.

*   **Environment Configuration:**

    *   Avoids hardcoding API URLs by using a proxy (in Create React App)


Technical Stack
---------------

*   **Frontend:** React, Bootstrap 5, SCSS, react‑toastify.

*   **Backend:** Express with a simple API for product storage and order processing.

*   **Tooling:** Create React App (or similar), and npm scripts.


Folder Structure
----------------

```A1G-FE-challenge/
├── client/
│   ├── public/
│   │   └── images/         # Product images and fallback default image
│   ├── src/
│   │   ├── components/
│   │   │   ├── Cart.tsx
│   │   │   ├── ProductsList.scss
│   │   │   ├── ProductsList.tsx
│   │   │   ├── StickyBottomBar.scss
│   │   │   ├── StickyBottomBar.tsx
│   │   │   ├── SuccessPage.scss
│   │   │   └── SuccessPage.tsx
│   │   ├── App.tsx
│   │   └── App.scss
│   └── package.json
└── index.js                # Express API server
```



Setup and Run
-------------

### **Backend**

1. Open a terminal in the project root:
```
    cd A1G-FE-challenge
    npm install
    npm run start
```
The server runs on `http://localhost:3001`.


### **Frontend**

1.  Open another terminal in the client directory:
```
    cd A1G-FE-challenge/client
    npm install
```

2.  For development, configure the proxy by adding this to `client/package.json`

```
    "proxy": "http://localhost:3001"
```

3.  Start the React app
```
    npm run start
```
The app runs on `http://localhost:3000`.


Accessibility Improvements
--------------------------

*   **Images:** Each product image includes a descriptive alt attribute.

*   **Buttons:** Interactive buttons (e.g., plus/minus) have aria-label attributes to describe their function.

*   **Semantic Markup:** The app uses semantic elements (such as `main` ) for improved navigation.


Responsive Design
-----------------

*   **Mobile (≤990px):** Uses Flexbox for a simple, vertical layout with a sticky bottom bar that keeps the checkout button in view.

*   **Desktop (>990px):** Uses CSS Grid (or media queries) to display product cards in multiple columns. The layout adjusts to prevent clipping of interactive elements at mid-range widths.


Error Handling
--------------

*   **API Errors:** All fetch calls are wrapped in try/catch blocks.When an error occurs:

    *   A toast notification is shown using react‑toastify.

    *   A full-screen error UI is displayed in the product list area to avoid a blank page.


Conclusion
----------

This solution meets all the requirements of the challenge and includes several enhancements:

*   A responsive, accessible UI.

*   Modern error handling with toast notifications and full-screen error states.

*   A persistent, dynamic cart and a sticky bottom bar for mobile.

*   Clean, modular code with reusable components.


Thank you for considering my submission. I look forward to your feedback!