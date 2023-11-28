const BASE_URL = "src/data";

export const fetchPlatforms = async () => {
  try {
    const res = await fetch(`${BASE_URL}/platforms.json`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching data: ", err);
    throw err;
  }
};
