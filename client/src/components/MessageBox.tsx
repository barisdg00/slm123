import { useEffect, useState, useRef } from "react";

interface MessageBoxProps {
  message: string;
  isVisible: boolean;
  typingSpeed?: number;
}

export function MessageBox({ message, isVisible, typingSpeed = 30 }: MessageBoxProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText("");
      indexRef.current = 0;
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    indexRef.current = 0;

    const typeChar = () => {
      if (indexRef.current < message.length) {
        setDisplayedText(message.substring(0, indexRef.current + 1));
        indexRef.current++;
        const randomDelay = typingSpeed + (Math.random() * 20 - 10);
        setTimeout(typeChar, randomDelay);
      } else {
        setIsTyping(false);
      }
    };

    const startDelay = setTimeout(typeChar, 600);
    return () => clearTimeout(startDelay);
  }, [message, isVisible, typingSpeed]);

  const highlightText = (text: string) => {
    let result = text;
    result = result.replace(/iyi ki/gi, '<span class="hl">iyi ki</span>');
    result = result.replace(/seni seviyorum/gi, '<span class="hl glow">seni seviyorum</span>');
    result = result.replace(/mutlu yıllar/gi, '<span class="hl">mutlu yıllar</span>');
    result = result.replace(/doğdun/gi, '<span class="hl">doğdun</span>');
    return result;
  };

  return (
    <div 
      className={`message-box ${isVisible ? 'visible' : ''}`}
      data-testid="message-box"
    >
      <p 
        className="msg-text"
        dangerouslySetInnerHTML={{ __html: highlightText(displayedText) }}
      />
      {isTyping && <span className="type-cursor" />}

      <style>{`
        .message-box {
          width: 78%;
          max-width: 820px;
          text-align: center;
          margin-top: 18px;
          min-height: 72px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          will-change: opacity, transform;
        }

        .message-box.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .msg-text {
          font-family: 'Poppins', sans-serif;
          font-size: 18px;
          line-height: 1.5;
          color: #fff;
          white-space: pre-wrap;
          margin: 0;
        }

        .msg-text .hl {
          color: #ff8fb1;
          font-weight: 600;
        }

        .msg-text .glow {
          text-shadow: 0 0 12px rgba(255,120,160,0.8);
        }

        .type-cursor {
          display: inline-block;
          width: 2px;
          height: 1.05em;
          background: #ffccd1;
          margin-left: 4px;
          animation: blink 900ms steps(2) infinite;
          vertical-align: bottom;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        @media (max-width: 700px) {
          .message-box {
            width: 92%;
          }

          .msg-text {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}
