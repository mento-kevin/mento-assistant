# OPC Assistant - 创业助手 产品需求文档 (PRD)

**文档版本**: v1.4  
**最后更新**: 2026-05-31  
**产品状态**: 已上线

---

## 1. 产品概览

### 1.1 产品定位

OPC Assistant 是一个面向创业者的一站式管理平台，帮助用户从创业规划、日常管理到财务分析的全流程支持。

### 1.2 核心价值

- 🗺️ **智能规划**: AI 驱动的创业规划，帮助用户系统性地构建创业路径
- 📊 **数据洞察**: 实时财务和销售数据统计，辅助决策
- 📝 **成长复盘**: 每日/每周复盘 + AI 分析，持续迭代优化
- 💰 **财务管控**: 客户、合同、发票、税务全链路管理
- 💡 **知识沉淀**: 灵感笔记 + 知识库，经验资产化

### 1.3 目标用户

- 初期创业者（0-1 阶段）
- 小型企业主/个体户
- 自由职业者

---

## 2. 功能架构

```
OPC Assistant
├── 登录与认证
├── 首页仪表盘
├── 创业规划
├── 复盘系统
│   ├── 每日复盘
│   └── 周复盘
├── 财务中心
│   ├── 收支记账
│   ├── 税务情况
│   └── 客户管理
├── 知识库
├── 个人中心
└── AI 配置
```

---

## 3. 功能模块详细设计

### 3.1 登录与认证

#### 功能描述
提供快速体验和正式登录两种方式，降低用户使用门槛。

#### 核心功能
- **快速体验**: 只需输入昵称即可进入系统
- **数据持久化**: 本地存储所有数据
- **数据迁移**: 支持老版本数据自动迁移

#### 页面路径
`/login`

#### 数据模型
```typescript
// User - 用户基础信息
{
  id: string;
  nickname: string;
  avatar: string;           // Emoji 头像
  avatarUrl?: string;       // 自定义头像（Base64）
  backgroundUrl?: string;   // 个人中心背景图
  realName?: string;
  birthDate?: string;
  phone?: string;
  email?: string;
  address?: string;
  company?: string;         // 公司名称（用于税务AI分析）
  wechatQrCode?: string;    // 微信二维码
  signature?: string;
  isAdmin: boolean;
  aiConfig: AiConfig;
  reminderConfig: ReminderConfig;
  createdAt: string;
  updatedAt: string;
}
```

---

### 3.2 首页仪表盘

#### 功能描述
用户登录后的首页，展示核心业务数据概览和今日工作内容。

#### 核心功能
| 功能 | 说明 |
|------|------|
| **今日工作卡片** | 展示今日待办事项，支持标记完成、新增任务 |
| **财务统计卡片** | 本月收入、支出、利润、人员工资概览 |
| **销售统计卡片** | 新增客户、签约合同、回款金额等销售数据 |
| **AI 建议卡片** | 基于数据的智能建议 |
| **AI 状态卡片** | 显示 AI 连接状态、快速配置入口 |
| **提醒弹窗** | 每日复盘和周复盘定时提醒 |

#### 页面路径
`/dashboard`

#### 组件结构
- [TodayWorkCard](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/components/dashboard/TodayWorkCard.tsx) - 今日工作卡片
- [FinanceStatsCard](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/components/dashboard/FinanceStatsCard.tsx) - 财务统计卡片
- [SalesStatsCard](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/components/dashboard/SalesStatsCard.tsx) - 销售统计卡片
- [AiSuggestionCard](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/components/dashboard/AiSuggestionCard.tsx) - AI 建议卡片
- [AiStatusCard](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/components/dashboard/AiStatusCard.tsx) - AI 状态卡片
- [ReminderDialog](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/components/dashboard/ReminderDialog.tsx) - 提醒弹窗

---

### 3.3 创业规划

#### 功能描述
通过多步骤问卷 + AI 分析，生成 90 天创业规划，分阶段落地执行。

#### 核心功能
| 步骤 | 名称 | 核心内容 |
|------|------|----------|
| Step 1 | 市场定位 | 目标用户、痛点、竞品分析 |
| Step 2 | 价值主张 | 产品/服务核心价值 |
| Step 3 | 商业模式 | 盈利模式、渠道策略 |
| Step 4 | MVP 规划 | 最小可行产品定义 |
| Step 5 | 转化路径 | 用户获取、激活、留存 |
| Step 6 | 资源盘点 | 所需资源与获取方式 |

