import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';



const Controls = ({
  isRunning,
  onStart,
  onStop,
  onReset,
}) => {
  return (
    <div className="flex space-x-4">
      {!isRunning ? (
        <button
          onClick={onStart}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Play className="w-5 h-5 mr-2" />
          Start
        </button>
      ) : (
        <button
          onClick={onStop}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Pause className="w-5 h-5 mr-2" />
          Stop
        </button>
      )}
      <button
        onClick={onReset}
        className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        Reset
      </button>
    </div>
  );
};

export default Controls;