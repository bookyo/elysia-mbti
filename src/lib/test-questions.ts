interface TestQuestion {
  id: number;
  text: string;
  options: {
    a: string;
    b: string;
  };
  scoring: {
    a: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
    b: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  };
}

export const testQuestions: TestQuestion[] = [
  {
    id: 1,
    text: "At a party do you:",
    options: {
      a: "Interact with many, including strangers",
      b: "Interact with a few, known to you"
    },
    scoring: { a: 'E', b: 'I' }
  },
  {
    id: 2,
    text: "Are you more:",
    options: {
      a: "Realistic than speculative",
      b: "Speculative than realistic"
    },
    scoring: { a: 'I', b: 'E' }
  },
  {
    id: 3,
    text: "Is it worse to:",
    options: {
      a: "Have your 'head in the clouds'",
      b: "Be 'in a rut'"
    },
    scoring: { a: 'I', b: 'E' }
  },
  {
    id: 4,
    text: "Are you more impressed by:",
    options: {
      a: "Principles",
      b: "Emotions"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 5,
    text: "Are more drawn toward the:",
    options: {
      a: "Convincing",
      b: "Touching"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 6,
    text: "Do you prefer to work:",
    options: {
      a: "To deadlines",
      b: "Just 'whenever'"
    },
    scoring: { a: 'N', b: 'S' }
  },
  {
    id: 7,
    text: "Do you tend to choose:",
    options: {
      a: "Rather carefully",
      b: "Somewhat impulsively"
    },
    scoring: { a: 'P', b: 'J' }
  },
  {
    id: 8,
    text: "At parties do you:",
    options: {
      a: "Stay late, with increasing energy",
      b: "Leave early with decreased energy"
    },
    scoring: { a: 'E', b: 'I' }
  },
  {
    id: 9,
    text: "Are you more attracted to:",
    options: {
      a: "Sensible people",
      b: "Imaginative people"
    },
    scoring: { a: 'S', b: 'N' }
  },
  {
    id: 10,
    text: "Are you more interested in:",
    options: {
      a: "What is actual",
      b: "What is possible"
    },
    scoring: { a: 'S', b: 'N' }
  },
  {
    id: 11,
    text: "In judging others are you more swayed by:",
    options: {
      a: "Laws than circumstances",
      b: "Circumstances than laws"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 12,
    text: "In approaching others is your inclination to be somewhat:",
    options: {
      a: "Objective",
      b: "Personal"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 13,
    text: "Are you more:",
    options: {
      a: "Punctual",
      b: "Leisurely"
    },
    scoring: { a: 'N', b: 'S' }
  },
  {
    id: 14,
    text: "Does it bother you more having things:",
    options: {
      a: "Incomplete",
      b: "Completed"
    },
    scoring: { a: 'P', b: 'J' }
  },
  {
    id: 15,
    text: "In your social groups do you:",
    options: {
      a: "Keep abreast of other's happenings",
      b: "Get behind on the news"
    },
    scoring: { a: 'E', b: 'I' }
  },
  {
    id: 16,
    text: "In doing ordinary things are you more likely to:",
    options: {
      a: "Do it the usual way",
      b: "Do it your own way"
    },
    scoring: { a: 'I', b: 'E' }
  },
  {
    id: 17,
    text: "Writers should:",
    options: {
      a: "'Say what they mean and mean what they say'",
      b: "Express things more by use of analogy"
    },
    scoring: { a: 'S', b: 'N' }
  },
  {
    id: 18,
    text: "Which appeals to you more:",
    options: {
      a: "Consistency of thought",
      b: "Harmonious human relationships"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 19,
    text: "Are you more comfortable in making:",
    options: {
      a: "Logical judgments",
      b: "Value judgments"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 20,
    text: "Do you want things:",
    options: {
      a: "Settled and decided",
      b: "Unsettled and undecided"
    },
    scoring: { a: 'N', b: 'S' }
  },
  {
    id: 21,
    text: "Would you say you are more:",
    options: {
      a: "Serious and determined",
      b: "Easy-going"
    },
    scoring: { a: 'P', b: 'J' }
  },
  {
    id: 22,
    text: "In phoning do you:",
    options: {
      a: "Rarely question that it will all be said",
      b: "Rehearse what you'll say"
    },
    scoring: { a: 'E', b: 'I' }
  },
  {
    id: 23,
    text: "Facts:",
    options: {
      a: "'Speak for themselves'",
      b: "Illustrate principles"
    },
    scoring: { a: 'S', b: 'N' }
  },
  {
    id: 24,
    text: "Are visionaries:",
    options: {
      a: "somewhat annoying",
      b: "rather fascinating"
    },
    scoring: { a: 'I', b: 'E' }
  },
  {
    id: 25,
    text: "Are you more often:",
    options: {
      a: "a cool-headed person",
      b: "a warm-hearted person"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 26,
    text: "Is it worse to be:",
    options: {
      a: "unjust",
      b: "merciless"
    },
    scoring: { a: 'F', b: 'T' }
  },
  {
    id: 27,
    text: "Should one usually let events occur:",
    options: {
      a: "by careful selection and choice",
      b: "randomly and by chance"
    },
    scoring: { a: 'N', b: 'S' }
  },
  {
    id: 28,
    text: "Do you feel better about:",
    options: {
      a: "having purchased",
      b: "having the option to buy"
    },
    scoring: { a: 'P', b: 'J' }
  },
  {
    id: 29,
    text: "In company do you:",
    options: {
      a: "initiate conversation",
      b: "wait to be approached"
    },
    scoring: { a: 'E', b: 'I' }
  },
  {
    id: 30,
    text: "Common sense is:",
    options: {
      a: "rarely questionable",
      b: "frequently questionable"
    },
    scoring: { a: 'S', b: 'N' }
  },
  {
    id: 31,
    text: "Children often do not:",
    options: {
      a: "make themselves useful enough",
      b: "exercise their fantasy enough"
    },
    scoring: { a: 'I', b: 'E' }
  },
  {
    id: 32,
    text: "In making decisions do you feel more comfortable with:",
    options: {
      a: "standards",
      b: "feelings"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 33,
    text: "Are you more:",
    options: {
      a: "firm than gentle",
      b: "gentle than firm"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 34,
    text: "Which is more admirable:",
    options: {
      a: "the ability to organize and be methodical",
      b: "the ability to adapt and make do"
    },
    scoring: { a: 'N', b: 'S' }
  },
  {
    id: 35,
    text: "Do you put more value on:",
    options: {
      a: "infinite",
      b: "open-minded"
    },
    scoring: { a: 'P', b: 'J' }
  },
  {
    id: 36,
    text: "Does new and non-routine interaction with others:",
    options: {
      a: "stimulate and energize you",
      b: "tax your reserves"
    },
    scoring: { a: 'E', b: 'I' }
  },
  {
    id: 37,
    text: "Are you more frequently:",
    options: {
      a: "a practical sort of person",
      b: "a fanciful sort of person"
    },
    scoring: { a: 'S', b: 'N' }
  },
  {
    id: 38,
    text: "Are you more likely to:",
    options: {
      a: "see how others are useful",
      b: "see how others see"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 39,
    text: "Which is more satisfying:",
    options: {
      a: "to discuss an issue thoroughly",
      b: "to arrive at agreement on an issue"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 40,
    text: "Which rules you more:",
    options: {
      a: "your head",
      b: "your heart"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 41,
    text: "Are you more comfortable with work that is:",
    options: {
      a: "contracted",
      b: "done on a casual basis"
    },
    scoring: { a: 'N', b: 'S' }
  },
  {
    id: 42,
    text: "Do you tend to look for:",
    options: {
      a: "the orderly",
      b: "whatever turns up"
    },
    scoring: { a: 'P', b: 'J' }
  },
  {
    id: 43,
    text: "Do you prefer:",
    options: {
      a: "many friends with brief contact",
      b: "a few friends with more lengthy contact"
    },
    scoring: { a: 'E', b: 'I' }
  },
  {
    id: 44,
    text: "Do you go more by:",
    options: {
      a: "facts",
      b: "principles"
    },
    scoring: { a: 'S', b: 'N' }
  },
  {
    id: 45,
    text: "Are you more interested in:",
    options: {
      a: "production and distribution",
      b: "design and research"
    },
    scoring: { a: 'S', b: 'N' }
  },
  {
    id: 46,
    text: "Which is more of a compliment:",
    options: {
      a: "'There is a very logical person.'",
      b: "'There is a very sentimental person.'"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 47,
    text: "Do you value in yourself more that you are:",
    options: {
      a: "unwavering",
      b: "devoted"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 48,
    text: "Do you more often prefer the",
    options: {
      a: "final and unalterable statement",
      b: "tentative and preliminary statement"
    },
    scoring: { a: 'N', b: 'S' }
  },
  {
    id: 49,
    text: "Are you more comfortable:",
    options: {
      a: "after a decision",
      b: "before a decision"
    },
    scoring: { a: 'P', b: 'J' }
  },
  {
    id: 50,
    text: "Do you:",
    options: {
      a: "speak easily and at length with strangers",
      b: "find little to say to strangers"
    },
    scoring: { a: 'E', b: 'I' }
  },
  {
    id: 51,
    text: "Are you more likely to trust your:",
    options: {
      a: "experience",
      b: "hunch"
    },
    scoring: { a: 'S', b: 'N' }
  },
  {
    id: 52,
    text: "Do you feel:",
    options: {
      a: "more practical than ingenious",
      b: "more ingenious than practical"
    },
    scoring: { a: 'S', b: 'N' }
  },
  {
    id: 53,
    text: "Which person is more to be complimented - one of:",
    options: {
      a: "clear reason",
      b: "strong feeling"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 54,
    text: "Are you inclined more to be:",
    options: {
      a: "fair-minded",
      b: "sympathetic"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 55,
    text: "Is it preferable mostly to:",
    options: {
      a: "make sure things are arranged",
      b: "just let things happen"
    },
    scoring: { a: 'N', b: 'S' }
  },
  {
    id: 56,
    text: "In relationships should most things be:",
    options: {
      a: "re-negotiable",
      b: "random and circumstantial"
    },
    scoring: { a: 'N', b: 'S' }
  },
  {
    id: 57,
    text: "When the phone rings do you:",
    options: {
      a: "hasten to get to it first",
      b: "hope someone else will answer"
    },
    scoring: { a: 'E', b: 'I' }
  },
  {
    id: 58,
    text: "Do you prize more in yourself:",
    options: {
      a: "a strong sense of reality",
      b: "a vivid imagination"
    },
    scoring: { a: 'S', b: 'N' }
  },
  {
    id: 59,
    text: "Are you drawn more to:",
    options: {
      a: "fundamentals",
      b: "overtones"
    },
    scoring: { a: 'S', b: 'N' }
  },
  {
    id: 60,
    text: "Which seems the greater error:",
    options: {
      a: "to be too passionate",
      b: "to be too objective"
    },
    scoring: { a: 'F', b: 'T' }
  },
  {
    id: 61,
    text: "Do you see yourself as basically:",
    options: {
      a: "hard-headed",
      b: "soft-hearted"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 62,
    text: "Which situation appeals to you more:",
    options: {
      a: "the structured and scheduled",
      b: "the unstructured and unscheduled"
    },
    scoring: { a: 'N', b: 'S' }
  },
  {
    id: 63,
    text: "Are you a person that is more:",
    options: {
      a: "routinized than whimsical",
      b: "whimsical than routinized"
    },
    scoring: { a: 'N', b: 'S' }
  },
  {
    id: 64,
    text: "Are you more inclined to be:",
    options: {
      a: "easy to approach",
      b: "somewhat reserved"
    },
    scoring: { a: 'E', b: 'I' }
  },
  {
    id: 65,
    text: "In writings do you prefer:",
    options: {
      a: "the more literal",
      b: "the more figurative"
    },
    scoring: { a: 'S', b: 'N' }
  },
  {
    id: 66,
    text: "Is it harder for you to:",
    options: {
      a: "identify with others",
      b: "utilize others"
    },
    scoring: { a: 'F', b: 'T' }
  },
  {
    id: 67,
    text: "Which do you wish more for yourself:",
    options: {
      a: "clarity of reason",
      b: "strength of compassion"
    },
    scoring: { a: 'T', b: 'F' }
  },
  {
    id: 68,
    text: "Which is the greater fault:",
    options: {
      a: "being indiscriminate",
      b: "being critical"
    },
    scoring: { a: 'N', b: 'S' }
  },
  {
    id: 69,
    text: "Do you prefer the:",
    options: {
      a: "planned event",
      b: "unplanned event"
    },
    scoring: { a: 'P', b: 'J' }
  },
  {
    id: 70,
    text: "Do you tend to be more:",
    options: {
      a: "deliberate than spontaneous",
      b: "spontaneous than deliberate"
    },
    scoring: { a: 'P', b: 'J' }
  }
];

// 多语言问题翻译
export const testQuestionsTranslations = {
  zh: [
    {
      text: "在派对上，您会：",
      options: {
        a: "与许多人互动，包括陌生人",
        b: "只与少数您认识的人互动"
      }
    },
    {
      text: "您更倾向于：",
      options: {
        a: "现实而非推测",
        b: "推测而非现实"
      }
    },
    {
      text: "更糟糕的是：",
      options: {
        a: "'想入非非'",
        b: "'墨守成规'"
      }
    },
    {
      text: "给您留下更深刻印象的是：",
      options: {
        a: "原则",
        b: "情感"
      }
    },
    {
      text: "您更容易被以下哪项所吸引：",
      options: {
        a: "有说服力的",
        b: "感人的"
      }
    },
    {
      text: "您喜欢怎样工作：",
      options: {
        a: "在截止日期前完成",
        b: "'随时'都行"
      }
    },
    {
      text: "您倾向于如何选择：",
      options: {
        a: "相当谨慎",
        b: "有点冲动"
      }
    },
    {
      text: "在派对上，您会：",
      options: {
        a: "待到很晚，精力越来越旺盛",
        b: "提早离开，精力逐渐耗尽"
      }
    },
    {
      text: "您更容易被哪种人吸引：",
      options: {
        a: "明智的人",
        b: "富有想象力的人"
      }
    },
    {
      text: "您对什么更感兴趣：",
      options: {
        a: "什么是真实的",
        b: "什么是可能的"
      }
    },
    {
      text: "在评判他人时，您更容易受到以下哪项的影响：",
      options: {
        a: "法律而非具体情况",
        b: "具体情况而非法律"
      }
    },
    {
      text: "与他人接触时，您的倾向是：",
      options: {
        a: "有点客观",
        b: "有点个人化"
      }
    },
    {
      text: "您更倾向于：",
      options: {
        a: "准时",
        b: "悠闲"
      }
    },
    {
      text: "让您更烦恼的是事情：",
      options: {
        a: "未完成",
        b: "已完成"
      }
    },
    {
      text: "在您的社交圈中，您会：",
      options: {
        a: "随时了解他人的最新动态",
        b: "消息落后"
      }
    },
    {
      text: "在做普通事情时，您更可能：",
      options: {
        a: "按照通常的方式做",
        b: "按照自己的方式做"
      }
    },
    {
      text: "作家应该：",
      options: {
        a: "'言其所指，意如其言'",
        b: "更多地使用类比来表达事物"
      }
    },
    {
      text: "哪项对您更有吸引力：",
      options: {
        a: "思维的连贯性",
        b: "和谐的人际关系"
      }
    },
    {
      text: "您在做以下哪种判断时更自在：",
      options: {
        a: "逻辑判断",
        b: "价值判断"
      }
    },
    {
      text: "您希望事情：",
      options: {
        a: "已解决和已决定",
        b: "未解决和未决定"
      }
    },
    {
      text: "您认为自己更：",
      options: {
        a: "认真和坚定",
        b: "随和"
      }
    },
    {
      text: "打电话时，您会：",
      options: {
        a: "很少怀疑该说的都会说到",
        b: "排练要说的话"
      }
    },
    {
      text: "事实：",
      options: {
        a: "'不言自明'",
        b: "阐明原则"
      }
    },
    {
      text: "有远见的人：",
      options: {
        a: "有点烦人",
        b: "相当迷人"
      }
    },
    {
      text: "您通常是：",
      options: {
        a: "一个头脑冷静的人",
        b: "一个热心肠的人"
      }
    },
    {
      text: "更糟糕的是：",
      options: {
        a: "不公正",
        b: "无情"
      }
    },
    {
      text: "通常应该让事件如何发生：",
      options: {
        a: "通过仔细的选择和抉择",
        b: "随机和偶然"
      }
    },
    {
      text: "您对什么感觉更好：",
      options: {
        a: "已经购买",
        b: "有购买的选择权"
      }
    },
    {
      text: "在社交场合，您会：",
      options: {
        a: "主动发起对话",
        b: "等待别人接近"
      }
    },
    {
      text: "常识是：",
      options: {
        a: "很少有问题",
        b: "经常有问题"
      }
    },
    {
      text: "孩子们通常不会：",
      options: {
        a: "让自己足够有用",
        b: "充分发挥他们的想象力"
      }
    },
    {
      text: "做决定时，您对以下哪项感觉更舒服：",
      options: {
        a: "标准",
        b: "感受"
      }
    },
    {
      text: "您更：",
      options: {
        a: "坚定而非温柔",
        b: "温柔而非坚定"
      }
    },
    {
      text: "哪项更值得钦佩：",
      options: {
        a: "组织和有条理的能力",
        b: "适应和随机应变的能力"
      }
    },
    {
      text: "您更看重：",
      options: {
        a: "无限",
        b: "思想开放"
      }
    },
    {
      text: "与他人的新的、非常规的互动会：",
      options: {
        a: "激励您，让您精力充沛",
        b: "消耗您的精力"
      }
    },
    {
      text: "您更经常是：",
      options: {
        a: "一个务实的人",
        b: "一个爱幻想的人"
      }
    },
    {
      text: "您更可能：",
      options: {
        a: "看到别人如何有用",
        b: "看到别人如何看待事物"
      }
    },
    {
      text: "哪项更令人满意：",
      options: {
        a: "彻底讨论一个问题",
        b: "就一个问题达成一致"
      }
    },
    {
      text: "支配您更多的是：",
      options: {
        a: "您的头脑",
        b: "您的心灵"
      }
    },
    {
      text: "您对哪种工作更感舒服：",
      options: {
        a: "有合同约束的",
        b: "临时性的"
      }
    },
    {
      text: "您倾向于寻找：",
      options: {
        a: "有序的",
        b: "任何出现的"
      }
    },
    {
      text: "您更喜欢：",
      options: {
        a: "许多朋友，但接触短暂",
        b: "少数朋友，但接触更长"
      }
    },
    {
      text: "您更多地依据：",
      options: {
        a: "事实",
        b: "原则"
      }
    },
    {
      text: "您对什么更感兴趣：",
      options: {
        a: "生产和分销",
        b: "设计和研究"
      }
    },
    {
      text: "哪项更是赞美：",
      options: {
        a: "'这是一个非常有逻辑的人。'",
        b: "'这是一个非常多愁善感的人。'"
      }
    },
    {
      text: "您更看重自己的哪一点：",
      options: {
        a: "坚定不移",
        b: "忠诚"
      }
    },
    {
      text: "您更常喜欢：",
      options: {
        a: "最终且不可更改的陈述",
        b: "暂时和初步的陈述"
      }
    },
    {
      text: "您在何时更自在：",
      options: {
        a: "做出决定后",
        b: "做出决定前"
      }
    },
    {
      text: "您会：",
      options: {
        a: "与陌生人轻松、滔滔不绝地交谈",
        b: "发现与陌生人没什么可说的"
      }
    },
    {
      text: "您更可能相信您的：",
      options: {
        a: "经验",
        b: "直觉"
      }
    },
    {
      text: "您觉得：",
      options: {
        a: "更实际而非巧妙",
        b: "更巧妙而非实际"
      }
    },
    {
      text: "哪种人更值得称赞：",
      options: {
        a: "理性清晰的人",
        b: "感情强烈的人"
      }
    },
    {
      text: "您更倾向于：",
      options: {
        a: "公正",
        b: "有同情心"
      }
    },
    {
      text: "通常更可取的是：",
      options: {
        a: "确保事情安排妥当",
        b: "顺其自然"
      }
    },
    {
      text: "在关系中，大多数事情应该是：",
      options: {
        a: "可重新协商的",
        b: "随机和视情况而定的"
      }
    },
    {
      text: "电话铃响时，您会：",
      options: {
        a: "赶紧第一个去接",
        b: "希望别人会接"
      }
    },
    {
      text: "您更珍视自己的：",
      options: {
        a: "强烈的现实感",
        b: "生动的想象力"
      }
    },
    {
      text: "您更容易被以下哪项所吸引：",
      options: {
        a: "基础",
        b: "言外之意"
      }
    },
    {
      text: "哪个似乎是更大的错误：",
      options: {
        a: "过于热情",
        b: "过于客观"
      }
    },
    {
      text: "您认为自己基本上是：",
      options: {
        a: "头脑冷静的",
        b: "心地善良的"
      }
    },
    {
      text: "哪种情况对您更有吸引力：",
      options: {
        a: "有结构和计划的",
        b: "没有结构和计划的"
      }
    },
    {
      text: "您是更倾向于：",
      options: {
        a: "按部就班而非随心所欲",
        b: "随心所欲而非按部就班"
      }
    },
    {
      text: "您更倾向于：",
      options: {
        a: "容易接近",
        b: "有点矜持"
      }
    },
    {
      text: "在写作中，您更喜欢：",
      options: {
        a: "更直白的",
        b: "更比喻的"
      }
    },
    {
      text: "对您来说更难的是：",
      options: {
        a: "与他人产生共鸣",
        b: "利用他人"
      }
    },
    {
      text: "您更希望自己拥有：",
      options: {
        a: "清晰的理性",
        b: "强烈的同情心"
      }
    },
    {
      text: "哪个是更大的缺点：",
      options: {
        a: "滥竽充数",
        b: "吹毛求疵"
      }
    },
    {
      text: "您更喜欢：",
      options: {
        a: "有计划的活动",
        b: "没有计划的活动"
      }
    },
    {
      text: "您倾向于更：",
      options: {
        a: "深思熟虑而非自发",
        b: "自发而非深思熟虑"
      }
    }
  ]
};

export function calculateMBTIType(answers: { [key: number]: 'a' | 'b' }): string {
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  testQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer) {
      const score = question.scoring[answer];
      scores[score]++;
    }
  });

  return `${scores.E > scores.I ? 'E' : 'I'}${scores.S > scores.N ? 'S' : 'N'}${scores.T > scores.F ? 'T' : 'F'}${scores.J > scores.P ? 'J' : 'P'}`;
}