## 1. App Component Documentation

## Description

The **App** component serves as the main layout for the application. It provides the general structure and layout, including a container for the content that will be displayed on different routes via the `<Outlet />` component from `react-router-dom`. The `API_URL` is dynamically set based on the environment (either from CodeSandbox or local development).

## Features:

- **Responsive Layout**: Uses Bootstrap grid system to center content vertically and horizontally in the viewport.
- **Dynamic API URL**: Dynamically constructs the `API_URL` to either point to CodeSandbox's host (if available) or a local server URL for development.
- **Routing**: Includes the `Outlet` component, which acts as a placeholder for nested routes in the application, allowing for dynamic content rendering based on the current route.

## Constants:

- **codeSandboxHost**: Retrieves the host URL for CodeSandbox if available, configured with a port of `3001`.
- **API_URL**: Dynamically set to the CodeSandbox URL or `localhost:3001`, depending on whether the app is hosted in CodeSandbox or running locally.

## JSX Structure:

- **Container**: A Bootstrap container used to center the content inside a row and column structure.
  - **Row**: The row is set to a height of 100% of the viewport and uses `d-flex`, `justify-content-center`, and `align-items-center` to center its content both vertically and horizontally.
  - **Column**: The column contains the `<Outlet />` component, where route-specific content will be rendered.

## Example Flow:

1. The `App` component is the root component of the application.
2. It provides a layout with a centered content area, which adapts responsively.
3. Based on the current route, the appropriate child component is rendered inside the `<Outlet />`.
4. The `API_URL` is set dynamically depending on whether the app is running on CodeSandbox or locally, making the app more flexible in different environments.

## Usage:

This component is typically used as the entry point for the application, wrapping all other route components inside the main layout and managing the dynamic setting of API URLs based on the environment.

## Dependencies:

- **react-router-dom**: Provides the `Outlet` component for route rendering.
- **@codesandbox/utils**: Provides the `getCodeSandboxHost` function to detect the host URL in CodeSandbox.

## 2. Home Component Documentation

## Description

The **Home** component provides a search functionality for hotels, cities, and countries. It allows users to search for hotels based on a search term and filter the results by cities and countries. The component makes API requests to the backend to fetch filtered data and displays the results dynamically in a dropdown menu.

## Features:

- **Search bar**: Allows the user to search for hotels based on a search term.
- **Hotel list**: Displays a list of hotels based on the search query.
- **Country and City Filtering**: Displays lists of countries and cities, which can be clicked to further filter the results.
- **Clear Button**: A clear button appears when the search input is not empty, allowing the user to clear the search.

## State Variables:

- **hotels**: Stores the list of hotels fetched from the backend based on the search term.
- **cities**: Stores a list of cities returned from the backend that match the search query.
- **countries**: Stores a list of countries returned from the backend that match the search query.
- **showClearBtn**: A boolean that controls the visibility of the "Clear" button next to the search input field.
- **hide**: A boolean that controls whether the country and city lists are displayed.

## Functions:

- **fetchAndFilterHotels**:

  - Fetches the list of hotels, cities, and countries that match the search query from the backend API (`/search?search=<value>`).
  - Returns an object with filtered hotels, cities, and countries.
  - **Params**: `value` (string) - The search term entered by the user.
  - **Returns**: An object containing `hotels`, `cities`, and `countries`.

- **fetchData**:

  - Called when the user types in the search input field.
  - Fetches filtered hotels, cities, and countries based on the input search term and updates the state accordingly.
  - **Params**: `event` (ChangeEvent<HTMLInputElement>) - The event triggered by the search input field change.

- **fetchCityCountry**:
  - Fetches hotels based on a selected city or country filter.
  - **Params**: `type` (string) - Either 'city' or 'country', `value` (string) - The selected city or country name.

## JSX Structure:

- **Search input field**:
  - A text input where the user can type their search query. It triggers the `fetchData` function on change.
- **Clear button**:
  - Appears when the search query is not empty. When clicked, it clears the search input and hides the dropdown menu.
- **Dropdown Menu**:
  - Displays the filtered hotels, cities, and countries based on the search query.
  - **Hotels Section**: Lists hotels that match the search term.
  - **Countries Section**: Lists countries that match the search term.
  - **Cities Section**: Lists cities that match the search term.
  - If no matches are found, it displays a message such as "No hotels matched", "No country found", or "No city found".

## Example Flow:

1. The user types a search query in the input field.
2. The `fetchData` function is triggered and makes a request to the backend API for hotels, cities, and countries.
3. The search results are displayed dynamically in the dropdown menu.
4. The user can click on a country or city to further filter the hotel results by that location.
5. If no results are found, appropriate messages ("No hotels matched", "No country found", etc.) are shown.
6. The user can clear the search by clicking the "Clear" button, resetting the search results.

## API Endpoints:

- **/search**: Fetches filtered hotels, cities, and countries based on the search query.
- **/search/:type**: Fetches filtered hotels based on a selected city or country (`type` can be either 'city' or 'country').

## Notes:

- The component uses `fetch` to interact with the backend API and retrieve the data.
- The state is updated as the user types into the search field, dynamically showing relevant results in the dropdown.
- The component handles asynchronous operations gracefully using `async/await`.

## Usage:

This component can be used on the homepage of a hotel booking or accommodation search platform to allow users to search and filter hotels by name, city, and country.

## 3. SearchResult Component Documentation

## Description

The **SearchResult** component is responsible for displaying detailed information about a specific hotel. It fetches hotel data from the backend API based on the hotel ID passed through the URL parameters, and dynamically renders the hotel's name, city, and country. If the hotel data is not yet loaded, it shows a "Loading..." message.

## Features:

- **Hotel Detail Display**: Displays the name, city, and country of the hotel based on the ID in the URL.
- **Dynamic Fetching**: Fetches hotel data when the component mounts or when the hotel ID changes in the URL.
- **Loading State**: Displays a loading message while the hotel data is being fetched.

## State Variables:

- **result**: Stores the fetched hotel data, or `null` if the data hasn't been loaded yet.

## Functions:

- **fetchHotel**:
  - Fetches the hotel data based on the `id` parameter from the URL using the API endpoint `/hotel/:id`.
  - **Returns**: Updates the `result` state with the fetched hotel data.

## JSX Structure:

- **Hotel Details**:
  - If the `result` contains data, it displays:
    - **Hotel Name**: The name of the hotel.
    - **City**: The city where the hotel is located.
    - **Country**: The country where the hotel is located.
  - If `result` is `null`, it shows a "Loading..." message while fetching the data.

## Example Flow:

1. The component retrieves the `id` from the URL using `useParams`.
2. The `fetchHotel` function is called on component mount (via `useEffect`), fetching hotel data based on the `id`.
3. Once the data is fetched, it updates the state, and the hotel details are rendered.
4. If the data isn't fetched yet, a loading message is displayed.

## API Endpoints:

- **/hotel/:id**: Fetches a specific hotel based on the provided hotel `id` in the URL.

## Usage:

This component can be used to display detailed information about a hotel on a separate page, where the hotel ID is passed as a route parameter in the URL.
