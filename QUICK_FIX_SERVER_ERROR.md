# Quick Fix: "Failed to sync with server" Error

## Problem
आपको error दिख रहा है: "Profile saved locally. Failed to sync with server: Failed to fetch"

**इसका मतलब:** Backend server running नहीं है या frontend उसे connect नहीं कर पा रहा है।

---

## Solution: Backend Server Start करें

### Step 1: Backend Server Start करें

PowerShell में Backend folder में जाएं और server start करें:

```powershell
cd "C:\Users\Ayush Mathur\Desktop\Krishi-Kisan-AI - Copy\Backend"
npm run dev
```

**आपको यह messages दिखने चाहिए:**
```
MongoDB connected
Server running on http://localhost:5000
```

### Step 2: Verify करें Server Running है

1. Browser में यह URL खोलें: `http://localhost:5000/api/health`
2. अगर response मिलता है तो server running है ✅

### Step 3: Frontend में फिर से Try करें

1. Profile page पर जाएं
2. Edit करें
3. Save करें
4. अब error नहीं आना चाहिए! ✅

---

## Complete Setup Commands

### Terminal 1 - Backend:
```powershell
cd "C:\Users\Ayush Mathur\Desktop\Krishi-Kisan-AI - Copy\Backend"
npm run dev
```

### Terminal 2 - Frontend:
```powershell
cd "C:\Users\Ayush Mathur\Desktop\Krishi-Kisan-AI - Copy\Frontend"
npm run dev
```

### Browser:
- `http://localhost:5173` खोलें
- Profile page → Edit → Save करें

---

## Common Issues

### Issue 1: "MongoDB connected" message नहीं दिख रहा

**Solution:**
1. MongoDB service check करें (Services में)
2. `.env` file में `MONGODB_URI` verify करें
3. MongoDB Compass से connect test करें

### Issue 2: Port 5000 already in use

**Solution:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Issue 3: Still getting "Failed to fetch"

**Solution:**
1. Backend server console check करें - कोई error है?
2. Browser console (F12) check करें - detailed error देखें
3. Verify CORS settings in backend

---

## Checklist

- [ ] Backend server running (`npm run dev` in Backend folder)
- [ ] "MongoDB connected" message दिख रहा है
- [ ] Server `http://localhost:5000` पर accessible है
- [ ] Frontend running (`npm run dev` in Frontend folder)
- [ ] Browser में `http://localhost:5173` खुला है
- [ ] Profile save करने पर error नहीं आ रहा

---

## Expected Behavior

जब सब कुछ सही हो:
1. ✅ Profile Save करने पर error नहीं आना चाहिए
2. ✅ Data MongoDB में save होना चाहिए
3. ✅ MongoDB Compass में data दिखना चाहिए
4. ✅ Success message मिलना चाहिए

---

**Important:** Backend और Frontend दोनों simultaneously चलने चाहिए!


