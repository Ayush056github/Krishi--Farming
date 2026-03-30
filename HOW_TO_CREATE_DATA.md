# How to Create Data in MongoDB - Hindi/English Guide

## ✅ आपका Setup सही है! (Your Setup is Correct!)

आपने सफलतापूर्वक:
- ✅ MongoDB Compass में connect किया है
- ✅ `krishi_kisan` database बनाया है
- ✅ `users` collection बनाया है

अब data create करने के 2 तरीके हैं:

---

## Method 1: Application से Automatic (Recommended - सबसे आसान)

### Step 1: `.env` File Check करें

`Backend` folder में `.env` file खोलें और verify करें:

```env
MONGODB_URI=mongodb://localhost:27017/krishi_kisan
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

**Important:** Database name `krishi_kisan` होना चाहिए (बिल्कुल वैसा ही जैसा आपने Compass में बनाया है)

### Step 2: Backend Server Start करें

PowerShell में Backend folder में जाएं:

```powershell
cd "C:\Users\Ayush Mathur\Desktop\Krishi-Kisan-AI - Copy\Backend"
npm run dev
```

**Success message दिखना चाहिए:**
```
MongoDB connected
Server running on http://localhost:5000
```

### Step 3: Frontend Start करें

नई PowerShell window में:

```powershell
cd "C:\Users\Ayush Mathur\Desktop\Krishi-Kisan-AI - Copy\Frontend"
npm run dev
```

### Step 4: Browser में Application खोलें

Browser में जाएं: `http://localhost:5173`

### Step 5: Profile Save करें - Data Automatic Create होगा!

1. **Profile page** पर जाएं (navigation menu से)
2. **"Edit Profile"** button click करें
3. अपना data fill करें:
   - Name
   - Phone
   - Email
   - Location
4. **"Save"** button click करें

### Step 6: MongoDB Compass में Check करें

1. MongoDB Compass में `krishi_kisan` database पर click करें
2. `users` collection पर click करें
3. **Refresh button** click करें (🔄 icon)
4. आपको अपना profile data दिखना चाहिए! 🎉

---

## Method 2: MongoDB Compass में Manual Entry

### Option A: Add Data Button से

1. `users` collection select करें
2. **"ADD DATA"** button click करें
3. **"Insert Document"** choose करें
4. JSON format में data paste करें:

```json
{
  "userId": "507f1f77bcf86cd799439011",
  "name": "Krishi Sakhi User",
  "phone": "+91-XXXXXXXXXX",
  "email": "user@example.com",
  "location": "Jaipur (Rajasthan), India",
  "language": "en",
  "theme": "light"
}
```

5. **"Insert"** click करें

### Option B: Import Data से

1. `users` collection select करें
2. **"Import data"** button click करें (empty state में दिखता है)
3. JSON file choose करें
4. Import करें

---

## Quick Test - Data Create करने के लिए

### Step 1: Verify Connection

PowerShell में Backend folder में:
```powershell
npm run dev
```

आपको यह दिखना चाहिए:
```
✅ MongoDB connected
Server running on http://localhost:5000
```

### Step 2: Profile Save करें

1. Browser में `http://localhost:5173` खोलें
2. Profile page पर जाएं
3. Edit करें और Save करें

### Step 3: Check MongoDB Compass

1. Compass में refresh करें
2. `users` collection में data दिखना चाहिए

---

## Troubleshooting - अगर Data नहीं दिख रहा

### Problem 1: "MongoDB connected" message नहीं दिख रहा

**Solution:**
- Check करें `.env` file में `MONGODB_URI` सही है
- MongoDB service running है या नहीं check करें
- Connection string: `mongodb://localhost:27017/krishi_kisan`

### Problem 2: Data Save नहीं हो रहा

**Check करें:**
- Backend server running है?
- Browser console में कोई error है?
- Network tab में API request successful है?

### Problem 3: Compass में Data नहीं दिख रहा

**Solution:**
1. Refresh button click करें
2. Collection को close करके फिर से open करें
3. Verify करें database name सही है

---

## Expected Data Format

जब आप Profile save करेंगे, तो `users` collection में यह format में data दिखेगा:

```json
{
  "_id": ObjectId("..."),
  "userId": "507f1f77bcf86cd799439011",
  "name": "आपका नाम",
  "phone": "+91-XXXXXXXXXX",
  "email": "your@email.com",
  "location": "आपका location",
  "language": "en",
  "theme": "light",
  "documents": {
    "landRecords": [],
    "aadhaarCard": {}
  },
  "createdAt": ISODate("2024-..."),
  "updatedAt": ISODate("2024-...")
}
```

---

## Next Steps

एक बार data create हो जाने के बाद:

1. ✅ Chatbot में message भेजें - Chat history automatically save होगी
2. ✅ Profile update करें - Data automatically update होगा
3. ✅ Compass में real-time देख सकते हैं data changes

---

## Quick Reference Commands

```powershell
# Backend start
cd Backend
npm run dev

# Frontend start (new terminal)
cd Frontend
npm run dev

# Browser
http://localhost:5173
```

---

**सबसे आसान तरीका:** Application use करें - Profile save करें, data automatically create हो जाएगा! 🚀

