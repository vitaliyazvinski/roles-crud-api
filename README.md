### Simple shopping list REST API

The api provides the following:

- Shopping list CRUD
- Shopping list item CRUD
- UAC (`Owner` role has full access, `Buyer` role is read only)

In order to run service do:

```bash
npm run start
```

in order to run tests and see code coverage do:

```bash
npm t
```

API uses JWT for authentication/authorisation and has two hardcoded users by default:

```js
[
  {
    username: 'Adam',
    password: 'secureOwnerPassword',
    role: 'owner',
  },
  {
    username: 'John',
    password: 'secureBuyerPassword',
    role: 'buyer',
  },
];
```

In order to have access to the API you have to login and get the JWT token first.

Owner token:

```bash
curl -X POST \
  http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"Adam", "password":"secureOwnerPassword"}'
```

Buyer token:

```bash
curl -X POST \
  http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"John", "password":"secureBuyerPassword"}'
```

For the `Byuer` the next endpoints available, make sure you added authorization header with previously obtained token to the request:

Example:

```bash
curl -X GET \
  http://localhost:3000/api/shopping-list \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4iLCJwYXNzd29yZCI6InNlY3VyZUJ1eWVyUGFzc3dvcmQiLCJyb2xlIjoiYnV5ZXIiLCJpYXQiOjE2MTIyMDY5NDB9.hgvpyXattWb1jW2FFlJmLRzyLR__ZH58-PsiaIBotWM' \
  -H 'Content-Type: application/json' \
```

```
GET: /api/shopping-list/:id
```

```
GET: /shopping-list'
```

```
GET: /shopping-list/:id'
```

For the `Owner` role in addition to the previous the next endpoints available:

```
POST: /api/shopping-list
```

```
POST: /api/shopping-list-item
```

```
DELETE: /api/shopping-list/:id
```

```
DELETE: /api/shopping-list-item/:id
```

`POST` requests to the entities either create a new entity instance or update existing one by checking `id` field:

```bash
curl -X POST \
  http://localhost:3000/api/shopping-list-item \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkYW0iLCJwYXNzd29yZCI6InNlY3VyZU93bmVyUGFzc3dvcmQiLCJyb2xlIjoib3duZXIiLCJpYXQiOjE2MTIyMDc0OTB9.f-fk2aYN49RbXJqj4041mCI-E1h9n0vlr2E6XpMA4NM' \
  -H 'Content-Type: application/json' \
  -d '{"id": "2",
"list": [
    {
        "name": "Bread",
        "count": 1
    },
    {
        "name": "Milk",
        "count": 1
    }
]}'
```
