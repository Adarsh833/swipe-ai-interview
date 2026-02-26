import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useState } from "react";

function InterviewerPage() {
  const history = useSelector((state: RootState) => state.candidate.history);
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [search, setSearch] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    null
  );

  const filteredCandidates = history
    .filter((candidate) =>
      candidate.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "desc" ? b.score - a.score : a.score - b.score
    );
  const selectedCandidate = history.find((c) => c.id === selectedCandidateId);

  return (
    <div style={{ padding: 20 }}>
      <h2>Interviewer Dashboard</h2>

      <input
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <hr />
      <button
        onClick={() =>
          setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))
        }
      >
        Sort: {sortOrder === "desc" ? "High → Low" : "Low → High"}
      </button>
      {filteredCandidates.length === 0 && <p>No candidates yet.</p>}

      {filteredCandidates.map((candidate) => (
        <div
          key={candidate.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 15,
            marginBottom: 15,
            cursor: "pointer",
            backgroundColor: "#f9f9f9",
            color: "black",
          }}
          onClick={() => setSelectedCandidateId(candidate.id)}
        >
          <h4>{candidate.name}</h4>
          <p>Email: {candidate.email}</p>
          <p
            style={{
              color:
                candidate.score > 70
                  ? "green"
                  : candidate.score > 40
                  ? "orange"
                  : "red",
            }}
          >
            Score: {candidate.score}
          </p>{" "}
          <p>{candidate.summary}</p>
        </div>
      ))}

      {selectedCandidate && (
        <div style={{ marginTop: 30 }}>
          <h3>Detailed View</h3>

          {selectedCandidate.questions.map((question, index) => (
            <div key={index} style={{ marginBottom: 15 }}>
              <strong>
                Q{index + 1}: {question}
              </strong>
              <p>Answer: {selectedCandidate.answers[index]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewerPage;
