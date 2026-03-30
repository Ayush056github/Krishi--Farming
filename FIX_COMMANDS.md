# Commands to Fix MongoDB Error

## Step 1: Backend Folder में जाएं

```powershell
cd "C:\Users\Ayush Mathur\Desktop\Krishi-Kisan-AI - Copy\Backend"
```

## Step 2: node_modules और package-lock.json Delete करें

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
```

## Step 3: npm Cache Clear करें

```powershell
npm cache clean --force
```

## Step 4: Dependencies फिर से Install करें

```powershell
npm install
```

## Step 5: Server Start करें

```powershell
npm run dev
```

---

## All Commands एक साथ (Copy-Paste करें):

```powershell
cd "C:\Users\Ayush Mathur\Desktop\Krishi-Kisan-AI - Copy\Backend"
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force
npm install
npm run dev
```

---

## Expected Output:

आपको यह दिखना चाहिए:

```
✅ MongoDB connected
✅ Server running on http://localhost:5000
```

---

## अगर अभी भी Error आ रहा है:

MongoDB version को downgrade करें:

```powershell
npm install mongoose@8.0.0 mongodb@6.0.0
npm run dev
```


