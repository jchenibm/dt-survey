'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import {
  Box,
  Container,
  VStack,
  Text,
  Button,
  Heading,
  Grid,
  GridItem,
  Progress,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { questions, categories, maturityLevels, recommendations } from '@/data/surveyData';
import type { Result } from '@/types/survey';
import { Session, CategoryScore } from '@/types/survey';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// 定义评估意见和整体建议
const maturityLevelAssessments: { [key: string]: string } = {
  '初始级': '数字化转型刚刚起步，缺乏明确的战略和规划，各部门之间协作较少，数据利用率较低。建议：首先制定清晰的数字化转型战略，加强各部门之间的协作，并开始收集和利用数据。',
  '探索级': '开始探索数字化转型，制定了初步的战略和规划，部分部门开始尝试数字化应用，但整体效果有限。建议：继续完善数字化转型战略，扩大数字化技术的应用范围，并加强数据分析能力。',
  '发展级': '数字化转型取得一定进展，制定了较为完善的战略和规划，各部门广泛应用数字化技术，数据利用率有所提高。建议：进一步优化数字化流程，提升数据驱动决策的水平，并探索新的数字化商业模式。',
  '领先级': '数字化转型成效显著，形成了全面的数字化战略和规划，各部门深度应用数字化技术，数据驱动决策成为常态。建议：持续创新数字化应用，构建开放的数字化生态系统，并加强风险管理。',
  '卓越级': '数字化转型达到卓越水平，持续创新数字化应用，构建了完善的数字化生态系统，数据价值得到充分挖掘。建议：保持领先地位，不断探索前沿技术，并积极分享数字化转型经验。',
};

