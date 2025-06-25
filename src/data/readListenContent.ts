
export const contentEn = [
  {
    id: 1,
    type: "article" as const,
    title: "Understanding the Grief of Lost Love",
    description: "Why breakups feel like death, and that's completely normal",
    readTime: "5 min read",
    category: "Understanding",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    type: "audio" as const,
    title: "Guided Meditation for Heartbreak",
    description: "A 10-minute practice to find peace in the storm",
    readTime: "10 min listen",
    category: "Practice",
    color: "from-purple-500 to-purple-600"
  },
  {
    id: 3,
    type: "article" as const,
    title: "Stop Checking Her Social Media",
    description: "Practical strategies to break the obsessive cycle",
    readTime: "7 min read",
    category: "Action",
    color: "from-orange-500 to-orange-600"
  },
  {
    id: 4,
    type: "audio" as const,
    title: "Building Self-Worth After Rejection",
    description: "Rediscovering your value beyond the relationship",
    readTime: "15 min listen",
    category: "Growth",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    id: 5,
    type: "article" as const,
    title: "When to Reach Out (And When Not To)",
    description: "Making smart decisions about contact",
    readTime: "6 min read",
    category: "Guidance",
    color: "from-red-500 to-red-600"
  },
  {
    id: 6,
    type: "audio" as const,
    title: "Sleep Stories for the Broken-Hearted",
    description: "Gentle narratives to help you rest",
    readTime: "20 min listen",
    category: "Rest",
    color: "from-indigo-500 to-indigo-600"
  }
];

export const contentRu = [
  {
    id: 1,
    type: "article" as const,
    title: "Понимание горя от потерянной любви",
    description: "Почему расставания ощущаются как смерть, и это совершенно нормально",
    readTime: "5 мин чтения",
    category: "Понимание",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    type: "audio" as const,
    title: "Управляемая медитация при разбитом сердце",
    description: "10-минутная практика, чтобы найти покой в буре",
    readTime: "10 мин прослушивания",
    category: "Практика",
    color: "from-purple-500 to-purple-600"
  },
  {
    id: 3,
    type: "article" as const,
    title: "Прекрати проверять её соцсети",
    description: "Практические стратегии, чтобы разорвать навязчивый цикл",
    readTime: "7 мин чтения",
    category: "Действие",
    color: "from-orange-500 to-orange-600"
  },
  {
    id: 4,
    type: "audio" as const,
    title: "Восстановление самооценки после отказа",
    description: "Переосмысление своей ценности вне отношений",
    readTime: "15 мин прослушивания",
    category: "Рост",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    id: 5,
    type: "article" as const,
    title: "Когда обращаться (А когда не стоит)",
    description: "Принятие умных решений о контакте",
    readTime: "6 мин чтения",
    category: "Руководство",
    color: "from-red-500 to-red-600"
  },
  {
    id: 6,
    type: "audio" as const,
    title: "Истории для сна для разбитых сердец",
    description: "Мягкие повествования, чтобы помочь тебе отдохнуть",
    readTime: "20 мин прослушивания",
    category: "Отдых",
    color: "from-indigo-500 to-indigo-600"
  }
];

export type ContentItem = typeof contentEn[0];
