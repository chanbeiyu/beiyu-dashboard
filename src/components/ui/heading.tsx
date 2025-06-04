import React from 'react';

interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <p className='text-2xl font-bold tracking-tight'>{title}</p>
      <p className='text-muted-foreground text-sm'>{description}</p>
    </div>
  );
};
