# Environment Variables

Create a `.env` file in the project root with the following variables:

```env
MONGO_URI=mongodb://127.0.0.1:27017
PORT=3000
MONGO_DB=blogdb
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
```

## Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017` |
| `MONGO_DB` | Database name | `blogdb` |
| `PORT` | Server port | `3000` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_jwt_secret` |
| `JWT_REFRESH_SECRET` | Secret key for refresh tokens | `your_jwt_refresh_secret` |
