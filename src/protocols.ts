import { Character, MonsterBookmark } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type Bookmark = Omit<MonsterBookmark, 'id'| 'userId' | 'createdAt' | 'updatedAt'>;

export type CreateCharacterParams = Omit<Character, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateBookmarkParams = Omit<MonsterBookmark, 'id' | 'createdAt' | 'updatedAt'>;