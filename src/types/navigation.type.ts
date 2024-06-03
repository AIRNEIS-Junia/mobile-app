export type Navigation = {
  navigation: {
    navigate: (name: string) => void;
    goBack: () => void;
  };
  route?: {
    params?: any;
  };
};
