
# 🔗 URL Shortener with Tracking (Express, MongoDB, Redis, Streamlit)

This project is a **URL shortener** built using **Express.js**, **MongoDB**, and **Redis**. It includes tracking features for IP address, location, and click statistics using **geoip-lite**. The frontend is built using **Streamlit**.

---

## 🚀 Features
✅ Shorten long URLs  
✅ Resolve short URLs and redirect  
✅ Track IP address and location (country, city, region)  
✅ Store and manage data using MongoDB and Redis  
✅ Display click statistics in Streamlit  

---

## 🏗️ **Tech Stack**
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Cache:** Redis  
- **Geo Location:** geoip-lite  
- **Frontend:** Streamlit  
- **Deployment:** Docker (Optional)  

---

## 📂 **Project Structure**
```bash
├── config
│   ├── db.js
│   └── redis.js
├── models
│   └── url.js
├── routes
│   └── urlRoutes.js
├── frontend
│   └── app.py
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## 🔧 **Setup and Installation**
### 1. **Clone the repository**  
```bash
git clone https://github.com/vikashcoder/Url-Tracking.git
```

### 2. **Navigate to project directory**
```bash
cd url-shortener
```

### 3. **Install dependencies**
```bash
npm install
```

### 4. **Set up environment variables**
Create a `.env` file in the root directory and add:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/urlshortener
REDIS_URL=redis://localhost:6379
```

### 5. **Start MongoDB and Redis**  
Make sure MongoDB and Redis servers are running:

- **Start MongoDB** (if installed locally):  
```bash
mongod
```

- **Start Redis** (if installed locally):  
```bash
redis-server
```

### 6. **Start the backend server**
```bash
npm run start
```

---

## 🎨 **Frontend Setup (Streamlit)**
### 1. **Navigate to the frontend folder**
```bash
cd frontend
```

### 2. **Install Python dependencies**
```bash
pip install -r requirements.txt
```

### 3. **Run the Streamlit app**
```bash
streamlit run app.py
```

---

## 🏆 **API Endpoints**
### 📌 **Create Short URL**
**POST** `/api/url/shorten`  
**Request Body**:
```json
{
  "longUrl": "https://example.com"
}
```
**Response**:
```json
{
  "shortUrl": "abc123",
  "longUrl": "https://example.com"
}
```

---

### 📌 **Resolve Short URL**
**GET** `/:shortUrl`  
**Example**:
```bash
curl http://localhost:5000/api/url/abc123
```

**Redirects to** `https://example.com`

---

### 📌 **Get URL Stats**
**GET** `/:shortUrl/stats`  
**Example**:
```bash
curl http://localhost:5000/api/url/abc123/stats
```
**Response**:
```json
{
  "shortUrl": "abc123",
  "longUrl": "https://example.com",
  "clicks": 2,
  "clickData": [
    {
      "ipAddress": "192.168.1.1",
      "country": "US",
      "region": "California",
      "city": "Los Angeles",
      "timestamp": "2025-03-20T10:00:00Z"
    }
  ]
}
```

---

## 🐳 **Docker Setup**
### 1. **Build Docker Image**
```bash
docker build -t url-shortener .
```

### 2. **Run Docker Container**
```bash
docker run -p 5000:5000 --env-file .env url-shortener
```

---

## 📸 **Screenshots**
### 🔥 **Shorten URL**
![Shorten URL](https://example.com/shorten-url.png)

### 🚀 **Resolve URL**
![Resolve URL](https://example.com/resolve-url.png)

### 📊 **View Stats**
![URL Stats](https://example.com/url-stats.png)

---

## ✅ **Environment Setup Checklist**
✔️ MongoDB and Redis installed and running  
✔️ `.env` file configured properly  
✔️ Dependencies installed (`npm install` and `pip install`)  
✔️ Docker installed (optional)  

---

## 🏁 **Running Tests**
To test the backend using **Postman**:  
- Import the collection from `postman_collection.json`  
- Test endpoints:  
  - `/shorten` (POST)  
  - `/:shortUrl` (GET)  
  - `/:shortUrl/stats` (GET)  

---

## 🌍 **How It Works**
1. A user submits a long URL.
2. The backend generates a unique short code.
3. The short code and original URL are stored in MongoDB and cached in Redis.
4. When the user accesses the short URL:
   - Redis checks if it exists.
   - If found, redirects to the original URL.
   - Logs IP address, location, and click time.
5. Data is updated in MongoDB and Redis.

---

## 🧠 **Why Redis?**
- Fast lookup and caching for quick URL resolution.  
- Reduced database load using Redis cache.  

---

## 🚧 **Future Improvements**
- ✅ Add custom URL aliasing  
- ✅ Add JWT-based user authentication  
- ✅ Improve UI with Tailwind CSS  