#### 规划结果
- 生成 3 个阶段（Phase）的执行计划
- 每个阶段包含任务清单
- 支持进度追踪和任务管理

#### 页面路径
`/planning`

#### 组件结构
- [StepWizard](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/components/planning/StepWizard.tsx) - 步骤向导
- [PhaseOverview](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/components/planning/PhaseOverview.tsx) - 阶段概览
- [PhaseDetail](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/components/planning/PhaseDetail.tsx) - 阶段详情

#### 数据模型
```typescript
// Planning - 创业规划
{
  id: string;
  userId: string;
  steps: StepData[];
  result: PlanResult | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// PlanPhase - 规划阶段
{
  id: string;
  name: string;
  duration: string;
  description: string;
  tasks: PlanTask[];
  progress: number;
  status: 'pending' | 'in_progress' | 'completed';
}
```

---

### 3.4 复盘系统

#### 3.4.1 每日复盘

##### 功能描述
每日工作结束后的回顾与总结，支持 AI 反馈分析，并将明日计划自动转为任务。

##### 核心功能
- **今日成就**: 记录 3-5 条成就，每条不少于 10 字
- **遇到的问题**: 记录遇到的困难与挑战
- **今日学习**: 记录学到的新知识
- **明日计划**: 记录明天要做的事，自动解析为任务
- **AI 反馈**: 基于复盘内容生成改进建议
- **心情选择**: 记录当日心情
- **自动保存知识库**: 复盘内容自动存入知识库"复盘"文件夹

##### 页面路径
`/daily-review`

##### 数据模型
```typescript
// DailyReview - 每日复盘
{
  id: string;
  userId: string;
  date: string;
  achievements: string[];
  problems: string[];
  learning: string;
  tomorrowPlan: string;
  aiFeedback: string;
  createdAt: string;
}
```

#### 3.4.2 周复盘

##### 功能描述
每周一次的深度回顾，总结经验教训，规划下周工作。

##### 核心功能
- **本周总结**: 整体回顾
- **关键成就**: 本周重要成果
- **遇到的问题**: 本周难点与挑战
- **学到的经验**: 经验总结
- **下周计划**: 下周工作安排
- **AI 反馈**: 周度分析建议
- **自动保存知识库**: 自动存入"复盘"文件夹

##### 页面路径
`/weekly-review`

##### 数据模型
```typescript
// WeeklyReview - 周复盘
{
  id: string;
  userId: string;
  weekStartDate: string;
  weekEndDate: string;
  weekNumber: number;
  weekSummary: string;
  keyAchievements: string[];
  problemsEncountered: string[];
  lessonsLearned: string;
  nextWeekPlan: string;
  aiFeedback: string;
  createdAt: string;
  updatedAt: string;
}
```

---

### 3.5 财务中心

#### 3.5.1 收支记账

##### 功能描述
快速记录收入和支出，支持分类、备注、日期，并生成趋势图表。

##### 核心功能
- **快速录入**: 一键添加收入/支出
- **分类管理**: 预设常用分类，支持自定义
- **交易列表**: 查看、编辑、删除历史记录
- **趋势图表**: 月度收支趋势（ECharts 可视化）
- **数据导出**: 支持 CSV 导出
- **发票追踪**: 支出可标记发票状态（待收/已收）

##### 数据模型
```typescript
// Transaction - 交易记录
{
  id: string;
  userId: string;
  type: 'income' | 'expense';
  amount: number;              // 金额（单位：分）
  category: string;
  description: string;
  date: string;
  createdAt: string;
  linkedId?: string;
  linkedType?: 'salary' | 'tax' | 'contract';
  invoiceStatus?: 'na' | 'pending' | 'received';
  invoiceImage?: string;
}
```

#### 3.5.2 税务情况

##### 功能描述
税务数据统计、AI 税务建议、工资管理、税务记录与提醒。

