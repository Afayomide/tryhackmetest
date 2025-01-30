# Search and Filter Hotel Data

## 1. Search Hotels by Multiple Fields

- **URL**: `/search`
- **Method**: `GET`
- **Description**: Searches for hotels based on a keyword query. The search is performed on `chain_name`, `hotel_name`, `city`, and `country` fields, with case-insensitive matching.
- **Request Query Parameters**:
  - **search**: A string to search for in the hotel fields (`chain_name`, `hotel_name`, `city`, `country`).
- **Response**:
  - **Success Response**:
    - **Code**: `200 OK`
    - **Content**:
      ```json
      {
        "hotels": [
          {
            "hotel_name": "Hotel A",
            "chain_name": "Chain A",
            "city": "City A",
            "country": "Country A",
          },
          {
            "hotel_name": "Hotel B",
            "chain_name": "Chain B",
            "city": "City B",
            "country": "Country B",
          }
        ],
        "categorized": {
          "cities": [
            {
              "city": "City A",
              "country": "Country A"
            },
            {
              "city": "City B",
              "country": "Country B"
            }
          ],
          "countries": [
            "Country A",
            "Country B"
          ]
        }
      }
      ```
  - **Error Responses**:
    - **Code**: `500 Internal Server Error`
      - **Content**:
        ```json
        {
          "message": "Internal server error"
        }
        ```

### Flow:
1. **Hotel Search**:
   - A search is performed on the `hotels` collection, searching for the provided query (`search`) across the fields: `chain_name`, `hotel_name`, `city`, and `country`. The search is case-insensitive.

2. **Categorized Results**:
   - The response includes categorized data:
     - **Cities**: A list of unique cities and their corresponding countries that match the search query.
     - **Countries**: A distinct list of countries matching the search query.

3. **Return Response**:
   - The search results and categorized data are returned in a JSON object.

### Error Handling:
- **`500 Internal Server Error`**: If any error occurs during the search process, a `500` error response with the message `"Internal server error"` is returned.

---

## 2. Search Hotels by Specific Type (Field)

- **URL**: `/search/:type`
- **Method**: `GET`
- **Description**: Searches for hotels based on a keyword query, but restricted to a specific field, determined by the `type` parameter.
- **Request Query Parameters**:
  - **search**: A string to search for in the specific field determined by the `type`.
- **Request URL Parameters**:
  - **type**: The field to search within (e.g., `hotel_name`, `chain_name`, `city`, `country`).
- **Response**:
  - **Success Response**:
    - **Code**: `200 OK`
    - **Content**:
      ```json
      {
        "hotels": [
          {
            "hotel_name": "Hotel C",
            "chain_name": "Chain C",
            "city": "City C",
            "country": "Country C",
          },
          {
            "hotel_name": "Hotel D",
            "chain_name": "Chain D",
            "city": "City D",
            "country": "Country D",
          }
        ]
      }
      ```
  - **Error Responses**:
    - **Code**: `500 Internal Server Error`
      - **Content**:
        ```json
        {
          "message": "Internal server error"
        }
        ```

### Flow:
1. **Hotel Search by Field**:
   - A search is performed on a specific field (`type`), which could be `hotel_name`, `chain_name`, `city`, or `country`, based on the `type` parameter in the request.

2. **Return Response**:
   - The search results are returned in the `hotels` field of the response JSON.

### Error Handling:
- **`500 Internal Server Error`**: If any error occurs during the search process, a `500` error response with the message `"Internal server error"` is returned.



## 3. Get Hotel by ID

## URL
`/hotel/:id`

## Method
`GET`

## Description
Fetches details of a hotel by its unique ID.

## Request URL Parameters
- **id**: The unique ID of the hotel to fetch from the database.

## Response

- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "_id": "5f50c31e92e12b4c7d01bc5e",
      "hotel_name": "Hotel Example",
      "chain_name": "Example Chain",
      "city": "Example City",
      "country": "Example Country",
      "description": "A description of the hotel",
      "rating": 4.5,
      // Other hotel fields
    }
    ```

- **Error Responses**:
  - **Hotel Not Found**:
    - **Code**: `404 Not Found`
    - **Content**:
      ```json
      {
        "message": "Hotel not found"
      }
      ```

  - **Internal Server Error**:
    - **Code**: `500 Internal Server Error`
    - **Content**:
      ```json
      {
        "message": "Internal server error"
      }
      ```

## Flow:
1. **Extract Hotel ID**: The `id` parameter is extracted from the URL.
2. **Database Query**: The MongoDB collection is queried for a hotel with the provided `id`.
3. **Check for Existence**: If the hotel is not found, a `404 Not Found` response is returned.
4. **Return Hotel Data**: If the hotel exists, its details are returned as a JSON response.
5. **Error Handling**: If any errors occur during the process, a `500 Internal Server Error` response is returned.

## Notes:
- The hotel ID is assumed to be an ObjectId in MongoDB and is converted accordingly.
- Ensure that the MongoDB client (`mongoClient`) is properly connected before querying the database.