export default function Result() {
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);
  const [maturityLevel, setMaturityLevel] = useState<string>('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  const boxBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const headingColor = useColorModeValue('gray.900', 'whiteAlpha.900');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const progressColor = useColorModeValue('green.500', 'green.300');

  const backgroundColor = useColorModeValue('white', 'gray.800');

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
    const categoryScores: CategoryScore[] = categories.map((category) => {
      const categoryQuestions = questions.filter((q) => q.categoryId === category.id);
      const categoryAnswers = session.answers.filter((a) =>
        categoryQuestions.some((q) => q.id === a.questionId)
      );

      const totalScore = categoryAnswers.reduce((sum, answer) => {
        const question = questions.find((q) => q.id === answer.questionId);
        const option = question?.options.find((o) => o.id === answer.selectedOptionId);
        return sum + (option?.score || 0);
      }, 0);

      return {
        categoryId: category.id,
        score: totalScore / categoryQuestions.length,
      };
    });

    const totalScore = categoryScores.reduce((sum, cs) => sum + cs.score, 0);
    const averageScore = totalScore / categories.length;
    const level = maturityLevels.find(
      (l) => averageScore >= l.scoreRange.min && averageScore <= l.scoreRange.max
    );

    setResult({
      sessionId: session.id,
      totalScore,
      averageScore,
      maturityLevel: level?.level || 1,
      categoryScores,
    });

    setMaturityLevel(level?.name || '初始级');
  };

  const getChartData = () => {
    if (!result || !result.categoryScores) return null;

    const chartData = {
      labels: categories.map((c) => c.name),
      datasets: [
        {
          label: '能力域得分',
          data: result.categoryScores.map((cs) => cs.score),
          backgroundColor: (context: any) => {
            const index = context.dataIndex;
            if (
              index < 0 ||
              index >= result.categoryScores.length ||
              !result.categoryScores[index]
            ) {
              return 'rgba(0, 0, 0, 0.1)';
            }
            const score = result.categoryScores[index].score;
            return score >= result.averageScore
              ? 'rgba(75, 192, 192, 0.4)'
              : 'rgba(255, 99, 132, 0.4)';
          },
          borderColor: (context: any) => {
            const index = context.dataIndex;
            if (
              index < 0 ||
              index >= result.categoryScores.length ||
              !result.categoryScores[index]
            ) {
              return 'rgba(0, 0, 0, 0.1)';
            }
            const score = result.categoryScores[index].score;
            return score >= result.averageScore
              ? 'rgba(75, 192, 192, 1)'
              : 'rgba(255, 99, 132, 1)';
          },
          borderWidth: 2,
          pointBackgroundColor: 'rgba(255,255,255,1)',
          pointBorderColor: (context: any) => {
            const index = context.dataIndex;
            if (
              index < 0 ||
              index >= result.categoryScores.length ||
              !result.categoryScores[index]
            ) {
              return 'rgba(0, 0, 0, 0.1)';
            }
            const score = result.categoryScores[index].score;
            return score >= result.averageScore
              ? 'rgba(75, 192, 192, 1)'
              : 'rgba(255, 99, 132, 1)';
          },
          pointBorderWidth: 2,
          pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
        },
      ],
    };

    return chartData;
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          showLabelBackdrop: false,
          backdropColor: 'rgba(255, 255, 255, 0.75)',
          color: '#777',
        },
        pointLabels: {
          fontSize: 14,
          fontColor: '#333',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed?.r || 0;
            return `${label}: ${value.toFixed(1)}`;
          },
        },
      },
    },
  };

  const generatePDF = useCallback(
    async (bgColor: string) => {
      if (!result) return;

      setIsGeneratingPDF(true);

      const buttonContainer = buttonContainerRef.current;
      let buttonContainerParent: HTMLElement | null = null;
      let buttonContainerNextSibling: ChildNode | null = null;
      if (buttonContainer) {
        buttonContainerParent = buttonContainer.parentNode as HTMLElement;
        buttonContainerNextSibling = buttonContainer.nextSibling;
        buttonContainer.remove();
      }

      try {
        const element = document.getElementById('result-content');
        if (!element) return;

        const canvas = await html2canvas(element, {
          scale: 2,
          backgroundColor: bgColor,
        });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const margin = 10;

        const availableWidth = pageWidth - 2 * margin;
        const availableHeight = pageHeight - 2 * margin;

        let imgWidth = availableWidth;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (imgHeight > availableHeight) {
          imgHeight = availableHeight;
          imgWidth = (canvas.width * imgHeight) / canvas.height;
        }

        let heightLeft = imgHeight;
        let position = margin;

        pdf.addImage(imgData, 'PNG', (pageWidth - imgWidth) / 2, position, imgWidth, imgHeight);
        heightLeft -= availableHeight;

        while (heightLeft >= 0) {
          pdf.addPage();
          position = margin;
          pdf.addImage(imgData, 'PNG', (pageWidth - imgWidth) / 2, position, imgWidth, imgHeight);
          heightLeft -= availableHeight;
        }

        pdf.save('数字化转型成熟度评估报告.pdf');
      } finally {
        if (buttonContainerParent && buttonContainer) {
          if (buttonContainerNextSibling) {
            buttonContainerParent.insertBefore(buttonContainer, buttonContainerNextSibling);
          } else {
            buttonContainerParent.appendChild(buttonContainer);
          }
        }
        setIsGeneratingPDF(false);
      }
    },
    [result, buttonContainerRef, setIsGeneratingPDF]
  );

  const getStrengthsAndWeaknesses = () => {
    if (!result) return { strengths: [], weaknesses: [] };

    const sortedScores = [...result.categoryScores].sort((a, b) => b.score - a.score);
    const strengths = sortedScores
      .slice(0, 2)
      .map((cs) => categories.find((c) => c.id === cs.categoryId)?.name || '');
    const weaknesses = sortedScores
      .slice(-2)
      .map((cs) => categories.find((c) => c.id === cs.categoryId)?.name || '');

    return { strengths, weaknesses };
  };

  if (!result) return null;

  const { strengths, weaknesses } = getStrengthsAndWeaknesses();

  const progressValue = (result.averageScore / 5) * 100;

  // 获取整合后的评估意见和建议
  const assessment = maturityLevelAssessments[maturityLevel] || '暂无评估意见和建议';

  return (
    <Box minH="100vh" py={8} bg="gray.50" color={textColor}>
      <Container maxW="container.lg">
        <VStack spacing={8} align="stretch" id="result-content">
          <Heading as="h1" size="xl" textAlign="center" color={headingColor}>
            数字化转型成熟度评估报告
          </Heading>

          <Box bg={boxBg} p={6} borderRadius="lg" shadow="md">
            <VStack spacing={4} align="stretch">
              <Heading as="h2" size="lg" color={headingColor}>
                总体评估结果
              </Heading>
              <Text fontSize="xl">
                成熟度等级：<Text fontWeight="bold">{maturityLevel}</Text>
              </Text>
              <Text fontSize="lg">
                总体得分：{result.averageScore.toFixed(1)} / 5
              </Text>
              <Progress value={progressValue} colorScheme="green" size="lg" borderRadius="md" />
              <Text fontSize="sm" textAlign="right">
                {progressValue.toFixed(1)}% 完成
              </Text>
              {/* 添加整合后的评估意见和建议 */}
              <Text mt={2} fontSize="md" color="gray.600" whiteSpace="pre-wrap">
                {assessment}
              </Text>
            </VStack>
          </Box>

          <Grid templateColumns={['1fr', '1fr', '1fr 1fr']} gap={6}>
            <GridItem>
              <Box bg={boxBg} p={6} borderRadius="lg" shadow="md" h="full">
                <Heading as="h3" size="md" mb={4} color={headingColor}>
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
              <Box bg={boxBg} p={6} borderRadius="lg" shadow="md" h="full">
                <Heading as="h3" size="md" mb={4} color={headingColor}>
                  改进建议
                </Heading>
                <Accordion allowMultiple>
                  {result.categoryScores.map((cs) => {
                    const category = categories.find((c) => c.id === cs.categoryId);
                    const recommendationsList = recommendations.filter(
                      (r) => r.categoryId === category?.id && r.levelId === result.maturityLevel
                    );
                    return (
                      <AccordionItem key={cs.categoryId}>
                        <h2>
                          <AccordionButton>
                            <Box
                              as="span"
                              flex="1"
                              textAlign="left"
                              fontWeight="bold"
                              color={headingColor}
                            >
                              {category?.name}：{cs.score.toFixed(1)} / 5
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          {recommendationsList.map((rec, index) => (
                            <Box
                              key={index}
                              mb={4}
                              border="1px"
                              borderColor="gray.200"
                              borderRadius="md"
                              p={3}
                            >
                              <Text fontSize="md" fontWeight="bold" color={accentColor} mb={1}>
                                {recommendationsList.length > 1
                                  ? `改进建议 ${index + 1}:`
                                  : '改进建议:'}
                              </Text>
                              <Text color="gray.600" whiteSpace="pre-wrap" ml={2}>
                                {rec.content}
                              </Text>
                              {rec.implementationGuidance && (
                                <Box mt={2} p={2} bg="gray.100" borderRadius="md">
                                  <Text
                                    color="green.600"
                                    fontStyle="italic"
                                    fontWeight="bold"
                                    mb={1}
                                  >
                                    实施指导:
                                  </Text>
                                  <Text color="gray.700" whiteSpace="pre-wrap" ml={2}>
                                    {rec.implementationGuidance}
                                  </Text>
                                </Box>
                              )}
                            </Box>
                          ))}
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </Box>
            </GridItem>
          </Grid>

          <Box display="flex" justifyContent="center" gap={4} ref={buttonContainerRef}>
            <Button onClick={() => router.push('/')} variant="outline">
              返回首页
            </Button>
            <Button
              onClick={() => generatePDF(backgroundColor)}
              colorScheme="blue"
              isLoading={isGeneratingPDF}
            >
              导出PDF报告
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
