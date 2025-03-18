'use client';

import { Box, Container, Heading, Text, Button, VStack, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  const startSurvey = () => {
    router.push('/survey');
  };

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.md">
        <VStack spacing={8} textAlign="center">
          <Heading as="h1" size="2xl">
            制造业数字化转型成熟度评估
          </Heading>
          
          <Text color={textColor} fontSize="lg">
            本评估旨在帮助制造业企业了解其在数字化转型方面的成熟度水平，
            评估涵盖组织、技术、数据、资源、数字化运营和数字化生产等多个维度。
          </Text>

          <Box p={6} borderRadius="lg" bg="white" shadow="md" w="full">
            <VStack spacing={4}>
              <Text fontWeight="bold">评估说明：</Text>
              <Text>• 共29个问题，分为7个能力域</Text>
              <Text>• 每个问题有5个选项(A-E)，对应1-5分</Text>
              <Text>• 完成评估约需15-20分钟</Text>
              <Text>• 评估结束后将生成详细的分析报告</Text>
            </VStack>
          </Box>

          <Button
            colorScheme="blue"
            size="lg"
            onClick={startSurvey}
            w={["full", "auto"]}
          >
            开始评估
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}