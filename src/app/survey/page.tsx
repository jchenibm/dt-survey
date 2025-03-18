'use client';

import { useState, useEffect } from 'react';
import { Box, Container, VStack, Text, Button, Progress, RadioGroup, Radio, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { questions, categories } from '@/data/surveyData';
import { Answer, Session } from '@/types/survey';

export default function Survey() {
  const router = useRouter();
  const toast = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const currentQuestion = questions[currentQuestionIndex];
  const currentCategory = categories.find(c => c.id === currentQuestion?.categoryId);
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    // 从localStorage加载保存的进度
    const savedSession = localStorage.getItem('survey_session');
    if (savedSession) {
      const session: Session = JSON.parse(savedSession);
      if (session.status === 'in_progress') {
        setAnswers(session.answers);
        setCurrentQuestionIndex(session.answers.length);
      }
    }
    console.log('问卷数据加载完成，总题数：', questions.length);
    console.log('前5题ID：', questions.slice(0,5).map(q => q.id));
  }, []);

  const saveProgress = (newAnswers: Answer[]) => {
    const session: Session = {
      id: new Date().getTime().toString(),
      startTime: new Date(),
      status: 'in_progress',
      answers: newAnswers
    };
    localStorage.setItem('survey_session', JSON.stringify(session));
  };

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      const prevAnswer = answers[currentQuestionIndex - 1];
      if (prevAnswer) {
        setSelectedOption(prevAnswer.selectedOptionId);
      }
    }
  };

  const handleNext = () => {
    if (!selectedOption) {
      toast({
        title: '请选择一个选项',
        status: 'warning',
        duration: 2000,
        isClosable: true
      });
      return;
    }

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedOptionId: selectedOption
    };

    let newAnswers: Answer[];
    if (answers[currentQuestionIndex]) {
      newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = newAnswer;
    } else {
      newAnswers = [...answers, newAnswer];
    }

    setAnswers(newAnswers);
    saveProgress(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption('');
    } else {
      // 完成所有问题，更新session状态并跳转到结果页
      const session: Session = {
        id: new Date().getTime().toString(),
        startTime: new Date(),
        endTime: new Date(),
        status: 'completed',
        answers: newAnswers
      };
      localStorage.setItem('survey_session', JSON.stringify(session));
      router.push('/result');
    }
  };

  if (!currentQuestion) return null;

  return (
    <Box minH="100vh" py={8} bg="gray.50">
      <Container maxW="container.md">
        <VStack spacing={6} align="stretch">
          <Progress value={progress} size="sm" colorScheme="blue" />
          <Text color="gray.500" fontSize="sm">
            问题 {currentQuestionIndex + 1} / {questions.length}
          </Text>

          {currentCategory && (
            <Box mb={4}>
              <Text fontSize="lg" fontWeight="bold" color="blue.600">
                {currentCategory.name}
              </Text>
              <Text color="gray.600">{currentCategory.description}</Text>
            </Box>
          )}

          <Box bg="white" p={6} borderRadius="lg" shadow="md">
            <VStack align="stretch" spacing={4}>
              <Text fontSize="xl" fontWeight="bold">
                {currentQuestion.title}
              </Text>
              <Text color="gray.600">{currentQuestion.description}</Text>

              <RadioGroup onChange={handleOptionSelect} value={selectedOption}>
                <VStack align="stretch" spacing={3}>
                  {currentQuestion.options.map(option => (
                    <Radio key={option.id} value={option.id}>
                      <Text>
                        <strong>{option.label}.</strong> {option.description}
                      </Text>
                    </Radio>
                  ))}
                </VStack>
              </RadioGroup>
            </VStack>
          </Box>

          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button
              onClick={handlePrevious}
              isDisabled={currentQuestionIndex === 0}
              variant="outline"
            >
              上一题
            </Button>
            <Button
              onClick={handleNext}
              colorScheme="blue"
            >
              {currentQuestionIndex === questions.length - 1 ? '完成' : '下一题'}
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}