##### 核心功能
| 功能 | 说明 |
|------|------|
| **数据概览** | 支持本月/季度/年度切换，显示收入、支出、利润、待收发票 |
| **AI 税务建议** | 基于公司名称、注册地、财务数据生成建议 |
| **公司注册地** | 可设置公司注册地（用于税务建议） |
| **工资管理** | 员工工资、个税、社保公积金计算 |
| **税务计算器** | 增值税、所得税等计算 |
| **税务记录** | 纳税记录管理 |
| **税务提醒** | 申报截止日提醒 |

##### 数据切换逻辑
- **本月数据**: 展示当月收入、支出、利润、待收发票
- **季度数据**: 展示当季度累计数据 + 待收发票
- **年度数据**: 展示当年累计数据 + 待收发票
- 所有数据支持按钮切换，无瀑布流布局

##### 数据模型
```typescript
// Salary - 工资记录
{
  id: string;
  userId: string;
  name: string;
  position: string;
  monthlyGross: number;      // 月度应发（分）
  socialInsurance: number;    // 社保
  housingFund: number;        // 公积金
  specialDeduction: number;   // 专项扣除
  monthlyNet: number;         // 月度实发
  monthlyTax: number;         // 月度个税
  startDate: string;
  isActive: boolean;
  createdAt: string;
}

// TaxRecord - 纳税记录
{
  id: string;
  userId: string;
  taxType: 'vat' | 'income_tax' | 'corporate_tax' | 'surcharge' | 'other';
  amount: number;
  paidAmount: number;
  period: string;
  status: 'pending' | 'paid' | 'overdue';
  paidDate: string;
  description: string;
  createdAt: string;
}

// TaxReminder - 税务提醒
{
  id: string;
  userId: string;
  taxType: string;
  deadline: string;
  period: string;
  isNotified: boolean;
  status: 'pending' | 'done' | 'overdue';
  createdAt: string;
}
```

#### 3.5.3 客户管理

##### 功能描述
客户全生命周期管理，从线索跟进、合同签约、回款到履约完成。

##### 核心功能
| 功能 | 说明 |
|------|------|
| **客户列表** | 客户信息、状态、来源管理 |
| **合同管理** | 合同信息、金额、付款进度、附件上传 |
| **AI 合同分析** | 上传合同文档，AI 自动解析并生成建议 |
| **发票管理** | 开票状态、金额、邮寄追踪 |
| **回款记录** | 记录每笔回款 |
| **跟进记录** | 客户沟通记录 |
| **履约管理** | 项目进度、状态更新 |
| **销售数据统计** | 支持本月/近6月/年度筛选，可视化图表 |

##### 销售数据统计
- **月度筛选**: 可选任意月份查看数据
- **时间范围**: 本月、上月、近6月、今年
- **统计维度**: 新增客户、签约合同、合同金额、回款金额、履约项目
- **年度视图**: 查看全年各月数据趋势

##### 数据模型
```typescript
// Client - 客户
{
  id: string;
  userId: string;
  name: string;
  contact: string;
  phone: string;
  industry: string;
  status: 'potential' | 'following' | 'contracted' | 'fulfilling' | 'completed' | 'lost';
  source: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// Contract - 合同
{
  id: string;
  userId: string;
  clientId: string;
  name: string;
  amount: number;
  paidAmount: number;
  status: 'unpaid' | 'partial' | 'paid' | 'overdue';
  startDate: string;
  endDate: string;
  description: string;
  attachments?: ContractAttachment[];
  aiAnalysis?: string;
  aiAnalysisAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Invoice - 发票
{
  id: string;
  userId: string;
  contractId: string;
  clientId: string;
  type: 'ordinary' | 'special';
  amount: number;
  status: 'not_issued' | 'issued' | 'mailed' | 'received';
  issueDate: string;
  trackingNo: string;
  description: string;
  createdAt: string;
}

// PaymentRecord - 回款记录
{
  id: string;
  userId: string;
  contractId: string;
  amount: number;
  date: string;
  description: string;
  createdAt: string;
}

// FulfillmentRecord - 履约记录
{
  id: string;
  clientId: string;
  serviceItems: string;
  serviceContent: string;
  projectManager: string;
  startDate: string;
  endDate: string;
  progress: number;
  statusUpdates: FulfillmentStatusUpdate[];
  createdAt: string;
  updatedAt: string;
}
```

---

### 3.6 知识库

