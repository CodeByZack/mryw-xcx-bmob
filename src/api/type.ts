export interface IArticle {
  title: string;
  author: string;
  content: string;
  createTime: string;
  updateTime: string;
  imgUrl?: string;
}

export interface IUserInfo {
  _id: string;
  openid: string;
  userName: string;
  userAvatar: string;
  createTime: string;
  updateTime: string;
  wordCount: number;
  articleCount: number;
}
