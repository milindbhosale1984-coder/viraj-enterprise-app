import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: number;
  readOnly?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRate,
  size = 28,
  readOnly = false,
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  return (
    <div className="flex items-center gap-1.5" style={{ display: 'flex', gap: '6px' }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || rating);
        return (
          <FaStar
            key={star}
            size={size}
            color={isFilled ? '#FFD700' : '#444'}
            style={{
              cursor: readOnly ? 'default' : 'pointer',
              transition: 'transform 0.15s ease, color 0.15s ease',
              transform: !readOnly && star <= hoverRating ? 'scale(1.15)' : 'scale(1)',
            }}
            onClick={() => {
              if (!readOnly && onRate) {
                onRate(star);
              }
            }}
            onMouseEnter={() => {
              if (!readOnly) {
                setHoverRating(star);
              }
            }}
            onMouseLeave={() => {
              if (!readOnly) {
                setHoverRating(0);
              }
            }}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
