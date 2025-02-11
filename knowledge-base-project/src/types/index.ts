export interface KnowledgeEntry {
  id: number;
  question: string;
  answer: string;
}

export interface QueryResponse {
  success: boolean;
  message: string;
  data?: KnowledgeEntry | KnowledgeEntry[];
}