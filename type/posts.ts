export interface Post {
  slug: string;
  title: string;
  date: string;
}

export interface PostsRes {
  posts: Post[];
}

// API 响应数据
export interface PostsPageRes {
  posts: Post[];
  totalPages: number;
  currentPage: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
