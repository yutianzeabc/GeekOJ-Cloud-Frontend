declare namespace QuestionSubmit {
  type QuestionSubmitAdd = {
    language: string;
    code: string;
    questionId: number;
  };

  type QuestionSubmitQuery = {
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: 'descend' | 'ascend';
    questionId?: number;
  };

  type SubmitSummary = {
    total: number;
    easyPass: number;
    easyTotal: number;
    mediumPass: number;
    mediumTotal: number;
    hardPass: number;
    hardTotal: number;

    submitCount: number;
    passCount: number;
  };

  type JudgeInfo = {
    message: string;
    pass: number;
    total: number;
    memory: number;
    time: number;
    status: string;
    input: string;
    output: string;
    expectedOutput: string;
  };

  type QuestionSubmit = {
    id: number;
    language: string;
    code: string;
    judgeInfo: JudgeInfo;
    status: number;
    questionId: number;
    questionTitle: string;
    userId: number;
    createTime: any;
    updateTime: any;
  };
}
