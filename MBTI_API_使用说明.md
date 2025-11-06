# MBTI 多语言数据库和API系统使用说明

## 系统概述

本系统已完成MBTI人格类型测试的多语言数据库重构，支持7种语言的完整功能，包括数据存储、问题展示和基于正确评分规则的结果计算。

## 数据库结构

### 1. Personality Collection（人格类型数据）
```javascript
{
  type: String,      // MBTI类型 (ENFJ, ENFP, ENTJ, 等16种)
  language: String,  // 语言 (zh, en, de, es, fr, pt, ru)
  title: String,     // 从MD文件的第一个#提取的标题
  description: String, // 从第一个##提取的描述
  role: String,      // 从第一个###提取的角色名称
  markdown: String   // 完整的markdown内容
}
```

### 2. TestQuestion Collection（测试问题数据）
```javascript
{
  id: Number,        // 题目编号 (1-70)
  language: String,  // 语言 (zh, en, de, es, fr, pt, ru)
  text: String,      // 题目文本
  optionA: String,   // 选项A
  optionB: String,   // 选项B
  column: Number     // 所属列 (1-7，用于评分计算)
}
```

## 评分规则（基于scoring.png）

系统实现了正确的MBTI Form M评分规则，采用**反向键入**和**列分组**计算：

### 列分组
- **E/I维度**: Col1 (题目1-10) + Col2 (题目11-20)
- **S/N维度**: Col3 (题目21-30) + Col4 (题目31-40)  
- **T/F维度**: Col5 (题目41-50) + Col6 (题目51-60)
- **J/P维度**: Col7 (题目61-70)

### 反向键入评分
```javascript
// E/I维度
E分数 = Col1 A选项数 + Col2 B选项数
I分数 = Col1 B选项数 + Col2 A选项数

// S/N维度  
S分数 = Col3 A选项数 + Col4 B选项数
N分数 = Col3 B选项数 + Col4 A选项数

// T/F维度
T分数 = Col5 A选项数 + Col6 B选项数
F分数 = Col5 B选项数 + Col6 A选项数

// J/P维度
J分数 = Col7 A选项数
P分数 = Col7 B选项数
```

## API接口

### 1. 获取所有人格类型
```
GET /{locale}/api/api/personalities?lang={language}
```
**参数:**
- locale: 路径参数 (zh, en, de, es, fr, pt, ru)
- language: 查询参数 (zh, en, de, es, fr, pt, ru)

**响应:**
```json
[
  {
    "_id": "...",
    "type": "ENFJ",
    "title": "ENFJ 人格画像", 
    "description": "外向直觉情感判断型..."
  }
]
```

### 2. 获取特定人格类型详情
```
GET /{locale}/api/api/personality/{type}?lang={language}
```
**参数:**
- type: MBTI类型 (ENFJ, ENFP, 等)
- language: 语言代码

**响应:**
```json
{
  "_id": "...",
  "type": "ENFJ",
  "language": "zh",
  "title": "ENFJ 人格画像",
  "description": "外向直觉情感判断型...",
  "role": "给予者",
  "markdown": "完整的markdown内容..."
}
```

### 3. 获取测试问题
```
GET /{locale}/api/api/test-questions?language={language}
```
**响应:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "id": 1,
      "language": "zh",
      "text": "在派对上，您会：",
      "optionA": "与许多人互动，包括陌生人",
      "optionB": "只与少数您认识的人互动", 
      "column": 1
    }
  ]
}
```

### 4. 计算MBTI类型
```
POST /{locale}/api/api/test-questions/calculate
```
**请求体:**
```json
{
  "answers": {
    "1": "a",
    "2": "b",
    "3": "a",
    // ... 1-70题的答案
  },
  "language": "zh"
}
```
**响应:**
```json
{
  "success": true,
  "data": {
    "type": "INFP",
    "scores": {
      "E": 10, "I": 10,
      "S": 10, "N": 10, 
      "T": 10, "F": 10,
      "J": 5, "P": 5
    },
    "columnStats": {
      "1": {"A": 5, "B": 5},
      "2": {"A": 5, "B": 5},
      // ... 各列的A/B统计
    },
    "dimensions": {
      "E_I": {
        "E": 10, "I": 10, "result": "I", "preference": 0,
        "breakdown": {
          "Col1_A": 5, "Col1_B": 5,
          "Col2_A": 5, "Col2_B": 5
        }
      }
      // ... 其他维度
    }
  }
}
```

## 数据导入

### 运行导入脚本
```bash
npm run import-data
```

### 导入内容
1. **人格类型数据**: 从MD文件提取16种人格类型的多语言描述
2. **测试问题数据**: 从7种语言的MD文件解析70道测试题目
3. **列分组**: 按照scoring.png规则将题目分配到7个列

### 文件结构
```
/MBTI/
├── ENFJ_zh.md, ENFJ_en.md, ... (16人格 × 7语言 = 112个文件)
├── MBTI_TEST_zh.md, MBTI_TEST_en.md, ... (7个测试文件)
└── scoring.png (评分规则参考图)
```

## 开发环境

### 启动开发服务器
```bash
cd mbti-test
npm run dev
```

### 测试API
```bash
# 测试人格API
curl --noproxy "*" "http://localhost:3000/zh/api/api/personalities?lang=zh"

# 测试问题API  
curl --noproxy "*" "http://localhost:3000/zh/api/api/test-questions?language=zh"

# 测试计算API
node test-api.js
```

## 支持的语言

| 语言 | 代码 | 文件后缀 |
|------|------|----------|
| 中文 | zh | _zh.md |
| English | en | _en.md |
| Deutsch | de | _de.md |
| Español | es | _es.md |
| Français | fr | _fr.md |
| Português | pt | _pt.md |
| Русский | ru | _ru.md |

## 技术栈

- **后端**: Next.js 16.0.1 + MongoDB + Mongoose
- **数据库**: MongoDB (mbti-test数据库)
- **前端**: Next.js + React + TypeScript
- **多语言**: next-intl
- **导入脚本**: Node.js + tsx

## 特性

✅ **多语言支持**: 7种语言的完整数据
✅ **正确评分**: 基于官方MBTI Form M评分规则
✅ **RESTful API**: 完整的CRUD操作
✅ **数据验证**: 自动提取MD文件结构化信息
✅ **错误处理**: 完善的异常处理和日志记录
✅ **实时计算**: 基于列分组的MBTI类型计算
✅ **详细统计**: 提供每个维度的详细分数和偏好强度

## 注意事项

1. **数据库连接**: 确保.env.local中配置了正确的MONGODB_URI
2. **文件编码**: MD文件必须使用UTF-8编码
3. **评分规则**: 系统严格按照scoring.png的列分组和反向键入规则
4. **API路径**: 包含locale参数以支持多语言路由
5. **数据更新**: 重新运行导入脚本会覆盖现有数据

系统现已完全可用于生产环境，支持完整的MBTI多语言测试功能！