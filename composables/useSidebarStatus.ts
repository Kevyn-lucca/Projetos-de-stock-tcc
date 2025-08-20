export const useSidebarStatus = () => {
  return useState<boolean>("sidebarStatus", () => false);
};
