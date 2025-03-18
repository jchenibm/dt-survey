import { Category, Question } from '../types/survey';

import { MaturityLevel } from '../types/survey';

// 移除本地接口定义

export interface Recommendation {
  categoryId: string;
  levelId: number;
  content: string;
  implementationGuidance?: string;
}

export const categories: Category[] = [
  {
    id: 'organization',
    name: '组织',
    description: '评估企业在数字化转型组织建设、战略规划、流程管理和变革管理方面的能力'
  },
  {
    id: 'technology',
    name: '技术',
    description: '评估企业在研发管理、技术创新和信息安全方面的能力'
  },
  {
    id: 'data',
    name: '数据',
    description: '评估企业在数据采集、管理、资产化和业务应用方面的能力'
  },
  {
    id: 'resource',
    name: '资源',
    description: '评估企业在基础设施、应用支撑、资金投入和知识管理方面的能力'
  },
  {
    id: 'digital_operation',
    name: '数字化运营',
    description: '评估企业在营销、财务和供应链数字化方面的能力'
  },
  {
    id: 'digital_production',
    name: '数字化生产',
    description: '评估企业在产品设计、工艺设计、生产计划、质量管控等方面的数字化能力'
  },
  {
    id: 'digital_service',
    name: '数字化服务',
    description: '评估企业在服务产品、服务交付、服务能力和服务运行等方面的数字化能力'
  }
];

