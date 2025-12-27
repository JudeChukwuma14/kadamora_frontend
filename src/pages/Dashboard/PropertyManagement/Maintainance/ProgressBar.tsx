import React from 'react';

const ProgressBar: React.FC<{ percent: number }> = ({ percent }) => (
    <div className="w-full h-2 rounded bg-[#F1F4F7] mt-4">
        <div className="h-2 rounded bg-[#F9B233]" style={{ width: `${percent}%`, transition: 'width 0.3s' }} />
    </div>
);

export default ProgressBar;
