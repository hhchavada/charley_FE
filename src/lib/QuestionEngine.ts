import { PresentationQuestionDTO } from "@/types/grant";
export type QuestionDef = PresentationQuestionDTO;

export class QuestionEngine {
  /**
   * Determine if a question should be visible based on its conditions, logic, and hidden state
   */
  static isQuestionVisible(question: QuestionDef, formData: Record<string, any>): boolean {
    return true; // Mocked for legacy page
  }

  /**
   * Get all visible questions for a specific step (recursive)
   */
  static getVisibleQuestions(questions: QuestionDef[], formData: Record<string, any>, step?: number): QuestionDef[] {
    const visible: QuestionDef[] = [];
    for (const q of questions) {
      if (step !== undefined && q.priority !== step) continue; // Note: using priority as step just to compile
      visible.push(q);
    }
    return visible;
  }

  /**
   * Recursively validate if a step is complete based on required visible questions
   */
  static isStepValid(questions: QuestionDef[], formData: Record<string, any>, step: number): boolean {
    const checkValid = (qs: QuestionDef[]): boolean => {
      for (const q of qs) {
        if (q.priority !== step) continue;
        if (q.validation?.required) {
          const parts = (q.fieldName || '').split('.');
          let val: any = formData;
          for (const part of parts) {
            if (val === undefined || val === null) {
              val = undefined;
              break;
            }
            val = val[part];
          }

          if (val === undefined || val === null || val === '') return false;
          if (Array.isArray(val) && val.length === 0) return false;
        }
      }
      return true;
    };

    return checkValid(questions);
  }
}
