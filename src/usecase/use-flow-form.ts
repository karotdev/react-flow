import type { Node } from "@xyflow/react";
import { useCallback, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import type { ChangeEvent } from "react";
import type { NodeData } from "../types";

const useFlowForm = () => {
  const { updateNodeData } = useReactFlow();

  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>(
    undefined
  );

  const handleNodeClick = useCallback((_: unknown, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedNodeId(undefined);
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      updateNodeData(selectedNodeId || "", (node: Node) => ({
        value: {
          ...(node.data.value as NodeData),
          [name]: value,
        },
      }));
    },
    [updateNodeData, selectedNodeId]
  );

  const values = {
    selectedNodeId,
  };

  const actions = {
    handleNodeClick,
    handlePaneClick,
    handleChange,
  };

  return { values, actions };
};

export default useFlowForm;
