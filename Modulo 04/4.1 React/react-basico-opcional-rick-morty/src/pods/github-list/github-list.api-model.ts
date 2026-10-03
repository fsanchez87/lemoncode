export interface MemberEntityApi {
  id: number;
  login: string;
  avatar_url: string;
}

// Cada propiedad conserva la URL completa indicada por GitHub para esa dirección.
export interface PageLinksApi {
  first?: string;
  prev?: string;
  next?: string;
  last?: string;
}

export interface MemberCollectionApi {
  members: MemberEntityApi[];
  links: PageLinksApi;
}
