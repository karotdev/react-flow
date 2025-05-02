import type { Node } from "@xyflow/react";
import type { NodeData } from "../../types";
import { memo } from "react";
import type { ChangeEvent } from "react";

interface Props {
  isOpen: boolean;
  values: Node | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove: (nodeId: string) => void;
}

const ElementsForm = ({ isOpen, values, onChange, onRemove }: Props) => {
  const { id, type, data } = values || {};
  const { label, description } = (data?.value || {}) as NodeData;

  return (
    <aside key={id} className="px-4 py-6 shadow-lg flex bg-stone-50">
      {isOpen && (
        <div className="flex flex-col grow">
          <div className="flex flex-col gap-6 grow">
            <div>
              <p className="text-xs text-gray-500">#{id}</p>
              <p className="text-2xl font-semibold">Edit {type}</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="label" className="text-sm font-semibold">
                  Label
                </label>
                <input
                  className="bg-white border border-gray-300 rounded-lg p-2"
                  name="label"
                  type="text"
                  defaultValue={label}
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-sm font-semibold">
                  Description
                </label>
                <input
                  className="bg-white border border-gray-300 rounded-lg p-2"
                  name="description"
                  type="text"
                  defaultValue={description}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="shrink-0 flex justify-end gap-2">
            <button
              className="px-4 py-2 rounded-lg font-semibold cursor-pointer hover:bg-stone-300 transition-colors"
              onClick={() => onRemove(id || "")}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default memo(ElementsForm);