export const questions: Question[] = [
  {
    id: 'q1',
    categoryId: 'organization',
    title: '组织建设',
    description: '贵公司是否建立了专门的数字化转型团队或部门？',
    options: [
      { id: 'q1_a', label: 'A', description: '没有', score: 1 },
      { id: 'q1_b', label: 'B', description: '有，但职能分散，缺乏统一协调', score: 2 },
      { id: 'q1_c', label: 'C', description: '有，职能相对集中，但人员配备不足', score: 3 },
      { id: 'q1_d', label: 'D', description: '有，职能集中，人员配备基本满足需求', score: 4 },
      { id: 'q1_e', label: 'E', description: '有，职能集中，人员配备充足，且具备专业技能', score: 5 }
    ]
  },
  {
    id: 'q2',
    categoryId: 'organization',
    title: '转型战略',
    description: '贵公司是否制定了明确的数字化转型战略？',
    options: [
      { id: 'q2_a', label: 'A', description: '没有', score: 1 },
      { id: 'q2_b', label: 'B', description: '有，但战略目标模糊，缺乏具体实施计划', score: 2 },
      { id: 'q2_c', label: 'C', description: '有，战略目标相对清晰，但实施计划不够完善', score: 3 },
      { id: 'q2_d', label: 'D', description: '有，战略目标清晰，实施计划基本完善，并定期评估', score: 4 },
      { id: 'q2_e', label: 'E', description: '有，战略目标清晰，实施计划完善，定期评估并根据实际情况调整', score: 5 }
    ]
  },
  {
    id: 'q3',
    categoryId: 'organization',
    title: '流程管理',
    description: '贵公司是否对关键业务流程进行了数字化改造？',
    options: [
      { id: 'q3_a', label: 'A', description: '没有', score: 1 },
      { id: 'q3_b', label: 'B', description: '仅对部分流程进行了初步的数字化改造', score: 2 },
      { id: 'q3_c', label: 'C', description: '对大部分流程进行了数字化改造，但集成度不高', score: 3 },
      { id: 'q3_d', label: 'D', description: '对关键业务流程进行了全面数字化改造，并实现了一定的集成', score: 4 },
      { id: 'q3_e', label: 'E', description: '对所有关键业务流程进行了全面数字化改造，并实现了高度集成和优化', score: 5 }
    ]
  },
  {
    id: 'q4',
    categoryId: 'organization',
    title: '变革管理',
    description: '贵公司在数字化转型过程中，是否重视变革管理？',
    options: [
      { id: 'q4_a', label: 'A', description: '没有', score: 1 },
      { id: 'q4_b', label: 'B', description: '仅关注技术层面的变革，忽视人员和组织层面的变革', score: 2 },
      { id: 'q4_c', label: 'C', description: '关注技术和人员层面的变革，但缺乏有效的沟通和培训', score: 3 },
      { id: 'q4_d', label: 'D', description: '重视技术、人员和组织层面的变革，并开展了有效的沟通和培训', score: 4 },
      { id: 'q4_e', label: 'E', description: '重视变革管理，建立了完善的变革管理体系，并取得了显著成效', score: 5 }
    ]
  },
  {
    id: 'q5',
    categoryId: 'technology',
    title: '研发管理',
    description: '贵公司是否利用数字化技术提升研发管理水平？',
    options: [
      { id: 'q5_a', label: 'A', description: '没有', score: 1 },
      { id: 'q5_b', label: 'B', description: '仅在研发过程中使用一些简单的数字化工具', score: 2 },
      { id: 'q5_c', label: 'C', description: '利用数字化技术进行研发项目管理和协同', score: 3 },
      { id: 'q5_d', label: 'D', description: '利用数字化技术进行研发数据分析和知识管理', score: 4 },
      { id: 'q5_e', label: 'E', description: '构建了全面的数字化研发管理平台，实现了研发全流程的数字化', score: 5 }
    ]
  },
  {
    id: 'q6',
    categoryId: 'technology',
    title: '技术创新',
    description: '贵公司是否积极探索和应用新兴技术？',
    options: [
      { id: 'q6_a', label: 'A', description: '没有', score: 1 },
      { id: 'q6_b', label: 'B', description: '仅关注一些成熟的数字化技术', score: 2 },
      { id: 'q6_c', label: 'C', description: '积极探索新兴技术，但缺乏实际应用', score: 3 },
      { id: 'q6_d', label: 'D', description: '在部分领域尝试应用新兴技术，并取得了一定的成果', score: 4 },
      { id: 'q6_e', label: 'E', description: '将新兴技术广泛应用于各个业务领域，并持续进行技术创新', score: 5 }
    ]
  },
  {
    id: 'q7',
    categoryId: 'technology',
    title: '信息安全',
    description: '贵公司是否建立了完善的数字化安全管理体系？',
    options: [
      { id: 'q7_a', label: 'A', description: '没有', score: 1 },
      { id: 'q7_b', label: 'B', description: '仅采取了一些简单的安全措施', score: 2 },
      { id: 'q7_c', label: 'C', description: '建立了基本的信息安全管理制度', score: 3 },
      { id: 'q7_d', label: 'D', description: '建立了完善的信息安全管理体系，并定期进行安全评估', score: 4 },
      { id: 'q7_e', label: 'E', description: '建立了完善的信息安全管理体系，定期进行安全评估，并持续进行安全加固', score: 5 }
    ]
  },
  {
    id: 'q8',
    categoryId: 'data',
    title: '业务数据化',
    description: '贵公司是否实现了关键业务数据的采集和存储？',
    options: [
      { id: 'q8_a', label: 'A', description: '没有', score: 1 },
      { id: 'q8_b', label: 'B', description: '仅采集和存储了部分关键业务数据', score: 2 },
      { id: 'q8_c', label: 'C', description: '采集和存储了大部分关键业务数据，但数据质量不高', score: 3 },
      { id: 'q8_d', label: 'D', description: '采集和存储了所有关键业务数据，并保证了数据质量', score: 4 },
      { id: 'q8_e', label: 'E', description: '实现了所有业务数据的全面采集和存储，并建立了完善的数据质量管理体系', score: 5 }
    ]
  },
  {
    id: 'q9',
    categoryId: 'data',
    title: '数据管理',
    description: '贵公司是否建立了完善的数据管理体系？',
    options: [
      { id: 'q9_a', label: 'A', description: '没有', score: 1 },
      { id: 'q9_b', label: 'B', description: '仅制定了一些简单的数据管理规范', score: 2 },
      { id: 'q9_c', label: 'C', description: '建立了基本的数据管理制度', score: 3 },
      { id: 'q9_d', label: 'D', description: '建立了完善的数据管理体系，并定期进行数据治理', score: 4 },
      { id: 'q9_e', label: 'E', description: '建立了完善的数据管理体系，定期进行数据治理，并持续进行数据优化', score: 5 }
    ]
  },
  {
    id: 'q10',
    categoryId: 'data',
    title: '数据资产',
    description: '贵公司是否将数据视为重要的资产进行管理？',
    options: [
      { id: 'q10_a', label: 'A', description: '没有', score: 1 },
      { id: 'q10_b', label: 'B', description: '仅将数据视为业务运营的辅助工具', score: 2 },
      { id: 'q10_c', label: 'C', description: '认识到数据的重要性，但缺乏有效的数据资产管理方法', score: 3 },
      { id: 'q10_d', label: 'D', description: '将数据视为重要的资产进行管理，并建立了数据资产目录', score: 4 },
      { id: 'q10_e', label: 'E', description: '将数据视为核心资产进行管理，建立了完善的数据资产管理体系，并实现了数据价值的最大化', score: 5 }
    ]
  },
  {
    id: 'q11',
    categoryId: 'data',
    title: '数据业务化',
    description: '贵公司是否利用数据驱动业务创新和增长？',
    options: [
      { id: 'q11_a', label: 'A', description: '没有', score: 1 },
      { id: 'q11_b', label: 'B', description: '仅利用数据进行简单的业务分析', score: 2 },
      { id: 'q11_c', label: 'C', description: '利用数据进行业务优化和改进', score: 3 },
      { id: 'q11_d', label: 'D', description: '利用数据驱动业务创新，并取得了一定的成果', score: 4 },
      { id: 'q11_e', label: 'E', description: '构建了全面的数据驱动业务体系，实现了数据价值的持续增长', score: 5 }
    ]
  },
  {
    id: 'q12',
    categoryId: 'resource',
    title: '基础设施',
    description: '贵公司是否拥有满足数字化转型需求的基础设施？',
    options: [
      { id: 'q12_a', label: 'A', description: '没有', score: 1 },
      { id: 'q12_b', label: 'B', description: '基础设施薄弱，难以支撑数字化应用', score: 2 },
      { id: 'q12_c', label: 'C', description: '基础设施基本满足需求，但存在瓶颈', score: 3 },
      { id: 'q12_d', label: 'D', description: '基础设施能够满足大部分数字化应用的需求', score: 4 },
      { id: 'q12_e', label: 'E', description: '拥有先进的基础设施，能够全面支撑数字化转型', score: 5 }
    ]
  },
  {
    id: 'q13',
    categoryId: 'resource',
    title: '应用支撑资源',
    description: '贵公司是否拥有支撑数字化应用开发和运维的资源？',
    options: [
      { id: 'q13_a', label: 'A', description: '没有', score: 1 },
      { id: 'q13_b', label: 'B', description: '缺乏专业的应用开发和运维团队', score: 2 },
      { id: 'q13_c', label: 'C', description: '拥有一定的应用开发和运维能力，但资源不足', score: 3 },
      { id: 'q13_d', label: 'D', description: '拥有专业的应用开发和运维团队，资源基本满足需求', score: 4 },
      { id: 'q13_e', label: 'E', description: '拥有强大的应用开发和运维团队，资源充足，并持续进行技术创新', score: 5 }
    ]
  },
  {
    id: 'q14',
    categoryId: 'resource',
    title: '资金',
    description: '贵公司是否为数字化转型提供了充足的资金支持？',
    options: [
      { id: 'q14_a', label: 'A', description: '没有', score: 1 },
      { id: 'q14_b', label: 'B', description: '资金投入不足，难以支撑数字化转型', score: 2 },
      { id: 'q14_c', label: 'C', description: '资金投入基本满足需求，但缺乏长期规划', score: 3 },
      { id: 'q14_d', label: 'D', description: '为数字化转型提供了充足的资金支持，并制定了长期投资计划', score: 4 },
      { id: 'q14_e', label: 'E', description: '将数字化转型作为战略重点，持续加大资金投入，并取得了显著成效', score: 5 }
    ]
  },
  {
    id: 'q15',
    categoryId: 'resource',
    title: '知识',
    description: '贵公司是否建立了完善的数字化知识管理体系？',
    options: [
      { id: 'q15_a', label: 'A', description: '没有', score: 1 },
      { id: 'q15_b', label: 'B', description: '缺乏有效的知识管理方法', score: 2 },
      { id: 'q15_c', label: 'C', description: '建立了基本的知识管理制度', score: 3 },
      { id: 'q15_d', label: 'D', description: '建立了完善的数字化知识管理体系，并定期进行知识更新', score: 4 },
      { id: 'q15_e', label: 'E', description: '建立了完善的数字化知识管理体系，定期进行知识更新，并实现了知识的共享和创新', score: 5 }
    ]
  },
    {
    id: 'q16',
    categoryId: 'digital_operation',
    title: '数字化营销',
    description: '贵公司是否利用数字化技术进行营销活动？',
    options: [
      { id: 'q16_a', label: 'A', description: '没有', score: 1 },
      { id: 'q16_b', label: 'B', description: '仅使用一些简单的线上营销工具', score: 2 },
      { id: 'q16_c', label: 'C', description: '利用数字化技术进行精准营销和客户关系管理', score: 3 },
      { id: 'q16_d', label: 'D', description: '构建了全面的数字化营销平台，实现了营销全流程的数字化', score: 4 },
      { id: 'q16_e', label: 'E', description: '利用数字化技术进行个性化营销和智能营销，并取得了显著成效', score: 5 }
    ]
  },
  {
    id: 'q17',
    categoryId: 'digital_operation',
    title: '数字化财务',
    description: '贵公司是否实现了财务管理的数字化？',
    options: [
      { id: 'q17_a', label: 'A', description: '没有', score: 1 },
      { id: 'q17_b', label: 'B', description: '仅使用一些简单的财务软件', score: 2 },
      { id: 'q17_c', label: 'C', description: '实现了财务数据的自动化采集和处理', score: 3 },
      { id: 'q17_d', label: 'D', description: '构建了全面的数字化财务管理平台，实现了财务全流程的数字化', score: 4 },
      { id: 'q17_e', label: 'E', description: '利用数字化技术进行财务预测和风险管理，并提高了财务决策的效率和准确性', score: 5 }
    ]
  },
  {
    id: 'q18',
    categoryId: 'digital_operation',
    title: '数字化供应链',
    description: '贵公司是否实现了供应链的数字化？',
    options: [
      { id: 'q18_a', label: 'A', description: '没有', score: 1 },
      { id: 'q18_b', label: 'B', description: '仅使用一些简单的供应链管理软件', score: 2 },
      { id: 'q18_c', label: 'C', description: '实现了供应链数据的实时共享和协同', score: 3 },
      { id: 'q18_d', label: 'D', description: '构建了全面的数字化供应链平台，实现了供应链全流程的数字化', score: 4 },
      { id: 'q18_e', label: 'E', description: '利用数字化技术进行供应链优化和预测，并提高了供应链的效率和可靠性', score: 5 }
    ]
  },
  {
    id: 'q19',
    categoryId: 'digital_production',
    title: '产品设计',
    description: '贵公司是否利用数字化技术进行产品设计？',
    options: [
      { id: 'q19_a', label: 'A', description: '没有', score: 1 },
      { id: 'q19_b', label: 'B', description: '仅使用一些简单的 CAD 软件', score: 2 },
      { id: 'q19_c', label: 'C', description: '利用数字化技术进行产品仿真和优化', score: 3 },
      { id: 'q19_d', label: 'D', description: '构建了全面的数字化产品设计平台，实现了产品设计全流程的数字化', score: 4 },
      { id: 'q19_e', label: 'E', description: '利用数字化技术进行创新设计和个性化定制，并提高了产品设计的效率和质量', score: 5 }
    ]
  },
  {
    id: 'q20',
    categoryId: 'digital_production',
    title: '工艺设计',
    description: '贵公司是否利用数字化技术进行工艺设计？',
    options: [
      { id: 'q20_a', label: 'A', description: '没有', score: 1 },
      { id: 'q20_b', label: 'B', description: '仅使用一些简单的工艺设计软件', score: 2 },
      { id: 'q20_c', label: 'C', description: '利用数字化技术进行工艺仿真和优化', score: 3 },
      { id: 'q20_d', label: 'D', description: '构建了全面的数字化工艺设计平台，实现了工艺设计全流程的数字化', score: 4 },
      { id: 'q20_e', label: 'E', description: '利用数字化技术进行智能工艺设计和优化，并提高了生产效率和质量', score: 5 }
    ]
  },
  {
    id: 'q21',
    categoryId: 'digital_production',
    title: '生产计划',
    description: '贵公司是否利用数字化技术进行生产计划管理？',
    options: [
      { id: 'q21_a', label: 'A', description: '没有', score: 1 },
      { id: 'q21_b', label: 'B', description: '仅使用简单的生产计划软件', score: 2 },
      { id: 'q21_c', label: 'C', description: '利用数字化技术进行生产计划编排', score: 3 },
      { id: 'q21_d', label: 'D', description: '构建了智能生产计划系统并与供应链集成', score: 4 },
      { id: 'q21_e', label: 'E', description: '实现基于实时数据的动态生产计划优化', score: 5 }
    ]
  },
  {
    id: 'q22',
    categoryId: 'digital_production',
    title: '生产执行',
    description: '贵公司是否实现生产过程的数字化执行管理？',
    options: [
      { id: 'q22_a', label: 'A', description: '没有', score: 1 },
      { id: 'q22_b', label: 'B', description: '部分车间使用MES系统', score: 2 },
      { id: 'q22_c', label: 'C', description: '主要车间实现MES系统覆盖', score: 3 },
      { id: 'q22_d', label: 'D', description: '实现全厂级数字化生产执行管理', score: 4 },
      { id: 'q22_e', label: 'E', description: '实现生产执行与设备物联网的深度集成', score: 5 }
    ]
  },
  {
    id: 'q23',
    categoryId: 'digital_production',
    title: '质量控制',
    description: '贵公司是否应用数字化技术进行质量管控？',
    options: [
      { id: 'q23_a', label: 'A', description: '没有', score: 1 },
      { id: 'q23_b', label: 'B', description: '使用简单的质量检测设备', score: 2 },
      { id: 'q23_c', label: 'C', description: '实现关键工序的在线质量检测', score: 3 },
      { id: 'q23_d', label: 'D', description: '构建全面的数字化质量追溯系统', score: 4 },
      { id: 'q23_e', label: 'E', description: '实现基于AI的实时质量预测和管控', score: 5 }
    ]
  },
  {
    id: 'q24',
    categoryId: 'digital_production',
    title: '设备管理',
    description: '贵公司是否实现生产设备的数字化管理？',
    options: [
      { id: 'q24_a', label: 'A', description: '没有', score: 1 },
      { id: 'q24_b', label: 'B', description: '部分设备实现数字化监控', score: 2 },
      { id: 'q24_c', label: 'C', description: '主要设备实现数字化监控和维护', score: 3 },
      { id: 'q24_d', label: 'D', description: '实现设备全生命周期数字化管理', score: 4 },
      { id: 'q24_e', label: 'E', description: '实现基于预测性维护的智能设备管理', score: 5 }
    ]
  },
  {
    id: 'q25',
    categoryId: 'digital_production',
    title: '能效管理',
    description: '贵公司是否应用数字化技术进行能源消耗管理？',
    options: [
      { id: 'q25_a', label: 'A', description: '没有', score: 1 },
      { id: 'q25_b', label: 'B', description: '实现基础能耗数据采集', score: 2 },
      { id: 'q25_c', label: 'C', description: '建立能效监控分析平台', score: 3 },
      { id: 'q25_d', label: 'D', description: '实现能效优化闭环管理', score: 4 },
      { id: 'q25_e', label: 'E', description: '实现基于AI的智能能效优化', score: 5 }
    ]
  },
  {
    id: 'q26',
    categoryId: 'digital_service',
    title: '服务产品',
    description: '贵公司是否开发了基于数字化技术的服务产品？',
    options: [
      { id: 'q26_a', label: 'A', description: '没有', score: 1 },
      { id: 'q26_b', label: 'B', description: '仅提供一些简单的线上服务', score: 2 },
      { id: 'q26_c', label: 'C', description: '开发了基于数字化技术的增值服务', score: 3 },
      { id: 'q26_d', label: 'D', description: '构建了全面的数字化服务产品体系，满足客户的个性化需求', score: 4 },
      { id: 'q26_e', label: 'E', description: '利用数字化技术进行服务创新，并持续推出新的服务产品', score: 5 }
    ]
  },
  {
    id: 'q27',
    categoryId: 'digital_service',
    title: '服务交付',
    description: '贵公司是否利用数字化技术进行服务交付？',
    options: [
      { id: 'q27_a', label: 'A', description: '没有', score: 1 },
      { id: 'q27_b', label: 'B', description: '仅使用一些简单的线上服务工具', score: 2 },
      { id: 'q27_c', label: 'C', description: '实现了服务交付过程的自动化和标准化', score: 3 },
      { id: 'q27_d', label: 'D', description: '构建了全面的数字化服务交付平台，提高了服务效率和质量', score: 4 },
      { id: 'q27_e', label: 'E', description: '利用数字化技术进行智能服务交付和优化，并提高了客户满意度', score: 5 }
    ]
  },
  {
    id: 'q28',
    categoryId: 'digital_service',
    title: '服务能力',
    description: '贵公司是否具备支撑数字化服务所需的服务能力？',
    options: [
      { id: 'q28_a', label: 'A', description: '没有', score: 1 },
      { id: 'q28_b', label: 'B', description: '缺乏专业的服务团队和技术支持', score: 2 },
      { id: 'q28_c', label: 'C', description: '拥有一定的服务能力，但资源不足', score: 3 },
      { id: 'q28_d', label: 'D', description: '拥有专业的服务团队和技术支持，资源基本满足需求', score: 4 },
      { id: 'q28_e', label: 'E', description: '拥有强大的服务团队和技术支持，资源充足，并持续进行服务创新', score: 5 }
    ]
  },
  {
    id: 'q29',
    categoryId: 'digital_service',
    title: '服务运行',
    description: '贵公司是否利用数字化技术进行服务运行管理？',
    options: [
      { id: 'q29_a', label: 'A', description: '没有', score: 1 },
      { id: 'q29_b', label: 'B', description: '仅使用一些简单的服务管理软件', score: 2 },
      { id: 'q29_c', label: 'C', description: '实现了服务数据的实时监控和分析', score: 3 },
      { id: 'q29_d', label: 'D', description: '构建了全面的数字化服务运行管理平台，提高了服务运行的效率和可靠性', score: 4 },
      { id: 'q29_e', label: 'E', description: '利用数字化技术进行智能服务运行管理和优化，并提高了客户满意度和忠诚度', score: 5 }
    ]
  }
];

