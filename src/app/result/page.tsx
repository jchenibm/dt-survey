'use client';

import { useEffect, useState } from 'react';
import { Box, Container, VStack, Text, Button, Heading, Grid, GridItem } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { questions, categories, maturityLevels, recommendations } from '@/data/surveyData';
import type { Result } from '@/types/survey';
import { Session, CategoryScore } from '@/types/survey';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function Result() {
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);
  const [maturityLevel, setMaturityLevel] = useState<string>('');

  useEffect(() => {
    const savedSession = localStorage.getItem('survey_session');
    if (!savedSession) {
      router.push('/');
      return;
    }

    const session: Session = JSON.parse(savedSession);
    if (session.status !== 'completed' || !session.answers.length) {
      router.push('/');
      return;
    }

    calculateResult(session);
  }, [router]);

  const calculateResult = (session: Session) => {
    const categoryScores: CategoryScore[] = categories.map(category => {
      const categoryQuestions = questions.filter(q => q.categoryId === category.id);
      const categoryAnswers = session.answers.filter(a => 
        categoryQuestions.some(q => q.id === a.questionId)
      );
      
      const totalScore = categoryAnswers.reduce((sum, answer) => {
        const question = questions.find(q => q.id === answer.questionId);
        const option = question?.options.find(o => o.id === answer.selectedOptionId);
        return sum + (option?.score || 0);
      }, 0);

      return {
        categoryId: category.id,
        score: totalScore / categoryQuestions.length
      };
    });

    const totalScore = categoryScores.reduce((sum, cs) => sum + cs.score, 0);
    const averageScore = totalScore / categories.length;
    const level = maturityLevels.find(l => 
      averageScore >= l.scoreRange.min && averageScore <= l.scoreRange.max
    );

    setResult({
      sessionId: session.id,
      totalScore,
      averageScore,
      maturityLevel: level?.level || 1,
      categoryScores
    });

    setMaturityLevel(level?.name || '初始级');
  };

  const getChartData = () => {
    if (!result || !result.categoryScores) return null; // 确保 result 和 categoryScores 不为空

    const chartData = {
      labels: categories.map(c => c.name),
      datasets: [{
        label: '能力域得分',
        data: result.categoryScores.map(cs => cs.score),
        backgroundColor: (context: any) => {
          const index = context.dataIndex;
          if (index < 0 || index >= result.categoryScores.length || !result.categoryScores[index]) {
            return 'rgba(0, 0, 0, 0.1)'; // 默认颜色，防止出错
          }
          const score = result.categoryScores[index].score;
          return score >= result.averageScore ? 'rgba(75, 192, 192, 0.4)' : 'rgba(255, 99, 132, 0.4)'; // 优势/劣势颜色
        },
        borderColor: (context: any) => {
          const index = context.dataIndex;
          if (index < 0 || index >= result.categoryScores.length || !result.categoryScores[index]) {
            return 'rgba(0, 0, 0, 0.1)'; // 默认颜色，防止出错
          }
          const score = result.categoryScores[index].score;
          return score >= result.averageScore ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)';
        },
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255,255,255,1)',
        pointBorderColor: (context: any) => {
          const index = context.dataIndex;
          if (index < 0 || index >= result.categoryScores.length || !result.categoryScores[index]) {
            return 'rgba(0, 0, 0, 0.1)'; // 默认颜色，防止出错
          }
          const score = result.categoryScores[index].score;
          return score >= result.averageScore ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)';
        },
        pointBorderWidth: 2,
        pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
      }]
    };

    return chartData;
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1, // 简化刻度
          showLabelBackdrop: false,
          backdropColor: 'rgba(255, 255, 255, 0.75)',
          color: '#777',
        },
        pointLabels: {
          fontSize: 14,
          fontColor: '#333'
        }
      }
    },
    plugins: {
      legend: {
        display: false // 隐藏图例
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed?.r || 0;
            return `${label}: ${value.toFixed(1)}`;
          }
        }
      }
    }
  };

  const generatePDF = async () => {
    if (!result) return;

    const canvas = await html2canvas(document.getElementById('result-content') as HTMLElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('数字化转型成熟度评估报告.pdf');
  };

  const getStrengthsAndWeaknesses = () => {
    if (!result) return { strengths: [], weaknesses: [] };

    const sortedScores = [...result.categoryScores].sort((a, b) => b.score - a.score);
    const strengths = sortedScores.slice(0, 2).map(cs => categories.find(c => c.id === cs.categoryId)?.name || '');
    const weaknesses = sortedScores.slice(-2).map(cs => categories.find(c => c.id === cs.categoryId)?.name || '');

    return { strengths, weaknesses };
  };

  if (!result) return null;

  const { strengths, weaknesses } = getStrengthsAndWeaknesses();

  return (
    <Box minH="100vh" py={8} bg="gray.50">
      <Container maxW="container.lg">
        <VStack spacing={8} align="stretch" id="result-content">
          <Heading as="h1" size="xl" textAlign="center">
            数字化转型成熟度评估报告
          </Heading>

          <Box bg="white" p={6} borderRadius="lg" shadow="md">
            <VStack spacing={4} align="stretch">
              <Heading as="h2" size="lg">
                总体评估结果
              </Heading>
              <Text fontSize="xl">
                成熟度等级：<strong>{maturityLevel}</strong>
              </Text>
              <Text fontSize="lg">
                总体得分：{result.averageScore.toFixed(1)}分
              </Text>
            </VStack>
          </Box>

          <Grid templateColumns={['1fr', '1fr', '1fr 1fr']} gap={6}>
            <GridItem>
              <Box bg="white" p={6} borderRadius="lg" shadow="md" h="full">
                <Heading as="h3" size="md" mb={4}>
                  能力域得分分布
                </Heading>
                <Box h="300px">
                  {getChartData() && <Radar data={getChartData()!} options={chartOptions as any} />}
                </Box>
                <Text mt={2} fontSize="sm" color="green.600">
                  优势领域：{strengths.join('、')}
                </Text>
                <Text mt={2} fontSize="sm" color="red.600">
                  待改进领域：{weaknesses.join('、')}
                </Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box bg="white" p={6} borderRadius="lg" shadow="md" h="full">
                <Heading as="h3" size="md" mb={4}>
                  改进建议
                </Heading>
                <VStack align="stretch" spacing={3}>
                  {result.categoryScores.map(cs => {
                    const category = categories.find(c => c.id === cs.categoryId);
                    const recommendationsList = recommendations.filter(
                      r => r.categoryId === category?.id && r.levelId === result.maturityLevel
                    );
                    return (
                      <Box key={cs.categoryId}>
                        <Text fontWeight="bold">{category?.name}：{cs.score.toFixed(1)}分</Text>
                        {recommendationsList.map((rec, index) => (
                          <Box key={index} mb={4}>
                            <Text fontSize="lg" fontWeight="500" color="blue.600">
                              改进建议 {index + 1}:
                            </Text>
                            <Text color="gray.600" whiteSpace="pre-wrap">
                              {rec.content}
                            </Text>
                            {rec.implementationGuidance && (
                              <Text mt={2} color="green.600" fontStyle="italic">
                                实施指导: {rec.implementationGuidance}
                              </Text>
                            )}
                          </Box>
                        ))}
                      </Box>
                    );
                  })}
                </VStack>
              </Box>
            </GridItem>
          </Grid>

          <Box display="flex" justifyContent="center" gap={4}>
            <Button
              onClick={() => router.push('/')}
              variant="outline"
            >
              返回首页
            </Button>
            <Button
              onClick={generatePDF}
              colorScheme="blue"
            >
              导出PDF报告
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
