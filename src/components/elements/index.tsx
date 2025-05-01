import type { DragEvent } from "react";
import { ELEMENTS_SOURCE, ELEMENTS_TARGET } from "../../constants";
import type { ElementType } from "../../types";

const ElementButton = ({
  label,
  onDragStart,
}: {
  label: string;
  onDragStart: (event: DragEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="p-2 border border-gray-300 rounded-lg aspect-square cursor-grab hover:bg-gray-100 transition-colors flex flex-col gap-1 items-center justify-center"
    >
      <span className="size-8 bg-[#31a5a5] rounded"></span>
      <span className="text-sm font-semibold select-none">{label}</span>
    </div>
  );
};

const ElementsSidebar = () => {
  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    type: ElementType
  ) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", type);
  };

  return (
    <aside className="px-4 py-6 shadow-lg flex flex-col gap-6 bg-stone-50">
      <div>
        <p className="text-xs text-gray-500">&nbsp;</p>
        <p className="text-2xl font-semibold">Add Elements</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">Source</p>
        <div className="grid grid-cols-3 gap-2">
          {ELEMENTS_SOURCE.map((element) => (
            <ElementButton
              key={element.id}
              label={element.label}
              onDragStart={(event) => handleDragStart(event, element.type)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">Target</p>
        <div className="grid grid-cols-3 gap-2">
          {ELEMENTS_TARGET.map((element) => (
            <ElementButton
              key={element.id}
              label={element.label}
              onDragStart={(event) => handleDragStart(event, element.type)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ElementsSidebar;
