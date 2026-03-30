# Smart Engine Setup Guide

## ✅ What's Been Implemented

Your **Smart Engine** page now has:
- 🖼️ **Image Upload**: Drag & drop or click to upload crop/plant images
- 🤖 **AI Analysis**: Powered by OpenAI's GPT-4 Vision API
- 📊 **Detailed Reports**: Disease detection, pest identification, treatment recommendations
- 🌾 **Kerala-Specific Advice**: Tailored for Indian farming conditions
- 💬 **Custom Prompts**: Optional specific questions for targeted analysis

---

## 🚀 Setup Instructions

### Step 1: Update Your `.env` File

Open `server/.env` and add your OpenAI API key:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/krishi_kisan
CORS_ORIGIN=http://localhost:5173
OPENAI_API_KEY=your-openai-api-key-here
```

### Step 2: Restart the Backend Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
cd server
npm run dev
```

You should see:
```
MongoDB connected
Server running on http://localhost:5000
```

### Step 3: Test the Smart Engine

1. Navigate to **Smart Engine** page in your app
2. Upload an image of a crop, plant, disease, or pest
3. (Optional) Add a custom prompt like:
   - "What disease is this?"
   - "Identify the pest and suggest treatment"
   - "Check for nutrient deficiency"
4. Click **"🚀 Analyze Image"**
5. Get instant AI-powered analysis!

---

## 📋 Features

### What the AI Analyzes:

1. **Identification**: Crop type, disease, pest, or issue
2. **Detailed Analysis**: Visual symptoms and observations
3. **Symptoms**: List of visible problems
4. **Causes**: Root causes of the issue
5. **Kerala-Specific Factors**: Climate considerations (humidity, monsoon, etc.)
6. **Recommendations**: Actionable advice for farmers
7. **Treatment**: Organic and chemical treatment options
8. **Prevention**: Future prevention strategies

### Supported Images:
- JPG, JPEG, PNG
- Max size: 10MB (recommended: under 5MB for faster processing)
- Clear, well-lit images work best

---

## 🔧 API Endpoints

### POST `/api/analyze-image`

**Request:**
```json
{
  "image": "data:image/jpeg;base64,...",
  "prompt": "Optional custom analysis request"
}
```

**Response:**
```json
{
  "analysis": "Detailed AI-generated analysis...",
  "timestamp": "2025-10-12T08:00:00.000Z"
}
```

---

## 💡 Usage Tips

1. **Best Image Quality**: Use clear, focused images in good lighting
2. **Close-ups**: Capture affected areas up close for better analysis
3. **Multiple Angles**: Upload different angles if first analysis isn't clear
4. **Custom Prompts**: Be specific about what you want to know
5. **Context**: Mention location, season, or recent weather in custom prompts

---

## 🐛 Troubleshooting

### Error: "API key not configured"
- Check that `OPENAI_API_KEY` is set in `server/.env`
- Restart the server after adding the key

### Error: "Failed to analyze image"
- Check your internet connection
- Verify the OpenAI API key is valid
- Check if you have API credits remaining

### Image Upload Not Working
- Ensure image is under 10MB
- Use supported formats: JPG, PNG, JPEG
- Check browser console for errors

### Server Not Responding
- Verify server is running on port 5000
- Check for CORS errors in browser console
- Ensure MongoDB is connected

---

## 💰 Cost Considerations

- **Model Used**: `gpt-4o-mini` (cost-effective vision model)
- **Approximate Cost**: ~$0.01-0.02 per image analysis
- **Tokens**: Max 1500 tokens per response

For production, consider:
- Adding rate limiting
- Implementing user authentication
- Caching common analyses
- Using a cheaper model for simple queries

---

## 🎯 Next Steps

Consider adding:
- [ ] Image history/gallery
- [ ] Save analysis results to database
- [ ] PDF export of analysis reports
- [ ] Comparison of multiple images
- [ ] Voice input for custom prompts
- [ ] Multi-language support (Hindi, Malayalam, Tamil, etc.)

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check server terminal for error logs
3. Verify all environment variables are set
4. Ensure OpenAI API key has sufficient credits
