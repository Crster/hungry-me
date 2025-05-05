# 🍴 Restaurant Finder

Restaurant Finder is a modern web application designed to help users discover restaurants effortlessly. This guide provides step-by-step instructions for setting up, running, and deploying the application in development or production environments.

---

## 🎨 Frontend

### Tech Stack
- **Framework**: Vite + React (TypeScript template for scaffolding)
- **Styling**: TailwindCSS
- **Routing**: React Router
- **Icons**: Lucide React

### 🚀 Setup and Run
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   > **Note:** Ensure that Node.js (version 18 or later) and npm are installed.

3. Create a `.env` file in the `frontend` directory with the following content:
   ```plaintext
   VITE_REST_API_URL=http://localhost:8080
   PORT=3000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and access the application at: `http://localhost:3000`.

---

## 🛠 Backend

### Tech Stack
- **Framework**: FastAPI (for REST API development)
- **LLM Integration**: litellm (for large language model services)
- **LLM Providers**: Tested with Hugging Face and Ollama Local; may work with any litellm-supported LLMs.
- **Restaurant Data**: Foursquare API

### 🚀 Setup and Run
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. *(Optional)* Activate a Python virtual environment:
   ```bash
   # On Windows
   .\Scripts\activate.bat
   ```
   > **Tip:** Activating a virtual environment is recommended to isolate dependencies and avoid conflicts.

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   > **Note:** Ensure Python 3.8 or later and `pip` are installed.

4. Create a `.env` file in the `backend` directory with the following content:
   ```plaintext
   DEMO_MODE=false
   APP_URL=http://localhost:3000
   LLM_MODEL=huggingface/together/deepseek-ai/DeepSeek-R1
   HF_TOKEN=##########
   FOURSQUARE_API_URL=https://api.foursquare.com/v3
   FOURSQUARE_API_KEY=##########
   ```
   > Replace `##########` with valid API keys or tokens.

5. Set the environment variable to ensure UTF-8 encoding:
   ```bash
   export PYTHONUTF8=1  # For UNIX-based systems
   set PYTHONUTF8=1     # For Windows
   ```

6. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --port 8080
   ```
7. Access the API at: `http://localhost:8080`.

---

## 🤖 Demo: LLM Mode

To enable and test the LLM (Large Language Model) integration, follow these steps:

1. Download and install [Ollama](https://ollama.com/).
2. Start Ollama and open your terminal/command prompt.
3. Install the `deepseek-r1` model:
   ```bash
   ollama run deepseek-r1
   ```
4. Check the list of available models:
   ```bash
   ollama ps
   ```
5. Update the `.env` file in the `backend` directory to use Ollama locally:
   ```plaintext
   LLM_MODEL=ollama/deepseek-r1:latest
   LLM_API_BASE=http://localhost:11434
   ```
6. Restart the backend server and test the LLM functionality.

---

## 🐳 Docker Deployment

You can deploy the application using Docker for a production environment.

### Steps to Deploy
1. Create `frontend.env` and `backend.env` files. These files will be used to configure the `.env` files for the frontend and backend services.
2. Build the Docker image:
   ```bash
   docker build -t yum .
   ```
3. Run the Docker container:
   ```bash
   docker run -p 8888:80 yum
   ```
4. Access the application in your browser at: `http://localhost:8888`.

---

## 📄 Notes
- Ensure all prerequisites (e.g., Node.js, Python, API keys) are set up before running the application.
- Replace placeholders (e.g., `##########`) in the `.env` files with actual values.
- This project has been tested with Hugging Face models and Ollama Local. Compatibility with other LLM providers may vary.
- Unset VITE_REST_API_URL and APP_URL when using docker
- On windows machine use http://host.docker.internal:11434 when using docker to connect to local Ollama instance.
---

Thank you for using Restaurant Finder! 🍽️