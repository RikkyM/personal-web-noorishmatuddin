// ~/features/news/types.ts

export interface WPRendered {
  rendered: string;
  protected?: boolean;
}

export interface WPTerm {
  id: number;
  link: string;
  name: string;
  slug: string;
  taxonomy: "category" | "post_tag" | string;
}

export interface WPFeaturedMedia {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    width: number;
    height: number;
    sizes?: Record<
      string,
      {
        source_url: string;
        width: number;
        height: number;
      }
    >;
  };
}

export interface WPEmbedded {
  "wp:term"?: WPTerm[][];
  "wp:featuredmedia"?: WPFeaturedMedia[];
  author?: {
    id: number;
    name: string;
    avatar_urls?: Record<string, string>;
  }[];
}

export interface News {
  id: number;
  date: string;
  date_gmt: string;
  slug: string;
  status: "publish" | "draft" | "pending" | "future";
  link: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: WPEmbedded;
}
