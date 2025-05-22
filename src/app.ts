import express from 'express';
import inventoryRoutes from './controllers/routes/inventoryRoutes';
import cors from 'cors';

const app = express();

app.use(cors());

// Middleware (optional, e.g., for JSON parsing)
app.use(express.json());

// Register routes
app.use('/api', inventoryRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
