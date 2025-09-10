export default defineNuxtRouteMiddleware((to) => {
  const userAgent = import.meta.server
    ? useRequestHeaders(["user-agent"])["user-agent"] || ""
    : navigator.userAgent || "";

  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent.toLowerCase()
    );

  if (isMobile && !to.path.endsWith("/mobile")) {
    return navigateTo(`${to.path.replace(/\/$/, "")}/mobile`);
  }

  if (!isMobile && to.path.endsWith("/mobile")) {
    return navigateTo(to.path.replace(/\/mobile$/, "") || "/");
  }
});
