import { useState } from 'react';

export interface MemeTerm {
  term: string;
  explanation: string;
}

interface MemeTermCardProps {
  term: MemeTerm;
}

export function MemeTermCard({ term }: MemeTermCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="meme-term-container">
      <div className="meme-term">
        <span className="term-text">{term.term}</span>
        <button 
          className="toggle-button" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>
      {isExpanded && (
        <div className="explanation">
          {term.explanation}
        </div>
      )}
    </div>
  );
}

interface ResultsContainerProps {
  memeTerms: MemeTerm[];
}

export function ResultsContainer({ memeTerms }: ResultsContainerProps) {
  if (memeTerms.length === 0) {
    return null;
  }
  
  return (
    <div className="results-section">
      {memeTerms.map((term, index) => (
        <MemeTermCard key={index} term={term} />
      ))}
    </div>
  );
}
