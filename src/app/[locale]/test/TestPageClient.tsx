'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

interface TestQuestion {
  id: number;
  language: string;
  text: string;
  optionA: string;
  optionB: string;
  column: number;
}

interface TestPageClientProps {
  locale: string;
}

export default function TestPageClient({ locale }: TestPageClientProps) {
  const t = useTranslations();
  const currentLocale = useLocale();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: 'a' | 'b' }>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取测试问题
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/${locale}/api/api/test-questions?language=${locale}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && data.data) {
          setQuestions(data.data);
          console.log(`✅ Loaded ${data.data.length} test questions for locale: ${locale}`);
        } else {
          setError('Failed to load test questions');
        }
      } catch (err) {
        console.error('Error fetching test questions:', err);
        setError(err instanceof Error ? err.message : 'Failed to load test questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [locale]);

  // 语言切换时重置答题状态
  useEffect(() => {
    // 重置所有状态
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult('');
  }, [currentLocale]);

  const handleAnswer = async (answer: 'a' | 'b') => {
    const newAnswers = { ...answers, [currentQuestion + 1]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 答题完毕，调用API计算MBTI类型
      try {
        setLoading(true);
        
        const response = await fetch(`/${locale}/api/api/test-questions/calculate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answers: newAnswers,
            language: locale
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && data.result) {
          setResult(data.result);
          setShowResult(true);
          console.log(`✅ Calculated MBTI result: ${data.result}`);
        } else {
          setError('Failed to calculate result');
        }
      } catch (err) {
        console.error('Error calculating MBTI result:', err);
        setError(err instanceof Error ? err.message : 'Failed to calculate result');
      } finally {
        setLoading(false);
      }
    }
  };

  const goToQuestion = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult('');
  };

  // 加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('common.loading', { defaultValue: 'Loading test questions...' })}
          </h2>
          <p className="text-gray-600">
            {error ? t('common.error', { defaultValue: 'Error' }) : t('test.loadingQuestions', { defaultValue: 'Please wait while we prepare your test...' })}
          </p>
          {error && (
            <div className="mt-6">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300"
              >
                {t('common.retry', { defaultValue: 'Retry' })}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 错误状态
  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {t('common.error', { defaultValue: 'Error' })}
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
            >
              {t('common.retry', { defaultValue: 'Retry' })}
            </button>
            <Link
              href="/"
              className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-full transition duration-300"
            >
              {t('nav.home', { defaultValue: 'Back to Home' })}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-blue-600 mb-4">{result}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t('result.title')} {result}
            </h2>
            <p className="text-gray-600">{t('result.subtitle')}</p>
          </div>

          <div className="space-y-4">
            <Link
              href={`/personality/${result}`}
              className="block bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-semibold py-3 px-6 rounded-full transition duration-300"
            >
              {t('result.viewFullProfile')}
            </Link>
            <button
              onClick={restartTest}
              className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-full transition duration-300"
            >
              {t('result.retakeTest')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-700">
                {t('test.question')} {currentQuestion + 1} {t('test.of')} {questions.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {question?.text || ''}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer('a')}
                className="p-6 bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-300 text-left"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                    A
                  </div>
                  <p className="text-gray-800 font-medium">
                    {question?.optionA || ''}
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleAnswer('b')}
                className="p-6 bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-300 text-left"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                    B
                  </div>
                  <p className="text-gray-800 font-medium">
                    {question?.optionB || ''}
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 font-semibold rounded-full transition duration-300"
            >
              {t('test.previous')}
            </button>

            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 font-medium transition duration-300"
            >
              Cancel
            </Link>
          </div>

          {/* Question Overview */}
          <div className="mt-8 grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${index === currentQuestion
                  ? 'bg-blue-600 text-white'
                  : answers[index + 1]
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}