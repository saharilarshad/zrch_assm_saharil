# Project Title

This project is a Next.js application with state management using Redux, Google OAuth2 login using Clerk, and CRUD operations for products with separate access levels for users and admins.

## Features

1. **Google OAuth2 Login via Clerk**: Users can log in using their Google account via Clerk for authentication.
   
2. **Redux State Management**: The project uses Redux to manage the global state, allowing data to be shared and accessed across multiple components.

3. **User Page**: 
    - Allows users to view a list of data.
    - Features for filtering and clearing filters.
    - Restricts data access based on the user's authentication.

4. **Admin Page**:
    - Admins can create, update, and delete products.
    - All CRUD actions are managed using Redux.

5. **Reusable Header and Footer**: 
    - Both the header and footer components are reusable and their content is defined in a JSON structure stored in the `lib` folder. 
    - This makes the components easily customizable without having to modify the component code.

6. **Redirect on Unauthorized Access**: 
    - If a user is not authenticated, they are redirected to the login page.

7. **Redirect on Unauthorized Access**: 
    - I also implement loading compenet when redux state return loading status.

8. **UI Framework Using ShadCN**: 
    - I use ShadCN as UI framework.

9. **Tailwind CSS**: 
    - I use Tailwind CSS as the utilities class.

## Setup Instructions

### 1. Clone the Repository

```bash
cd nextjs

$ npm install

$ npm run dev

```
### 2. To run in docker.
```bash

$ docker-compose -f docker/docker-compose.yaml up -d --build

```