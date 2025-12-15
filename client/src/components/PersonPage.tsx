import { useEffect, useState } from "react";
import type { Person } from "@shared/schema";
import { NameCard } from "./NameCard";
import { PhotoBox } from "./PhotoBox";
import { MessageBox } from "./MessageBox";

interface PersonPageProps {
  person: Person;
  pageNumber: number;
  isActive: boolean;
  bgGradient: string;
}

export function PersonPage({ person, pageNumber, isActive, bgGradient }: PersonPageProps) {
  const [showNameCard, setShowNameCard] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t1 = setTimeout(() => setShowPhoto(true), 100);
      const t2 = setTimeout(() => setShowNameCard(true), 400);
      const t3 = setTimeout(() => setShowMessage(true), 700);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    } else {
      setShowNameCard(false);
      setShowPhoto(false);
      setShowMessage(false);
    }
  }, [isActive]);

  return (
    <section 
      className={`page person-page ${isActive ? 'active' : 'left'}`}
      style={{ background: bgGradient }}
      data-testid={`page-person-${person.id}`}
    >
      <div className="person-content">
        <NameCard 
          name={person.name} 
          isSpecial={person.isSpecial} 
          isVisible={showNameCard}
        />
        <PhotoBox 
          src={person.photo} 
          alt={person.name}
          isSpecial={person.isSpecial}
          isVisible={showPhoto}
        />
        <MessageBox 
          message={person.message} 
          isVisible={showMessage}
        />
      </div>

      <style>{`
        .person-page {
          transition: background 0.8s ease;
        }

        .person-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          width: 100%;
          max-width: 400px;
        }
      `}</style>
    </section>
  );
}
