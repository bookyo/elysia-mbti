import mongoose from 'mongoose';

const TestQuestionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ['zh', 'en', 'de', 'es', 'fr', 'pt', 'ru']
  },
  text: {
    type: String,
    required: true
  },
  optionA: {
    type: String,
    required: true
  },
  optionB: {
    type: String,
    required: true
  },
  column: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5, 6, 7]
  }
}, {
  timestamps: true
});

TestQuestionSchema.index({ id: 1, language: 1 }, { unique: true });

export default mongoose.models.TestQuestion || mongoose.model('TestQuestion', TestQuestionSchema);