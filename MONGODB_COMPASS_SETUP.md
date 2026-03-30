# MongoDB Compass Setup Guide - Step by Step

## Prerequisites
✅ MongoDB installed on your computer  
✅ MongoDB Compass installed  
✅ This application backend ready

---

## Step 1: Start MongoDB Service

### Windows:
1. **Check if MongoDB is running:**
   - Press `Win + R`, type `services.msc`, press Enter
   - Look for "MongoDB" service
   - If status shows "Running", you're good! ✅
   - If it shows "Stopped", right-click → "Start"

2. **Or start MongoDB manually:**
   - Open Command Prompt or PowerShell as Administrator
   - Run: `net start MongoDB`

### Mac:
```bash
brew services start mongodb-community
```

### Linux:
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

---

## Step 2: Open MongoDB Compass

1. **Launch MongoDB Compass** from your applications
2. When it opens, you'll see the connection screen

---

## Step 3: Connect to Local MongoDB

### Option A: Use Default Connection (Recommended)
1. On the MongoDB Compass welcome screen, click **"Connect"** or **"New Connection"**
2. In the connection string field, you'll see:
   ```
   mongodb://localhost:27017
   ```
3. Click **"Connect"** button
4. ✅ If connection succeeds, you'll see your databases!

### Option B: Manual Connection String
1. Click **"Fill in connection fields individually"**
2. Fill in:
   - **Hostname:** `localhost`
   - **Port:** `27017`
   - Leave Authentication empty (default local setup)
3. Click **"Connect"**

---

## Step 4: Create Your Database in Compass

1. **After connecting**, you'll see a list of existing databases
2. Click **"Create Database"** button (usually at the bottom or top)
3. Fill in:
   - **Database Name:** `krishi_kisan`
   - **Collection Name:** `users` (we'll create this first)
4. Click **"Create Database"**
5. ✅ Your database is created!

---

## Step 5: Verify Collections Will Be Created

Your application will automatically create these collections:
- ✅ `users` - Stores user profiles
- ✅ `chathistories` - Stores chat history

You can create these manually now OR let the app create them on first use.

### To Create Collections Manually:
1. Click on your `krishi_kisan` database
2. Click **"Create Collection"**
3. Collection Name: `users`
4. Click **"Create Collection"**
5. Repeat for `chathistories`

---

## Step 6: Configure Your Application

1. **Navigate to Backend folder** in your project
2. **Create `.env` file** (if it doesn't exist):

### Windows PowerShell:
```powershell
cd "C:\Users\Ayush Mathur\Desktop\Krishi-Kisan-AI - Copy\Backend"
copy example.env .env
```

### Mac/Linux:
```bash
cd Backend
cp example.env .env
```

3. **Open `.env` file** in a text editor
4. **Set your MongoDB URI:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/krishi_kisan
   CORS_ORIGIN=http://localhost:5173
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   **Important:** Make sure the database name matches: `krishi_kisan`

---

## Step 7: Test the Connection

### Method 1: Using Test Script (Recommended)

1. Open terminal/PowerShell in Backend folder:
   ```powershell
   cd "C:\Users\Ayush Mathur\Desktop\Krishi-Kisan-AI - Copy\Backend"
   ```

2. Run the test script:
   ```powershell
   npm run test-db
   ```

3. **Expected Output:**
   ```
   🔗 Attempting to connect to MongoDB...
   ✅ SUCCESS: Connected to MongoDB!
   📊 Database: krishi_kisan
   🔌 Host: localhost:27017
   ```

### Method 2: Start Your Server

1. In Backend folder:
   ```powershell
   npm run dev
   ```

2. **Look for this message:**
   ```
   MongoDB connected
   Server running on http://localhost:5000
   ```

3. If you see "MongoDB connected", you're all set! ✅

---

## Step 8: Verify Data Storage

### Test by Saving Profile:

1. **Start Frontend:**
   ```powershell
   cd Frontend
   npm run dev
   ```

2. **Open browser:** `http://localhost:5173`

3. **Go to Profile page** → Edit your profile → Click **Save**

4. **Check MongoDB Compass:**
   - Refresh Compass (click refresh icon)
   - Expand `krishi_kisan` database
   - Click on `users` collection
   - You should see your profile data! 📊

---

## Troubleshooting

### ❌ "ECONNREFUSED" Error

**Problem:** MongoDB service is not running

**Solution:**
1. Check Windows Services (Win + R → `services.msc`)
2. Find "MongoDB" service
3. Right-click → "Start"
4. Or run in Admin PowerShell: `net start MongoDB`

### ❌ "Cannot connect to MongoDB" in Compass

**Solution:**
1. Verify MongoDB service is running (Step 1)
2. Try connection string: `mongodb://127.0.0.1:27017`
3. Check if port 27017 is blocked by firewall

### ❌ "Database not found" Error

**Solution:**
1. In Compass, manually create the database `krishi_kisan`
2. Create collection `users` inside it
3. Retry the connection

### ❌ Test Script Shows Error

**Common Issues:**
- `.env` file missing → Create it (Step 6)
- Wrong connection string → Check MONGODB_URI in `.env`
- MongoDB not running → Start service (Step 1)
- Wrong database name → Use exactly `krishi_kisan`

---

## Visual Guide: MongoDB Compass Screenshots Location

### Where to Find in Compass:

1. **Connection Screen:**
   - Top left: Connection string input
   - Bottom: "Connect" button

2. **Database List:**
   - Left sidebar after connecting
   - Shows all databases

3. **Create Database:**
   - Click "+" or "Create Database" button
   - Usually at the top or bottom of database list

4. **Collections:**
   - Click on database name to expand
   - Shows all collections (tables)
   - Click collection to see documents (data)

5. **View Data:**
   - Click on a collection name
   - You'll see documents in JSON format
   - Each document is a record (like a user profile)

---

## Quick Reference Commands

### Start MongoDB Service:
```powershell
# Windows (Admin PowerShell)
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Test Connection:
```powershell
cd Backend
npm run test-db
```

### Start Backend Server:
```powershell
cd Backend
npm run dev
```

### Connection String:
```
mongodb://localhost:27017/krishi_kisan
```

---

## Next Steps After Connection Works

1. ✅ MongoDB Compass shows your database
2. ✅ Test script connects successfully
3. ✅ Backend server shows "MongoDB connected"
4. ✅ Save profile in frontend
5. ✅ See data appear in Compass!

**You're all set!** 🎉

Your data will now be stored in MongoDB and you can view/edit it in MongoDB Compass anytime!

