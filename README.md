# Stibo Dx Limited Test Project

This is a Node.js application built as a test project for Stibo Dx Limited. It includes four endpoints for creating users, retrieving a user by ID, fetching users with specific fields and delete all users.

## Technologies Used

- Node.js
- Express.js
- Prisma
- PostgreSQL

## Live Demo

Check out the live demo of the application [https://ethical-shannah-riyadh.koyeb.app](https://ethical-shannah-riyadh.koyeb.app).

### Prerequisites

- Node.js (version 16.13 or higher)
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/riyadh9292/node-js-user.git
cd node-js-user
npm install

```

## Endpoints

### 1. Create User

Creates a new user with the provided data.

**Endpoint:** POST /create-user

**Example Query:**

```bash
curl --request POST \
  --url https://ethical-shannah-riyadh.koyeb.app/create-user \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "gender": "MALE",
    "profession": "Developer",
    "phoneNumber": "+123456789"
  }'
```

### 2. Retrieve User by ID

Retrieves a user by their ID.

**Endpoint:** GET /user/:id

**Example Request:**

```bash
curl --request GET \
  --url https://ethical-shannah-riyadh.koyeb.app/user/1
```

### 3. Fetch Users with Specific Fields

Fetch users with specific fields using GraphQL.

**Endpoint:** POST /graphql

**Behavior:** The GraphQL endpoint allows flexible data retrieval based on the provided query. Users can specify the fields they want and the criteria for sorting and limiting the results.

**Example Request:**

```bash
query {
  users(fields: ["name", "email", "age", "profession", "createdAt"], limit: 3, orderBy: [
    { field: "name", direction: "asc" },
    { field: "createdAt", direction: "asc" },
  ]) {
    name
    email
    age
    createdAt
    profession
  }
}

```

### 4. Delete All Users

Deletes all users from the database.

**Endpoint:** DELETE /delete-all-users

**Example Request:**

```bash
curl --request DELETE \
  --url https://ethical-shannah-riyadh.koyeb.app/delete-all-users
```
