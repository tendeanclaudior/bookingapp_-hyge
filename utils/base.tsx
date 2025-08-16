export const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const sliceTitleView = (value: string, length: number) => {
  if (!value) {
    return "";
  } else {
    return value?.length > length ? `${value?.slice(0, length)}...` : value;
  }
};
