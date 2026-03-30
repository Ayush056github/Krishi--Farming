# MongoDB Connection Guide

## Quick Setup Steps

### Step 1: Create `.env` File in Backend Directory

Create a `.env` file in the `Backend` folder (copy from `example.env`):

**Windows:**
```powershell
cd Backend
copy example.env .env
```

**Mac/Linux:**
```bash
cd Backend
cp example.env .env
```

### Step 2: Configure MongoDB Connection String

Edit the `.env` file and set your `MONGODB_URI`. Choose one option below:

## Connection Options

### Option 1: Local MongoDB (Default)

If MongoDB is installed and running locally:

```env
MONGODB_URI=mongodb://localhost:27017/krishi_kisan
```

**To check if MongoDB is running locally:**
- Windows: Check Services or run `mongod` in terminal
- Mac: `brew services list` (if installed via Homebrew)
- Linux: `sudo systemctl status mongod`

### Option 2: MongoDB Atlas (Cloud - Recommended for Production)

If using MongoDB Atlas (free cloud database):

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier available)
3. Get your connection string from Atlas dashboard
4. It looks like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/krishi_kisan?retryWrites=true&w=majority
   ```
5. Replace `username` and `password` with your Atlas credentials
6. Add to `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/krishi_kisan?retryWrites=true&w=majority
   ```

### Option 3: MongoDB with Authentication

If your local MongoDB has username/password:

```env
MONGODB_URI=mongodb://username:password@localhost:27017/krishi_kisan
```

### Option 4: Custom MongoDB Instance

If MongoDB is on a different host/port:

```env
MONGODB_URI=mongodb://hostname:port/database_name
```

## Complete `.env` File Example

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/krishi_kisan
CORS_ORIGIN=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key_here
```

**Note:** Replace `your_gemini_api_key_here` with your actual API key if you're using Gemini.

## Step 3: Start MongoDB

### Local MongoDB Installation

**Windows:**
1. Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Install MongoDB Community Server
3. MongoDB usually runs as a Windows Service automatically
4. Or run manually: `mongod` in terminal

**Mac:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Verify MongoDB is Running

**Check connection:**
```bash
# Windows/Mac/Linux
mongosh
# Or older versions
mongo
```

If you see MongoDB shell prompt, it's running!

## Step 4: Test Your Connection

1. **Start your backend server:**
   ```bash
   cd Backend
   npm run dev
   ```

2. **Look for success message:**
   ```
   MongoDB connected
   Server running on http://localhost:5000
   ```

3. **If you see errors**, check troubleshooting section below.

## Troubleshooting

### Error: "Missing MongoDB URI"

**Problem:** `.env` file not found or `MONGODB_URI` not set.

**Solution:**
- Make sure `.env` file exists in `Backend` folder
- Verify `MONGODB_URI` is in the file
- Check for typos in variable name

### Error: "ECONNREFUSED" or "Connection refused"

**Problem:** MongoDB is not running or wrong host/port.

**Solutions:**
1. **Check MongoDB is running:**
   - Windows: Open Services, find "MongoDB"
   - Mac/Linux: `ps aux | grep mongod`

2. **Start MongoDB:**
   - Windows: `net start MongoDB` (in Admin PowerShell)
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

3. **Verify port:** Default MongoDB port is `27017`

### Error: "Authentication failed"

**Problem:** Wrong username/password or database permissions.

**Solutions:**
1. Check credentials in connection string
2. If using Atlas, verify username/password in Atlas dashboard
3. Check IP whitelist (Atlas requires your IP to be whitelisted)

### Error: "Timeout"

**Problem:** MongoDB server is too slow or unreachable.

**Solutions:**
1. Check internet connection (if using Atlas)
2. Increase timeout in `db.js` if needed
3. Verify firewall isn't blocking connection

### Error: "Database name contains invalid characters"

**Problem:** Database name in URI has special characters.

**Solution:** Use simple database name like `krishi_kisan` (lowercase, underscores only)

## MongoDB Atlas Setup (Step-by-Step)

### 1. Create Atlas Account
- Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Sign up (free tier available)

### 2. Create Cluster
- Click "Build a Database"
- Choose FREE tier (M0)
- Select cloud provider and region (closest to you)
- Click "Create Cluster"

### 3. Create Database User
- Go to "Database Access" → "Add New Database User"
- Choose "Password" authentication
- Set username and strong password
- Save credentials!

### 4. Whitelist Your IP
- Go to "Network Access" → "Add IP Address"
- Click "Allow Access from Anywhere" (for development)
- Or add your specific IP address

### 5. Get Connection String
- Go to "Database" → "Connect"
- Choose "Connect your application"
- Copy the connection string
- Replace `<password>` with your database user password
- Replace `<dbname>` with `krishi_kisan`

Example:
```
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/krishi_kisan?retryWrites=true&w=majority
```

### 6. Add to `.env`
```env
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/krishi_kisan?retryWrites=true&w=majority
```

## Verification Checklist

- [ ] `.env` file created in `Backend` folder
- [ ] `MONGODB_URI` is set correctly
- [ ] MongoDB is running (local) or Atlas cluster is active
- [ ] Backend server starts without errors
- [ ] See "MongoDB connected" message in console
- [ ] Can save profile in frontend
- [ ] Data appears in MongoDB database

## Need Help?

1. Check backend console for specific error messages
2. Verify MongoDB connection using `mongosh` or MongoDB Compass
3. Test connection string directly
4. Check network/firewall settings

