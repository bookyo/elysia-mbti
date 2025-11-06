# MBTI Personality Test with AI Advice

A comprehensive MBTI personality test application featuring multilingual support, AI-powered personalized advice, and complete privacy protection.

## 🌟 Features

### Core Functionality

- **Free MBTI Personality Test**: 70-question assessment based on Myers-Briggs Type Indicator
- **16 Personality Types**: Detailed descriptions and insights for all MBTI types
- **AI-Powered Advice**: Get personalized career, relationship, and personal development recommendations
- **Complete Privacy**: No data collection, registration, or personal information storage

### Multilingual Support

Available in 7 languages:

- 🇺🇸 English
- 🇨🇳 简体中文
- 🇩🇪 Deutsch
- 🇪🇸 Español
- 🇫🇷 Français
- 🇵🇹 Português
- 🇷🇺 Русский

### Technical Features

- **Modern UI**: Responsive design with Tailwind CSS
- **SEO Optimized**: Multilingual metadata and search engine friendly
- **Progressive Web App**: Optimized for all devices
- **Real-time AI**: Streaming responses for personalized advice
- **Markdown Rendering**: Beautiful content display with Typography v4

## 🚀 Live Demo

Visit our live application: **[https://mbti.elysiatools.com](https://mbti.elysiatools.com)**

## 📋 Prerequisites

- Node.js 18+
- MongoDB database
- OpenRouter API key (for AI advice feature)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mbti-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment variables**
   Copy `.env.local.example` to `.env.local` and configure:

   ```env
   # MongoDB
   MONGODB_URI=mongodb://localhost:27017/mbti-test

   # OpenRouter API (optional, for AI advice)
   OPENROUTER_API_KEY=your_openrouter_api_key

   # Site configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Database setup**

   ```bash
   # Import personality data and test questions
   npm run import-data
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to view the application.

## 📊 Database Structure

### Personalities Collection

```typescript
{
  type: "ENFJ" | "ENFP" | "ENTJ" | "ENTP" | "ESFJ" | "ESFP" | "ESTJ" | "ESTP" |
        "INFJ" | "INFP" | "INTJ" | "INTP" | "ISFJ" | "ISFP" | "ISTJ" | "ISTP",
  language: "zh" | "en" | "de" | "es" | "fr" | "pt" | "ru",
  title: string,
  description: string,
  role: string,
  markdown: string
}
```

### Test Questions Collection

```typescript
{
  id: number,           // 1-70
  language: string,     // 7 languages
  text: string,         // Question text
  optionA: string,      // Option A text
  optionB: string,      // Option B text
  column: number        // 1-7, for scoring
}
```

## 🎯 MBTI Scoring System

The application uses standard MBTI Form M scoring rules:

### Dimensions

- **E/I** (Extraversion/Introversion)
- **S/N** (Sensing/Intuition)
- **T/F** (Thinking/Feeling)
- **J/P** (Judging/Perceiving)

### Calculation

Each question is mapped to specific personality traits based on established MBTI patterns. The scoring algorithm analyzes responses across 70 questions to determine the most suitable personality type.

## 🔧 API Endpoints

### Personalities

- `GET /api/personalities` - Get all personality types
- `GET /api/personality/[type]` - Get specific personality details

### Test Questions

- `GET /api/test-questions` - Get all test questions
- `POST /api/test-questions/calculate` - Calculate MBTI type from answers

### AI Advice

- `POST /api/ai/advice` - Get personalized AI advice (streaming)

## 🌍 Internationalization

The application supports 7 languages with complete translation files:

- `messages/en.json` - English
- `messages/zh.json` - 简体中文
- `messages/de.json` - Deutsch
- `messages/es.json` - Español
- `messages/fr.json` - Français
- `messages/pt.json` - Português
- `messages/ru.json` - Русский

### Adding New Languages

1. Create translation file in `messages/` directory
2. Update language options in components
3. Import corresponding personality data
4. Update SEO metadata in page components

## 🎨 Design System

### Color Palette

Each personality type has a unique gradient color scheme for visual distinction.

### Typography

Uses Tailwind CSS Typography v4 for optimal content readability and markdown rendering.

### Responsive Design

- Mobile-first approach
- Tailwind CSS breakpoints
- Optimized for all screen sizes

## 🔒 Privacy & Security

### Privacy Commitment

- **No Data Collection**: We don't collect any personal information
- **No Registration**: Use the test anonymously
- **Local Processing**: Test responses processed in browser only
- **No Cookies**: No tracking or persistent storage
- **Complete Anonymity**: Your results are private

### Data Handling

- Test responses processed locally in browser
- AI advice requests are anonymous
- No personal data stored in databases
- GDPR compliant design

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

### Docker

```bash
docker build -t mbti-test .
docker run -p 3000:3000 mbti-test
```

### Environment Variables for Production

```env
MONGODB_URI=mongodb+srv://...
OPENROUTER_API_KEY=sk-or-v1-...
NEXT_PUBLIC_SITE_URL=https://mbti.elysiatools.com
```

## 📈 Performance Optimizations

- **Static Generation**: Server-side rendering with static pages
- **Image Optimization**: Next.js Image component usage
- **Code Splitting**: Automatic bundle optimization
- **SEO Optimization**: Comprehensive meta tags and structured data
- **CDN Ready**: Optimized for content delivery networks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support:

- Email: [admin@elysiatools.com](mailto:admin@elysiatools.com)
- Website: [https://mbti.elysiatools.com](https://mbti.elysiatools.com)

## 🔮 Future Roadmap

- [ ] More personality frameworks (Big Five, Enneagram)
- [ ] Team compatibility analysis
- [ ] Career path recommendations
- [ ] Relationship compatibility tests
- [ ] Mobile applications
- [ ] Advanced AI insights

## 🙏 Acknowledgments

- MBTI framework based on Myers-Briggs Type Indicator
- AI powered by OpenRouter and advanced language models
- Built with Next.js, MongoDB, and Tailwind CSS
- Inspired by personality psychology and human development

---

**Take the test now**: [https://mbti.elysiatools.com](https://mbti.elysiatools.com) ✨
**elysiatools**: [https://elysiatools.com](https://elysiatools.com)
