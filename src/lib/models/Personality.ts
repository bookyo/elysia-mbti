import mongoose from 'mongoose';

const PersonalitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['ENFJ', 'ENFP', 'ENTJ', 'ENTP', 'ESFJ', 'ESFP', 'ESTJ', 'ESTP', 'INFJ', 'INFP', 'INTJ', 'INTP', 'ISFJ', 'ISFP', 'ISTJ', 'ISTP']
  },
  role: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    enum: ['zh', 'en', 'de', 'es', 'fr', 'pt', 'ru']
  },
  markdown: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

PersonalitySchema.index({ type: 1, language: 1 }, { unique: true });

export default mongoose.models.Personality || mongoose.model('Personality', PersonalitySchema);