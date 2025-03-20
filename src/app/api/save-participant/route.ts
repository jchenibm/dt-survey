import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, company, position, contact, timestamp } = data;
    
    // 确保数据有效
    if (!name || !company || !position || !contact) {
      return NextResponse.json({ error: '缺少必要信息' }, { status: 400 });
    }
    
    // 处理CSV中的特殊字符，防止CSV注入
    const escapeCsvField = (field: string) => {
      // 如果字段包含逗号、双引号或换行符，则用双引号包裹并将内部的双引号替换为两个双引号
      if (field.includes(',') || field.includes('"') || field.includes('\n')) {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    };
    
    const csvLine = `${escapeCsvField(name)},${escapeCsvField(company)},${escapeCsvField(position)},${escapeCsvField(contact)},${timestamp}\n`;
    
    // 确保data目录存在
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // 写入CSV文件
    const filePath = path.join(dataDir, 'participants.csv');
    
    // 检查文件是否存在，如果不存在则创建并添加表头
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '姓名,单位,职务,联系方式,提交时间\n');
    }
    
    // 追加数据
    fs.appendFileSync(filePath, csvLine);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('保存参与者信息出错:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}