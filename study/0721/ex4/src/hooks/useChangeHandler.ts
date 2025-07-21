export const useChangeHandler = (
  setInput: React.Dispatch<React.SetStateAction<string>>,
  startTransition: React.TransitionStartFunction,
  setList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInput(value);

    startTransition(() => {
      // 비긴급 상태 업데이트
      const items: string[] = [];

      for (let i = 0; i < 1000; i++) {
        items.push(value);
      }

      setList(items);
    });
  };

  return handleChange;
};
