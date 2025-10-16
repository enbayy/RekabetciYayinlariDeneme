'use client';

import DrawingOverlay from '@/components/DrawingOverlay';

export default function QuestionPanel({
  question,
  questionIndex,
  isExamStarted,
  drawState,
  drawingsMap,
  setDrawingsMap
}) {
  const { isVisible, isActive, tool, color, size } = drawState;

  return (
    <div>
      <DrawingOverlay
        enabled={isExamStarted && isVisible}
        active={isActive}
        tool={tool}
        color={color}
        size={size}
        currentQuestion={questionIndex}
        drawingsMap={drawingsMap}
        setDrawingsMap={setDrawingsMap}
      >
        <div className="w-full mb-6">
          <h2 className="text-lg font-semibold mb-4">{question.question}</h2>
          {question.image && (
            <div className="flex justify-center">
              <img
                src={question.image}
                alt="Soru Görseli"
                className="max-w-full pointer-events-none select-none"
                draggable={false}
              />
            </div>
          )}
        </div>
      </DrawingOverlay>
    </div>
  );
}


