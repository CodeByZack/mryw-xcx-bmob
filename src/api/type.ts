export interface IArticle {
  id: string;
  title: string;
  author: string;
  content: string;
  createTime: string;
  updateTime: string;
  imgUrl?: string;
  readCount?: number;
}

export interface IUserInfo {
  id: string;
  openid: string;
  userName: string;
  userAvatar: string;
  createTime: string;
  updateTime: string;
  wordCount: number;
  articleCount: number;
}
