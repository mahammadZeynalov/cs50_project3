export interface IUser {
    email: string
    token: string
}

export type Navigation = {
    navigate: (scene: string) => void;
  };