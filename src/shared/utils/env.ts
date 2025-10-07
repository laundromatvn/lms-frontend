export const getBackendUrl = () => {
  return import.meta.env.VITE_API_URL;
};

export const getPortalFrontendUrl = () => {
  return import.meta.env.VITE_PORTAL_FRONTEND_URL;
};
