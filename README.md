# Lab 2 – Gradient Descent Visualizer (React + Node + MongoDB)

A full-stack web app to demonstrate **gradient descent** on a linear regression problem.  
Built with **React**, **Node.js/Express**, and optional **MongoDB** for saving experiment runs.

## Features
- Responsive multi-page React frontend:
  - **Visualizer**: Step-through animation of gradient descent on a simple linear regression.
  - **Saved Runs**: View experiments saved to MongoDB.
- Node.js backend:
  - Computes gradient descent iterations.
  - Optionally saves experiments to MongoDB.
  - Endpoints to list and fetch experiments.
- Uses JSON to communicate between frontend and backend.

## Graphs & Interpretation

### 1. Dataset & Regression Graph
- Displays the input dataset as scatter points.
- Shows the regression line as it updates each iteration of gradient descent.
- As training progresses, the line should fit closer to the data points.

### 2. Loss vs Iteration Graph
- Plots Mean Squared Error (MSE) loss on the y-axis against iteration steps on the x-axis.
- The curve should decrease over iterations, showing gradient descent is minimizing the error.
- A smooth downward slope indicates successful learning. If the curve is flat or increases, parameters may be poorly chosen.

## Buttons & Controls
- **Run Gradient Descent**: Starts a new experiment with chosen parameters.
- **Play / Pause**: Animates the regression line moving step by step.
- **Step Back / Step Forward**: Manually move through iterations of gradient descent.
- **Jump to End**: Instantly skip to the final parameters.
- **Save Run to MongoDB**: Stores experiment results in the database (if configured).

## Prerequisites
- Node.js >=16
- npm or yarn
- MongoDB Atlas or local MongoDB (optional, only for saving runs)

## Running Locally

### 1. Backend
```bash
cd backend
npm install
````

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>
```

Run the server:

```bash
npm start
```

### 2. Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Open: `http://localhost:5173`

### 3. Using the App

* Enter gradient descent parameters (learning rate, iterations, etc.).
* Check **“Save run to DB”** if you want the backend to save the experiment (requires MongoDB).
* Click **Run Gradient Descent**.
* Use the **Play / Step / Reset** controls to animate the descent.
* Click the **Saved Runs** page to view experiments stored in MongoDB.

## API Endpoints

* `POST /api/gradient-descent` – Run gradient descent. Body:

  ```json
  { "learningRate": 0.01, "iterations": 100, "save": true }
  ```
* `GET /api/experiments` – List saved runs.
* `GET /api/experiments/:id` – Get a specific run.

## Notes

* Without `MONGO_URI` configured, the app still runs but won’t persist experiments.
* All computation is intentionally simple for teaching purposes.