import { useEffect, useState } from "react";
import { fetchGuests, fetchGuestById } from "./api";
import GuestList from "./GuestList";
import GuestDetails from "./GuestDetails";
import "./index.css";


const PLACEHOLDER_GUESTS = [
  {
    id: 1,
    name: "Edmond Steuber",
    email: "Edmond.Steuber@example.com",
    phone: "466-489-9248 x348",
    bio: "Enjoys meeting new people and talking about product design.",
    job: "Product Designer",
  },
  {
    id: 2,
    name: "Nichole Luettgen",
    email: "Nichole_Luettgen43@example.org",
    phone: "1-333-579-6094 x83316",
    bio: "Loves hiking, coffee, and clean code.",
    job: "Software Engineer",
  },
  {
    id: 3,
    name: "Idell Mayert",
    email: "Idell_Mayert@example.org",
    phone: "583-250-0421 x9996",
    bio: "Writes data pipelines and reads sci-fi in free time.",
    job: "Data Engineer",
  },
  {
    id: 4,
    name: "Elyse Rath",
    email: "Elyse_Rath@example.net",
    phone: "(805) 768-9474",
    bio: "Passionate about customer experience and usability.",
    job: "UX Researcher",
  },
  {
    id: 5,
    name: "Emie Breitenberg",
    email: "Emie_Breitenberg2@example.net",
    phone: "(789) 242-4319 x81157",
    bio: "Organizes events and runs community meetups.",
    job: "Program Manager",
  },
  {
    id: 6,
    name: "Dante Gerhold",
    email: "Dante_Gerhold50@example.org",
    phone: "1-383-356-1556 x94696",
    bio: "Enjoys mentoring and building internal tools.",
    job: "Engineering Manager",
  },
  {
    id: 7,
    name: "Rubie Schroeder",
    email: "Rubie_Schroeder@example.com",
    phone: "428-291-4845 x23450",
    bio: "Always curious — learning a new framework every month.",
    job: "Frontend Developer",
  },
  {
    id: 8,
    name: "Magali Shanahan",
    email: "Magali_Shanahan@example.com",
    phone: "(291) 872-9310 x7182",
    bio: "Loves spreadsheets and metrics dashboards.",
    job: "Analyst",
  },
  {
    id: 9,
    name: "Keven Kertzmann",
    email: "Keven_Kertzmann@example.net",
    phone: "710.991.0976 x97567",
    bio: "Enjoys performance tuning and system design.",
    job: "Backend Engineer",
  },
  {
    id: 10,
    name: "Candido Glover",
    email: "Candido_Glover55@example.org",
    phone: "(839) 570-3037 x79930",
    bio: "Focuses on testing, reliability, and automation.",
    job: "QA Engineer",
  },
];

const USE_PLACEHOLDER_FALLBACK = true;


export default function App() {
  const [guests, setGuests] = useState(PLACEHOLDER_GUESTS);
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadDetails(id) {
      setError("");
      setLoadingDetails(true);
      try {
        const apiGuest = await fetchGuestById(id);

        const details = {
          id: apiGuest.id ?? id,
          name: apiGuest.name || apiGuest.fullName || "Unknown",
          email: apiGuest.email || "—",
          phone: apiGuest.phone || apiGuest.phoneNumber || "—",
          bio: apiGuest.bio || apiGuest.about || "—",
          job: apiGuest.job || apiGuest.occupation || apiGuest.title || "—",
        };

        const fallback = PLACEHOLDER_DETAILS[id];
        const merged =
          USE_PLACEHOLDER_FALLBACK && fallback ? { ...fallback, ...details } : details;

        if (!ignore) setSelectedGuest(merged);
      } catch (e) {
        if (!ignore) {
          setError(e.message || "Failed to load guest details.");
          if (USE_PLACEHOLDER_FALLBACK) setSelectedGuest(PLACEHOLDER_DETAILS[id] || null);
        }
      } finally {
        if (!ignore) setLoadingDetails(false);
      }
    }

    if (selectedGuestId == null) {
      setSelectedGuest(null);
      return;
    }

    loadDetails(selectedGuestId);
    return () => {
      ignore = true;
    };
  }, [selectedGuestId]);

  return (
    <div className="page">
      <div className="card">
        <h1>Guest List</h1>

        {error ? <p className="error">{error}</p> : null}

        {selectedGuestId == null ? (
          <GuestList
            guests={guests}
            loading={loadingList}
            onSelect={(id) => setSelectedGuestId(id)}
          />
        ) : (
          <GuestDetails
            guest={selectedGuest}
            loading={loadingDetails}
            onBack={() => setSelectedGuestId(null)}
          />
        )}
      </div>
    </div>
  );
}

