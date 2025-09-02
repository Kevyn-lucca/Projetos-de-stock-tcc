export const useSidebarStatus = () => {
  return useState<boolean>("sidebarStatus", () => true);
};
