import { Handle, Position } from "@xyflow/react";
import type { Node, NodeProps } from "@xyflow/react";
import type { NodeData } from "../../types";

const RoomNode = ({ selected, data }: NodeProps<Node>) => {
  return (
    <div className="relative">
      <div
        className={`bg-white p-2 border rounded-lg cursor-grab hover:bg-gray-100 transition-colors flex gap-2 justify-center ${
          selected ? "border-gray-950" : "border-gray-300"
        }`}
      >
        <span className="size-10 bg-[#31a5a5] rounded"></span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold select-none">
            {(data.value as NodeData).label}
          </span>
          <span className="text-xs text-gray-500 select-none">
            {(data.value as NodeData).description}
          </span>
        </span>
      </div>
      <Handle id="top" type="source" position={Position.Top} />
      <Handle id="right" type="source" position={Position.Right} />
      <Handle id="bottom" type="source" position={Position.Bottom} />
      <Handle id="left" type="source" position={Position.Left} />
    </div>
  );
};

const LampNode = ({ selected, data }: NodeProps<Node>) => {
  return (
    <div className="relative">
      <div
        className={`bg-white p-2 border rounded-lg cursor-grab hover:bg-gray-100 transition-colors flex gap-2 justify-center ${
          selected ? "border-gray-950" : "border-gray-300"
        }`}
      >
        <span className="size-10 bg-[#31a5a5] rounded"></span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold select-none">
            {(data.value as NodeData).label}
          </span>
          <span className="text-xs text-gray-500 select-none">
            {(data.value as NodeData).description}
          </span>
        </span>
      </div>
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

const AccessNode = ({ selected, data }: NodeProps<Node>) => {
  return (
    <div className="relative">
      <div
        className={`bg-white p-2 border rounded-lg cursor-grab hover:bg-gray-100 transition-colors flex gap-2 justify-center ${
          selected ? "border-gray-950" : "border-gray-300"
        }`}
      >
        <span className="size-10 bg-[#31a5a5] rounded"></span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold select-none">
            {(data.value as NodeData).label}
          </span>
          <span className="text-xs text-gray-500 select-none">
            {(data.value as NodeData).description}
          </span>
        </span>
      </div>
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export { RoomNode, LampNode, AccessNode };
