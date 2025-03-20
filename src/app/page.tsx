'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import fs from 'fs';
import path from 'path';

export default function Home() {
  const router = useRouter();
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  // 添加表单状态
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    position: '',
    contact: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    company: '',
    position: '',
    contact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // 清除对应字段的错误信息
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // 验证表单
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = '请输入姓名';
      isValid = false;
    }

    if (!formData.company.trim()) {
      newErrors.company = '请输入单位';
      isValid = false;
    }

    if (!formData.position.trim()) {
      newErrors.position = '请输入职务';
      isValid = false;
    }

    if (!formData.contact.trim()) {
      newErrors.contact = '请输入联系方式';
      isValid = false;
    } else {
      // 简单验证联系方式格式（手机号或邮箱）
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!emailRegex.test(formData.contact) && !phoneRegex.test(formData.contact)) {
        newErrors.contact = '请输入有效的手机号或邮箱';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // 保存参与者信息到CSV文件
  const saveParticipantInfo = async () => {
    try {
      const timestamp = new Date().toISOString();
      const csvLine = `${formData.name},${formData.company},${formData.position},${formData.contact},${timestamp}\n`;
      
      // 使用fetch API发送数据到服务器端API
      const response = await fetch('/api/save-participant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp
        }),
      });

      if (!response.ok) {
        throw new Error('保存参与者信息失败');
      }

      return true;
    } catch (error) {
      console.error('保存参与者信息出错:', error);
      return false;
    }
  };

  const startSurvey = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const saved = await saveParticipantInfo();
    setIsSubmitting(false);

    if (saved) {
      router.push('/survey');
    } else {
      toast({
        title: '保存信息失败',
        description: '无法保存您的信息，请稍后再试',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const assessmentDetails = [
    '共29个问题，分为7个能力域',
    '每个问题有5个选项(A-E)，对应1-5分',
    '完成评估约需15-20分钟',
    '评估结束后将生成详细的分析报告',
  ];

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.md">
        <VStack spacing={8} textAlign="center">
          <Heading as="h1" size="2xl">
            制造业数字化转型成熟度评估
          </Heading>

          <Text color={textColor} fontSize="lg">
            本评估旨在帮助制造业企业了解其在数字化转型方面的成熟度水平，评估涵盖组织、技术、数据、资源、数字化运营和数字化生产等多个维度。
          </Text>

          <Box
            p={6}
            borderRadius="lg"
            bg="white"
            shadow="md"
            w="full"
            textAlign="left"
          >
            <VStack spacing={2} align="start">
              <Text fontWeight="bold">评估说明：</Text>
              {assessmentDetails.map((detail, index) => (
                <Text key={index} fontSize="sm">
                  • {detail}
                </Text>
              ))}
            </VStack>
          </Box>

          {/* 添加参与者信息表单 */}
          <Box
            p={6}
            borderRadius="lg"
            bg="white"
            shadow="md"
            w="full"
            textAlign="left"
          >
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold" fontSize="lg">参与者信息：</Text>
              
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>姓名</FormLabel>
                <Input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="请输入您的姓名"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.company}>
                <FormLabel>单位</FormLabel>
                <Input 
                  name="company" 
                  value={formData.company} 
                  onChange={handleInputChange} 
                  placeholder="请输入您的单位名称"
                />
                <FormErrorMessage>{errors.company}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.position}>
                <FormLabel>职务</FormLabel>
                <Input 
                  name="position" 
                  value={formData.position} 
                  onChange={handleInputChange} 
                  placeholder="请输入您的职务"
                />
                <FormErrorMessage>{errors.position}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.contact}>
                <FormLabel>联系方式</FormLabel>
                <Input 
                  name="contact" 
                  value={formData.contact} 
                  onChange={handleInputChange} 
                  placeholder="请输入您的手机号或邮箱"
                />
                <FormErrorMessage>{errors.contact}</FormErrorMessage>
              </FormControl>
            </VStack>
          </Box>

          <Button
            colorScheme="blue"
            size="lg"
            onClick={startSurvey}
            w={['full', 'auto']}
            isLoading={isSubmitting}
            loadingText="提交中..."
          >
            开始评估
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
