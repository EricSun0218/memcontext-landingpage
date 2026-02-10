import React from 'react';

type MemoriesProps = {
  initialView?: string;
};

const Memories: React.FC<MemoriesProps> = ({ initialView }) => {
  return (
    <div className="flex-1 flex items-center justify-center text-textMuted">
      Memories Module Coming Soon{initialView ? ` (${initialView})` : ''}
    </div>
  );
};

export default Memories;