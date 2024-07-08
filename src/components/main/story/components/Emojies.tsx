import React from "react";

interface EmojiesProps {
  story: {
    reactions?: {
      like?: {
        users?: any[];
      };
      love?: {
        users?: any[];
      };
    };
  };
}

const Emojies: React.FC<EmojiesProps> = ({ story }) => {
  return (
    <div>
      {(() => {
        const likeCount = story?.reactions?.like?.users?.length || 0;
        const loveCount = story?.reactions?.love?.users?.length || 0;

        const likeEmojis = [];
        for (let i = 0; i < likeCount; i++) {
          likeEmojis.push(<span key={`like-${i}`}>👍</span>);
        }

        const loveEmojis = [];
        for (let i = 0; i < loveCount; i++) {
          loveEmojis.push(<span key={`love-${i}`}>❤️</span>);
        }

        return (
          <>
            {likeEmojis}
            {loveEmojis}
          </>
        );
      })()}
    </div>
  );
};

export default Emojies;
