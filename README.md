# FBI Wanted Backend

A backend service for a web application that integrates with the [FBI Wanted API](https://www.fbi.gov/wanted/api). This service provides RESTful endpoints to fetch, search, and filter information about wanted persons, with data transformation and caching for efficient and reliable access.

## Overview
This backend application acts as a proxy and data transformer for the FBI Wanted API. It exposes endpoints for the frontend to consume, handles search and filtering, and implements caching to optimize repeated requests. The backend is built with Node.js and NestJS, and is ready to run locally or in a Docker container.

## Features
- Fetches and exposes a list of wanted persons from the FBI Wanted API
- Supports search and filtering by name, keywords, hair color, eye color, race, and more
- Provides detailed information for each wanted person
- Implements caching to reduce redundant API calls and improve performance
- Handles errors gracefully and logs issues for debugging
- Includes unit and integration tests

## Tech Stack
- **Backend:** Node.js, NestJS
- **HTTP Client:** Axios (via @nestjs/axios)
- **Caching:** @nestjs/cache-manager (in-memory by default)
- **Testing:** Jest, Supertest
- **Containerization:** Docker (optional)

## Setup & Running

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- (Optional) Docker

### Running Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run start:dev
   ```
   The backend will be available at `http://localhost:3000` by default.

### Running with Docker
1. Build the Docker image:
   ```bash
   docker build -t fbi-wanted-backend .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:3000 fbi-wanted-backend
   ```
   The backend will be available at `http://localhost:3000` inside the container.

## API Endpoints

### `GET /api/wanted`
Fetch a paginated list of wanted persons. Supports query parameters for search and filtering:
- `page`: Page number
- `field_offices`: Filter by FBI field office
- `poster_classification`: Filter by classification
- `search`: Search by name or keywords
- `hair`, `eyes`, `race`: Additional filters

#### Example
```
GET /api/wanted?page=1
```

### Response
```
{
  total: number,
  items: [
    {
      uid: string,
      title: string,
      description: string,
      images: [...],
      ...
    },
    ...
  ],
  page: number
}
```

## Testing
Run all unit and integration tests:
```bash
npm test
npm run test:e2e
```

## License
MIT
