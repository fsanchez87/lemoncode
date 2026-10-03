export interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export interface MemberCollection {
  members: MemberEntity[];
  // Puede no existir: por ejemplo, si GitHub no puede calcular la última página.
  lastPage?: number;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export const createEmptyMemberCollection = (): MemberCollection => ({
  members: [],
  canGoPrev: false,
  canGoNext: false,
});

// Valores permitidos para `per_page`, el parámetro que limita los miembros por respuesta.
export const perPageOptions = [5, 10, 25, 50];
