export interface BGGThreadEntry {
  id: number;
  username: string;
  link: string;
  postdate: string;
  editdate: string;
  numedits: number;
  subject: string;
  body: string;
}

export interface BGGThread {
  id: number;
  numarticles: number;
  link: string;
  subject: string;
  articles: {
    article: BGGThreadEntry[];
  };
}

export interface BGGThreadApiResponse {
  thread: BGGThread;
}