#### 功能描述
灵感记录、笔记管理、知识沉淀，支持文件夹、标签、搜索等功能。

#### 核心功能
| 功能 | 说明 |
|------|------|
| **笔记创建** | Markdown 编辑器，支持富文本 |
| **文件夹管理** | 新建、删除文件夹，笔记移动 |
| **系统文件夹** | "复盘"文件夹（自动保存复盘内容，不可删除） |
| **标签管理** | 笔记标签分类 |
| **搜索功能** | 标题、内容、标签搜索 |
| **附件支持** | 图片、文档、链接 |
| **AI 摘要** | 自动生成笔记摘要 |

#### 页面路径
`/inspiration`

#### 数据模型
```typescript
// Folder - 文件夹
{
  id: string;
  userId: string;
  name: string;
  isSystem: boolean;           // 系统文件夹不可删除
  createdAt: string;
  updatedAt: string;
}

// Inspiration - 灵感笔记
{
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: string[];
  source: string;
  aiSummary: string;
  attachments?: Attachment[];
  folderId?: string | null;
  createdAt: string;
  updatedAt: string;
}
```

---

### 3.7 个人中心

#### 功能描述
用户信息管理、名片预览、提醒设置。

#### 核心功能
- **个人资料编辑**: 昵称、头像、姓名、联系方式、地址、公司名称等
- **名片预览**: 生成个人名片，支持分享
- **提醒配置**: 每日复盘提醒时间、周复盘提醒时间（可选周几）
- **背景设置**: 个人中心自定义背景图

#### 页面路径
`/profile`、`/profile/edit`

#### 提醒配置数据模型
```typescript
// ReminderConfig - 提醒配置
{
  dailyReview: boolean;
  weeklySummary: boolean;
  reviewTime: string;               // HH:mm 格式
  weeklyReminderDay: number;         // 0=周日, 1=周一, ..., 6=周六
  weeklyReminderTime: string;
}
```

---

### 3.8 AI 配置

#### 功能描述
支持多种 AI 服务商配置，连接后可使用所有 AI 功能。

#### 支持的 AI 服务商
| 服务商 | 模型 | 说明 |
|--------|------|------|
| OpenAI | GPT-3.5, GPT-4 | 通用对话 |
| Anthropic | Claude 3, Claude 3.5 | 长文本分析 |
| 通义千问 | Qwen | 阿里云 |
| 智谱 AI | GLM | 清华系 |
| 月之暗面 | Kimi | 长文档处理 |
| DeepSeek | DeepSeek | 国产模型 |

#### 核心功能
- API Key 配置
- 模型选择
- API 端点自定义
- 连接测试
- 多模型切换

#### 页面路径
`/ai-config`

#### 数据模型
```typescript
// AiConfig - AI 配置
{
  provider: string;
  apiKey: string;
  model: string;
  apiEndpoint: string;
  isConnected: boolean;
  lastTestedAt: string;
}
```

---

## 4. 数据存储方案

### 4.1 存储技术
- **本地存储**: `localStorage` + `Zustand` 持久化
- **数据压缩**: 大体积数据（图片）使用 Base64 压缩
- **版本迁移**: 支持旧版本数据自动迁移

### 4.2 Store 设计
项目使用 `Zustand` 进行状态管理，各模块独立 Store：

