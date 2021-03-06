export interface IUser {
    email: string
    token: string
}

export type Navigation = {
    navigate: (scene: string, item?: any) => void;
  };

  export interface IArticle {
    source: {
        id: string
        name: string
    }
    author: string
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
}

export interface IResponse {
    status: string,
    totalResults: number,
    articles: IArticle[]
}

export interface IError {
    status: string
    message: string
    code: string
}