# URL Shortener Backend

A robust URL shortening service built with Node.js, Express, and TypeScript that creates shortened URLs and tracks visit analytics.

## Features

- 🔗 URL Shortening with custom nanoid
- 📊 Visit Analytics
- ⏰ Timestamp tracking for each visit
- 🔄 Redirect handling
- 📈 Visit counter

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

## API Endpoints

### Create Short URL
```http
POST /api/url
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `originalURL` | `string` | **Required**. URL to be shortened |

#### Response
```json
{
  "message": "Saved",
  "id": "abc12"
}
```

### Redirect to Original URL
```http
GET /:nanoID
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `nanoID` | `string` | **Required**. Short URL ID |

## Installation

1. Clone the repository
```bash
git clone https://github.com/rohitdeka-1/urlShortBackend.git
```

2. Install dependencies
```bash
cd urlShortBackend
npm install
```

3. Create a `.env` file in the root directory and add:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. Start the development server
```bash
npm run dev
```

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `PORT` - Port number for the server (default: 3000)

## Project Structure