| Store | 用途 | 路径 |
|-------|------|------|
| useAuthStore | 认证状态 | [useAuthStore.ts](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/store/useAuthStore.ts) |
| useUserStore | 用户信息 | [useUserStore.ts](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/store/useUserStore.ts) |
| useFinanceStore | 财务数据 | [useFinanceStore.ts](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/store/useFinanceStore.ts) |
| useTaxStore | 税务数据 | [useTaxStore.ts](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/store/useTaxStore.ts) |
| useClientStore | 客户数据 | [useClientStore.ts](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/store/useClientStore.ts) |
| useInspirationStore | 知识库 | [useInspirationStore.ts](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/store/useInspirationStore.ts) |
| useDailyReviewStore | 每日复盘 | [useDailyReviewStore.ts](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/store/useDailyReviewStore.ts) |
| useWeeklyReviewStore | 周复盘 | [useWeeklyReviewStore.ts](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/store/useWeeklyReviewStore.ts) |
| usePlanningStore | 创业规划 | [usePlanningStore.ts](file:///c:/Users/79849/Desktop/opc/opc-assistant/src/store/usePlanningStore.ts) |

---

## 5. 技术架构

### 5.1 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.2 | UI 框架 |
| TypeScript | 5.x | 类型安全 |
| Material-UI | 5.x | UI 组件库 |
| Zustand | 4.x | 状态管理 |
| React Router | 6.x | 路由管理 |
| Vite | 5.x | 构建工具 |
| ECharts | 5.x | 图表可视化 |
| Tailwind CSS | 3.x | 样式工具 |

### 5.2 目录结构
```
src/
├── components/          # 组件
│   ├── common/         # 通用组件
│   ├── dashboard/      # 仪表盘组件
│   ├── finance/        # 财务组件
│   ├── inspiration/    # 知识库组件
│   ├── layout/         # 布局组件
│   ├── planning/       # 规划组件
│   ├── profile/        # 个人中心组件
│   └── review/         # 复盘组件
├── pages/             # 页面
├── services/          # 服务层
│   ├── ai/           # AI 服务
│   └── storage.ts    # 存储服务
├── store/             # 状态管理
├── utils/             # 工具函数
├── types/             # 类型定义
├── constants/         # 常量
├── theme/             # 主题配置
└── test/              # 测试
```

### 5.3 响应式设计
- **移动端**: 底部导航栏，单栏布局
- **桌面端**: 侧边导航栏，多栏布局
- **适配断点**: `sm` (640px)、`md` (768px)、`lg` (1024px)

---

## 6. 版本历史

### v1.4 (2026-05-31) - 当前版本
- ✅ 删除财务中心公司资料模块
- ✅ 税务情况改为按钮切换方式（本月/季度/年度）
- ✅ 所有时间范围都包含待收发票数据
- ✅ AI 税务分析从个人资料获取公司名称
- ✅ 优化税务数据展示布局，移除瀑布流

### v1.3
- ✅ 新增周复盘功能
- ✅ 知识库文件夹管理（含系统"复盘"文件夹）
- ✅ 今日工作卡片，支持任务管理
- ✅ 周复盘提醒配置（可选周几）

### v1.2
- ✅ 客户管理销售数据统计（月度筛选、年度视图）
- ✅ 税务建议季度/年度数据
- ✅ 公司资料管理（文本+图片）

### v1.1
- ✅ 每日复盘 AI 反馈
- ✅ 知识库标签搜索
- ✅ 客户合同 AI 分析

### v1.0
- ✅ 初始版本发布
- ✅ 创业规划、收支记账、客户管理
- ✅ 每日复盘、知识库基础功能

---

## 7. 部署方案

### 7.1 部署环境
- **静态托管**: Netlify / Vercel
- **构建产物**: `dist/` 目录
- **路由配置**: SPA 路由需配置 `_redirects`

### 7.2 部署步骤
1. 构建: `npm run build`
2. 验证: `npm run preview`
3. 部署: 上传 `dist/` 内容到静态托管

详细指南见 [NETLIFY_DEPLOY_GUIDE.md](file:///c:/Users/79849/Desktop/opc/opc-assistant/NETLIFY_DEPLOY_GUIDE.md)

---

## 8. 未来规划 (Roadmap)

### 8.1 短期规划
- [ ] 数据导出/导入功能（JSON 格式）
- [ ] 数据云端同步（可选）
- [ ] 更多图表可视化

### 8.2 中长期规划
- [ ] 多用户协作
- [ ] 移动端 App
- [ ] 第三方服务集成（银行、发票平台）

---

## 9. 附录

### 9.1 术语表
| 术语 | 说明 |
|------|------|
| OPC | One-Person Company / Our Personal Coach 的缩写 |
| MVP | Minimum Viable Product，最小可行产品 |
| SPA | Single-Page Application，单页应用 |

### 9.2 相关文档
- [README.md](file:///c:/Users/79849/Desktop/opc/opc-assistant/README.md) - 项目介绍
- [NETLIFY_DEPLOY_GUIDE.md](file:///c:/Users/79849/Desktop/opc/opc-assistant/NETLIFY_DEPLOY_GUIDE.md) - 部署指南

---

**文档结束**
