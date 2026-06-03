
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取Excel文件
const excelPath = path.join(__dirname, '..', '邀请码.xlsx');
console.log('正在读取Excel文件:', excelPath);

try {
  const fileBuffer = fs.readFileSync(excelPath);
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  
  console.log('工作表名称:', workbook.SheetNames);
  
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
  console.log('原始数据:');
  console.log(data);
  
  // 提取邀请码
  const inviteCodes = [];
  
  for (let i = 0; i &lt; data.length; i++) {
    const row = data[i];
    if (row &amp;&amp; row[0]) {
      const code = String(row[0]).trim();
      if (code) {
        // 检查是否是标题行
        if (!(code.includes('邀请') || code.includes('码') || code.includes('Invite'))) {
          inviteCodes.push(code);
        }
      }
    }
  }
  
  console.log('\n提取的邀请码:');
  console.log(inviteCodes);
  
  // 保存为JSON文件
  const outputDir = path.join(__dirname, 'src', 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, 'invite-codes.json');
  fs.writeFileSync(outputPath, JSON.stringify(inviteCodes, null, 2));
  console.log('\n邀请码已保存到:', outputPath);
  
} catch (error) {
  console.error('读取Excel文件失败:', error);
}

