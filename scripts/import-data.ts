import fs from 'fs';
import path from 'path';
import { connectToDatabase } from '../src/lib/mongodb';
import Personality from '../src/lib/models/Personality';
import TestQuestion from '../src/lib/models/TestQuestion';

const personalityTypes = [
  'ENFJ', 'ENFP', 'ENTJ', 'ENTP', 'ESFJ', 'ESFP', 'ESTJ', 'ESTP',
  'INFJ', 'INFP', 'INTJ', 'INTP', 'ISFJ', 'ISFP', 'ISTJ', 'ISTP'
];

const languages = ['zh', 'en', 'de', 'es', 'fr', 'pt', 'ru'];

const languageNames: { [key: string]: string } = {
  'zh': '中文',
  'en': 'English',
  'de': 'Deutsch',
  'es': 'Español',
  'fr': 'Français',
  'pt': 'Português',
  'ru': 'Русский'
};

function extractTitleFromMarkdown(content: string, type: string): string {
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.startsWith('# ')) {
      return line.replace('# ', '').trim();
    }
  }
  return `${type} Personality Type`;
}

function extractRoleFromMarkdown(content: string): string {
  const lines = content.split('\n');
  for (const line of lines) {
    // 匹配类似 "## 给予者" 或 "## The Giver" 这样的模式
    const match = line.match(/^###\s+(.+)$/);
    if (match) {
      return match[1].trim();
    }
  }
  return '';
}

function extractDescriptionFromMarkdown(content: string): string {
  const lines = content.split('\n');

  for (const line of lines) {
    // 匹配类似 "## 给予者" 或 "## The Giver" 这样的模式
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      return match[1].trim();
    }
  }
  return '';
}

function parseTestQuestions(content: string): Array<{ id: number, text: string, optionA: string, optionB: string, column: number }> {
  const lines = content.split('\n');
  const questions = [];
  let currentQuestion: any = null;
  let questionId = 1;

  // 正确的列分组映射 (根据scoring.png)
  // 每列10道题，共70题
  const columnMap: { [key: string]: number } = {
    // E/I维度: Col1 (1-10), Col2 (11-20)
    '1': 1, '2': 1, '3': 1, '4': 1, '5': 1, '6': 1, '7': 1, '8': 1, '9': 1, '10': 1,
    '11': 2, '12': 2, '13': 2, '14': 2, '15': 2, '16': 2, '17': 2, '18': 2, '19': 2, '20': 2,
    // S/N维度: Col3 (21-30), Col4 (31-40) 
    '21': 3, '22': 3, '23': 3, '24': 3, '25': 3, '26': 3, '27': 3, '28': 3, '29': 3, '30': 3,
    '31': 4, '32': 4, '33': 4, '34': 4, '35': 4, '36': 4, '37': 4, '38': 4, '39': 4, '40': 4,
    // T/F维度: Col5 (41-50), Col6 (51-60)
    '41': 5, '42': 5, '43': 5, '44': 5, '45': 5, '46': 5, '47': 5, '48': 5, '49': 5, '50': 5,
    '51': 6, '52': 6, '53': 6, '54': 6, '55': 6, '56': 6, '57': 6, '58': 6, '59': 6, '60': 6,
    // J/P维度: Col7 (61-70)
    '61': 7, '62': 7, '63': 7, '64': 7, '65': 7, '66': 7, '67': 7, '68': 7, '69': 7, '70': 7
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    // 匹配问题编号和问题文本
    const questionMatch = trimmedLine.match(/^(\d+)\.\s+(.+)/);
    if (questionMatch) {
      questionId = parseInt(questionMatch[1]);
      currentQuestion = {
        id: questionId,
        text: questionMatch[2].replace(/\*\*/g, '').trim(),
        optionA: '',
        optionB: '',
        column: columnMap[questionId.toString()] || 1
      };
      continue;
    }

    // 匹配选项 (支持多种格式)
    if (currentQuestion) {
      const optionAMatch = trimmedLine.match(/^[aA]\.\s*(.+)/) ||
        trimmedLine.match(/^\s+a\.\s*(.+)/) ||
        trimmedLine.match(/^\s+a\)\s*(.+)/);

      const optionBMatch = trimmedLine.match(/^[bB]\.\s*(.+)/) ||
        trimmedLine.match(/^\s+b\.\s*(.+)/) ||
        trimmedLine.match(/^\s+b\)\s*(.+)/);

      if (optionAMatch) {
        currentQuestion.optionA = optionAMatch[1].trim();
      } else if (optionBMatch) {
        currentQuestion.optionB = optionBMatch[1].trim();
        // 当找到B选项时，完成当前问题
        questions.push(currentQuestion);
        currentQuestion = null;
      }
    }
  }

  return questions;
}

async function importTestQuestions() {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB for test questions import');

    // 清除现有测试问题数据
    await TestQuestion.deleteMany({});
    console.log('Cleared existing test questions');

    for (const lang of languages) {
      const fileName = `MBTI_TEST_${lang}.md`;
      const filePath = path.join(process.cwd(), fileName);

      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const questions = parseTestQuestions(content);

        console.log(questions);

        for (const question of questions) {
          try {
            await TestQuestion.findOneAndUpdate(
              { id: question.id, language: lang },
              {
                id: question.id,
                language: lang,
                text: question.text,
                optionA: question.optionA,
                optionB: question.optionB,
                column: question.column
              },
              { upsert: true, new: true }
            );
          } catch (error) {
            console.warn(`⚠️  Failed to import question ${question.id} for ${languageNames[lang]}:`, error);
          }
        }

        console.log(`✅ Imported ${questions.length} test questions for ${languageNames[lang]}`);
      } else {
        console.warn(`⚠️  Test file not found: ${fileName}`);
      }
    }

    console.log('\n🎉 Test questions import completed successfully!');

    const count = await TestQuestion.countDocuments();
    console.log(`📊 Total test questions in database: ${count}`);

  } catch (error) {
    console.error('❌ Test questions import failed:', error);
    process.exit(1);
  }
}

async function importPersonalities() {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB');

    for (const type of personalityTypes) {
      for (const lang of languages) {
        const fileName = `${type}_${lang}.md`;
        const filePath = path.join(process.cwd(), fileName);

        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          const title = extractTitleFromMarkdown(content, type);
          const description = extractDescriptionFromMarkdown(content);

          const role = extractRoleFromMarkdown(content);
          await Personality.findOneAndUpdate(
            { type, language: lang },
            {
              type,
              role,
              language: lang,
              markdown: content,
              title,
              description
            },
            { upsert: true, new: true }
          );

          console.log(`✅ Imported ${fileName}`);
        } else {
          console.warn(`⚠️  File not found: ${fileName}`);
        }
      }
    }

    console.log('\n🎉 Import completed successfully!');

    const count = await Personality.countDocuments();
    console.log(`📊 Total documents in database: ${count}`);

  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

async function main() {
  console.log('🚀 Starting data import process...\n');

  // 导入人格类型数据
  console.log('📚 Importing personalities...');
  await importPersonalities();

  console.log('\n' + '='.repeat(50) + '\n');

  // 导入测试问题数据
  console.log('📝 Importing test questions...');
  await importTestQuestions();

  console.log('\n🎉 All data import completed successfully!');
}

main();