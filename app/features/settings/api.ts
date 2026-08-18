export async function fetchSiteSettings() {
  const res = await fetch(`${import.meta.env.VITE_API_SETTINGS}/settings`);

  if (!res.ok) {
    throw new Error("Failed to fecth site settings");
  }

  return res.json();
}
