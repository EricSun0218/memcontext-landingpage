
import React from 'react';

const Docs: React.FC = () => {
  const docsUrl = '/mintlify/index.html';

  return (
    <div className="flex-1 w-full bg-background-dark">
      <iframe
        title="Mintlify Docs"
        src={docsUrl}
        className="w-full h-[calc(100vh-4rem)] border-0 bg-transparent"
      />
    </div>
  );
};

export default Docs;
