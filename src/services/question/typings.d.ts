declare namespace Question {
  type JudgeCase = {
    input: string;
    output: string;
  };

  type JudgeConfig = {
    timeLimit: number | null;
    memoryLimit: number | null;
    stackLimit: number | null;
  };

  type QuestionAdd = {
    title: string;
    tags: string[];
    content: string;
    difficulty: string;
    answer: string;
    judgeCase: JudgeCase[];
    judgeConfig: JudgeConfig;
  };

  type QuestionUpdate = {
    id: number;
    title: string;
    tags: string[];
    content: string;
    difficulty: string;
    answer: string;
    judgeCase: JudgeCase[];
    judgeConfig: JudgeConfig;
  };

  type QuestionQuery = {
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: 'descend' | 'ascend';

    tags?: string[];
    status?: string;
    difficulty?: string;
    keyword?: string;
  };

  type Question = {
    id: number;

    title: string;
    tags: string[];
    content: string;
    difficulty: string;
    answer: string;
    judgeCase: JudgeCase[];
    judgeConfig: JudgeConfig;

    submitNum: number;
    acceptedNum: number;
    thumbNum: number;
    favourNum: number;
    userId: number;
    createTime: any;
    updateTime: any;
  };

  type SafeQuestion = {
    id: number;

    status: string;

    title: string;
    tags: string[];
    content: string;
    difficulty: string;
    answer: string;
    judgeConfig: JudgeConfig;

    submitNum: number;
    acceptedNum: number;
    thumbNum: number;
    favourNum: number;
    createTime: any;
    updateTime: any;
  };
}
