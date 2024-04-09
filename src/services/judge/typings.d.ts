declare namespace QuestionRun {
  type QuestionRunResult = {
    code: number;
    input: string;
    output: string;
  };

  type QuestionRunRequest = {
    code: string;
    input: string;
    language: string;
  };
}
