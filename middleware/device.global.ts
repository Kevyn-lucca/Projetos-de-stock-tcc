export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/" || to.path.startsWith("/login")) {
    return;
  }

  const userAgent = import.meta.server
    ? useRequestHeaders(["user-agent"])["user-agent"] || ""
    : navigator.userAgent || "";

  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent.toLowerCase()
    );

  const targetPath = to.path.replace(/\/$/, "");

  if (isMobile && !targetPath.endsWith("/mobile")) {
    return navigateTo(`${targetPath}/mobile`);
  }

  if (!isMobile && targetPath.endsWith("/mobile")) {
    return navigateTo(targetPath.replace(/\/mobile$/, "") || "/");
  }
});
