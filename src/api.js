const BASE_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";

const COHORT_CODE = "/2109-CPU-RM-WEB-PT";

function buildUrl(path) {
    return `${BASE_URL}/${COHORT_CODE}${path}`;
  }
  
  async function request(path) {
    const res = await fetch(buildUrl(path));
    const data = await res.json();
  
    if (!res.ok) {
      const msg = data?.error?.message || `Request failed: ${res.status}`;
      throw new Error(msg);
    }
    return data?.data ?? data;
}

export async function fetchGuests() {
  return request("/guests");
}

export async function fetchGuestById(id) {
  return request(`/guests/${id}`);
}

