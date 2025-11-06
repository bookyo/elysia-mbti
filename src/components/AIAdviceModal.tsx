'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AIAdviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalityType: string;
  locale: string;
}

interface UserInfo {
  age: string;
  gender: string;
  occupation: string;
  interests: string;
  goals: string;
}

export default function AIAdviceModal({ isOpen, onClose, personalityType, locale }: AIAdviceModalProps) {
  const t = useTranslations();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    age: '',
    gender: '',
    occupation: '',
    interests: '',
    goals: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowResult(true);
    setStreamingText('');
    setAdvice('');

    try {
      const response = await fetch(`/${locale}/api/ai/advice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalityType,
          locale,
          userInfo
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get advice');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let result = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                setAdvice(result);
                setIsLoading(false);
                return;
              }
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  result += parsed.content;
                  setStreamingText(result);
                }
              } catch (e) {
                // Ignore parsing errors
              }
            }
          }
        }
        setAdvice(result);
      }
    } catch (error) {
      console.error('Error getting advice:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowResult(false);
    setStreamingText('');
    setAdvice('');
    setIsLoading(false);
    onClose();
  };

  const handleBack = () => {
    setShowResult(false);
    setStreamingText('');
    setAdvice('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('ai.advice.title', { defaultValue: 'AI Personalized Advice' })}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {!showResult && (
            <p className="text-gray-600 mt-2">
              {t('ai.advice.subtitle', { defaultValue: 'Get personalized advice based on your MBTI type and personal information' })}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {!showResult ? (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('ai.advice.age', { defaultValue: 'Age' })}
                  </label>
                  <input
                    type="number"
                    value={userInfo.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600 text-gray-900 bg-white"
                    placeholder={t('ai.advice.agePlaceholder', { defaultValue: 'Enter your age' })}
                    min="1"
                    max="120"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('ai.advice.gender', { defaultValue: 'Gender' })}
                  </label>
                  <select
                    value={userInfo.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  >
                    <option value="" className="text-gray-500">{t('ai.advice.selectGender', { defaultValue: 'Select gender' })}</option>
                    <option value="male">{t('ai.advice.male', { defaultValue: 'Male' })}</option>
                    <option value="female">{t('ai.advice.female', { defaultValue: 'Female' })}</option>
                    <option value="other">{t('ai.advice.other', { defaultValue: 'Other' })}</option>
                    <option value="prefer-not-to-say">{t('ai.advice.preferNotToSay', { defaultValue: 'Prefer not to say' })}</option>
                  </select>
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('ai.advice.occupation', { defaultValue: 'Occupation' })}
                  </label>
                  <input
                    type="text"
                    value={userInfo.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600 text-gray-900 bg-white"
                    placeholder={t('ai.advice.occupationPlaceholder', { defaultValue: 'e.g., Software Engineer, Teacher, Student' })}
                  />
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('ai.advice.interests', { defaultValue: 'Interests & Hobbies' })}
                  </label>
                  <input
                    type="text"
                    value={userInfo.interests}
                    onChange={(e) => handleInputChange('interests', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600 text-gray-900 bg-white"
                    placeholder={t('ai.advice.interestsPlaceholder', { defaultValue: 'e.g., Reading, Sports, Music, Technology' })}
                  />
                </div>
              </div>

              {/* Goals */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('ai.advice.goals', { defaultValue: 'Current Life Goals' })}
                </label>
                <textarea
                  value={userInfo.goals}
                  onChange={(e) => handleInputChange('goals', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-600 text-gray-900 bg-white"
                  placeholder={t('ai.advice.goalsPlaceholder', { defaultValue: 'Describe your current life goals, what you want to achieve, or areas where you want guidance...' })}
                />
              </div>

              {/* Personality Type Display */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {personalityType}
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">
                      {t('ai.advice.yourPersonalityType', { defaultValue: 'Your Personality Type' })}
                    </h3>
                    <p className="text-sm text-blue-700">
                      {t('ai.advice.personalityBasedAdvice', { defaultValue: 'Advice will be tailored specifically for your personality type' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {t('common.cancel', { defaultValue: 'Cancel' })}
                </button>
                <button
                  type="submit"
                  disabled={!userInfo.age || !userInfo.occupation}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-full transition duration-300"
                >
                  {t('ai.advice.getAdvice', { defaultValue: 'Get AI Advice' })}
                </button>
              </div>
            </form>
          ) : (
            /* Result */
            <div className="space-y-6">
              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center space-x-3 text-blue-600">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span>{t('ai.advice.generating', { defaultValue: 'Generating personalized advice...' })}</span>
                </div>
              )}

              {/* Advice Content */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h1:text-2xl prose-h1:mb-4 prose-h1:mt-6 prose-h2:text-xl prose-h2:mb-3 prose-h2:mt-5 prose-h3:text-lg prose-h3:mb-2 prose-h3:mt-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-3 prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:text-gray-700 prose-li:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-3 prose-blockquote:my-4 prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded">
                  {streamingText && (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // Custom components for better styling
                        h1: ({children}) => <h1 className="text-2xl font-bold text-gray-900 mb-4 mt-6">{children}</h1>,
                        h2: ({children}) => <h2 className="text-xl font-bold text-gray-900 mb-3 mt-5">{children}</h2>,
                        h3: ({children}) => <h3 className="text-lg font-bold text-gray-900 mb-2 mt-4">{children}</h3>,
                        p: ({children}) => <p className="text-gray-700 leading-relaxed mb-3">{children}</p>,
                        ul: ({children}) => <ul className="list-disc list-inside text-gray-700 mb-3 space-y-1">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal list-inside text-gray-700 mb-3 space-y-1">{children}</ol>,
                        li: ({children}) => <li className="text-gray-700">{children}</li>,
                        strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                        blockquote: ({children}) => (
                          <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-3 my-4 italic">
                            {children}
                          </blockquote>
                        ),
                        code: ({node, inline, children, ...props}: any) => 
                          inline ? (
                            <code className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-1 rounded text-sm font-mono" {...props}>
                              {children}
                            </code>
                          ) : (
                            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 overflow-x-auto my-4">
                              <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">
                                {children}
                              </pre>
                            </div>
                          )
                      }}
                    >
                      {streamingText}
                    </ReactMarkdown>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  disabled={isLoading}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 transition-colors"
                >
                  {t('ai.advice.back', { defaultValue: 'Back to Form' })}
                </button>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition duration-300"
                >
                  {t('common.close', { defaultValue: 'Close' })}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}