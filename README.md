# MealDB Recipe Finder

![MealDB Recipe Finder Banner](https://via.placeholder.com/1200x300?text=MealDB+Recipe+Finder)

Welcome to **MealDB Recipe Finder**! 🎉

# Note for Julien

Due to a small misunderstanding regarding the use of the `useReducer` hook, probably due to a lack of clarity on my part when responding, I am here applying a very simple app state initializer with actions and dispatches set manually using a switch-case to demonstrate my understanding of the hook's usage. Instead of initializing these states separately with `useState`, I thought it was a good opportunity to showcase a use case for the hook. Of course, there are more advanced and applicable solutions for more robust and scalable scenarios, such as initializing states from the server instead of having them in the app's entry file, but ultimately, it's to demonstrate my understanding of this hook.

This challenge was fun, and I want to thank you for considering me. Part of the components and modules of my app are documented, and some mappings have comments explaining why I decided to index them in certain ways.

If I had had a slightly more relaxed deadline, I would have implemented toast alerts, improved the user experience, generated `srcSet`s to map the images, and enhanced responsiveness with a new CSS feature that avoids using an event listener with javscript as we are usually accustomed to.

I would also have set variables with Sass for Tailwind, including colors, mixins, breakpoints, `toRem()` functions, and other details to improve the scalability and modularity of the code.

I hope my challenge meets your expectations, and I am really looking forward to working with you.

Anyway, I present myself as a team player. It was a pleasure meeting you, and thank you once again.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Features

### **1. Search Meals by Name or Ingredient**

- **Dynamic Search:** Users can search for meals either by their name or by a specific ingredient.
- **Debounced Input:** Implements a debounce mechanism to optimize search performance and reduce unnecessary API calls.

### **2. Filter Meals by Category and Area**

- **Category Filtering:** Narrow down meal options based on categories like Beef, Chicken, Dessert, Vegetarian, etc.
- **Area Filtering:** Explore meals from different regions such as American, British, Canadian, Chinese, and more.

### **3. View Detailed Meal Information**

- **Meal Details:** Click on any meal to view comprehensive details including ingredients, instructions, and images.
- **Responsive Design:** Ensure a seamless viewing experience across all devices.

### **4. Manage Favorite Meals**

- **Add to Favorites:** Easily add meals to your favorites list for quick access.
- **Remove from Favorites:** Remove meals from your favorites with a simple toggle.
- **Favorites List:** View and manage all your favorite meals in one place.

### **5. Pagination**

- **Efficient Navigation:** Navigate through meal listings with intuitive pagination controls.
- **Dynamic Page Numbers:** Handles multiple pages with ellipses for better user experience.

### **6. Dark Mode Toggle**

- **Enhanced Accessibility:** Switch between light and dark themes to suit your preference and environment.
- **Persistent Theme:** Remember your theme choice across sessions.

### **7. Surprise Me! Random Meal Feature**

- **Discover New Meals:** Get a random meal suggestion with just a click to explore new recipes.
- **Instant Inspiration:** Perfect for those moments when you’re not sure what to cook.

### **8. Centralized State Management with `useReducer`**

- **Scalable State Management:** Utilize `useReducer` for managing complex state logic efficiently.
- **Predictable State Transitions:** Ensure consistent and maintainable state updates across the application.

### **9. Optimized Performance**

- **React Query Integration:** Efficiently manage data fetching, caching, and synchronization.
- **Lazy Loading:** This is a small app, and lazy loading was not necessary at all.

### **10. Responsive and Accessible Design**

- **Mobile-Friendly:** Designed to work seamlessly on mobile, tablet, and desktop devices.
- **Accessibility Standards:** Adheres to accessibility best practices for inclusive user experience.

---

## Demo

Check out the live demo [here](https://your-deployed-app-link.com).

---

## Installation

Follow these steps to set up the MealDB Recipe Finder locally on your machine.

### **Prerequisites**

- **Node.js** (v14 or above)
- **npm** or **yarn**

### **Steps**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/pablosecuen/mealdb-challenge
   ```

Navigate to the Project Directory

cd mealdb-challenge
Install Dependencies

Using npm:
npm install

Using yarn:
yarn install
Start the Development Server

Using npm:
npm start
Open in Browser

Using yarn:
yarn start
Open in Browser

Visit http://localhost:5173 to view the application.

Usage

1. Searching for Meals
   By Name:

Select "Name" from the search type dropdown.
Enter the meal name in the search bar.
Results will dynamically update as you type.

2. By Ingredient:

Select "Ingredient" from the search type dropdown.
Enter the desired ingredient.
Explore meals that include the specified ingredient. 2. Filtering Meals

3.Category Filter:

Use the category dropdown to select a specific meal category.
The meal list will update to reflect your selection.

4.Area Filter:

Use the area dropdown to filter meals by region.
Discover dishes from different culinary traditions. 3. Viewing Meal Details
Click on any meal card to view detailed information.
Explore ingredients, cooking instructions, and high-quality images. 4. Managing Favorites

5.Add to Favorites:

6.Click the heart icon on any meal card to add it to your favorites.
Remove from Favorites:

7.Click the filled heart icon to remove a meal from your favorites.
View Favorites:

Scroll to the "Favorite Meals" section to view all your saved recipes. 5. Pagination
Navigate through multiple pages of meal results using the pagination controls.
Click on specific page numbers or use the "Previous" and "Next" buttons. 6. Dark Mode
Toggle between light and dark themes using the moon/sun icon in the header.
Your theme preference will persist across sessions. 7. Surprise Me!
Click the "Surprise Me!" button to fetch a random meal suggestion.
Discover new and exciting recipes effortlessly.

Technologies Used

React: Front-end library for building user interfaces.

TypeScript: Enhances JavaScript with static typing for better code quality.

React Query: Manages server state and data fetching with ease.

Tailwind CSS: Utility-first CSS framework for rapid UI development.

Lucide React: Icon library for beautiful and customizable icons.

React Hooks: Utilizes useReducer, useState, useEffect, and custom hooks for state management and side effects.

Project Structure

mealdb-challenge/
├── src/
│ ├── components/
│ │ ├── SearchBar.tsx
│ │ ├── FilterBar.tsx
│ │ ├── MealList.tsx
│ │ ├── MealDetails.tsx
│ │ ├── FavoritesList.tsx
│ │ └── Pagination.tsx
│ ├── constants/
│ │ └── constants.ts
│ ├── hooks/
│ │ ├── useDebounce.ts
│ │ ├── useDarkMode.ts
│ └── reducer/
│ │ └── useReducer.ts
│ ├── store/
│ │ ├── storeView.ts
│ │ └── operator.ts
│ ├── types/
│ │ └── types.ts
│ ├── App.tsx
│ └── index.tsx
├── public/
│ └── index.html
├── package.json
├── tsconfig.json
└── README.md