export const maturityLevels: MaturityLevel[] = [
  {
    level: 1,
    name: '初始阶段',
    description: '具备初步数字化意识，但缺乏系统规划和实施能力',
    scoreRange: { min: 1, max: 10 }
  },
  {
    level: 2,
    name: '探索阶段',
    description: '开始局部数字化尝试，但尚未形成体系化能力',
    scoreRange: { min: 11, max: 20 }
  },
  {
    level: 3,
    name: '发展阶段',
    description: '建立基础数字化能力，正在向业务全流程扩展',
    scoreRange: { min: 21, max: 30 }
  },
  {
    level: 4,
    name: '成熟阶段',
    description: '实现业务全流程数字化，具备数据驱动决策能力',
    scoreRange: { min: 31, max: 40 }
  },
  {
    level: 5,
    name: '优化阶段',
    description: '完成全面数字化转型，持续优化创新业务模式',
    scoreRange: { min: 41, max: 50 }
  }
];

export const recommendations: Recommendation[] = [
  // 组织能力域建议（已存在）
  // 技术能力域建议（已存在）
  
  // 数据能力域建议
  { categoryId: 'data', levelId: 1, content: '建立基础数据采集规范，制定数据治理路线图' },
  { categoryId: 'data', levelId: 2, content: '构建统一数据仓库，实施主数据管理' },
  { categoryId: 'data', levelId: 3, content: '建立数据质量管理体系，实现关键业务指标可视化' },
  { categoryId: 'data', levelId: 4, content: '构建数据中台，推动数据资产化运营' },
  { categoryId: 'data', levelId: 5, content: '实现数据驱动业务创新，打造数据产品服务体系' },

  // 资源能力域建议
  { categoryId: 'resource', levelId: 1, content: '制定基础设施升级计划，优化IT资源分配' },
  { categoryId: 'resource', levelId: 2, content: '建立云资源管理体系，实施资源使用监控' },
  { categoryId: 'resource', levelId: 3, content: '构建资源共享平台，提高资源利用效率' },
  { categoryId: 'resource', levelId: 4, content: '建立知识管理系统，实现知识资产沉淀' },
  { categoryId: 'resource', levelId: 5, content: '打造智能化资源调度平台，实现资源最优配置' },

  // 数字化运营建议
  { categoryId: 'digital_operation', levelId: 1, content: '在核心业务环节试点数字化工具应用' },
  { categoryId: 'digital_operation', levelId: 2, content: '建立运营数据分析看板，优化关键业务流程' },
  { categoryId: 'digital_operation', levelId: 3, content: '实现跨部门数据共享，构建数字化运营中台' },
  { categoryId: 'digital_operation', levelId: 4, content: '应用AI技术实现运营智能预测与预警' },
  { categoryId: 'digital_operation', levelId: 5, content: '建立智慧运营体系，实现业务全链路自动化' },

  // 数字化生产建议
  { categoryId: 'digital_production', levelId: 1, content: '在关键生产环节部署传感器和物联网设备' },
  { categoryId: 'digital_production', levelId: 2, content: '建立生产数据采集系统，实现生产过程可视化' },
  { categoryId: 'digital_production', levelId: 3, content: '应用数字孪生技术优化生产工艺流程' },
  { categoryId: 'digital_production', levelId: 4, content: '构建智能排产系统，实现柔性化生产' },
  { categoryId: 'digital_production', levelId: 5, content: '打造智能制造体系，实现个性化定制生产' },

  // 数字化服务建议
  { categoryId: 'digital_service', levelId: 1, content: '建立线上客户服务渠道，完善基础服务功能' },
  { categoryId: 'digital_service', levelId: 2, content: '构建客户画像系统，实现精准服务推送' },
  { categoryId: 'digital_service', levelId: 3, content: '部署智能客服系统，提升服务响应效率' },
  { categoryId: 'digital_service', levelId: 4, content: '建立服务知识图谱，实现问题自动诊断' },
  { categoryId: 'digital_service', levelId: 5, content: '打造智慧服务体系，提供预测性维护服务' }
];