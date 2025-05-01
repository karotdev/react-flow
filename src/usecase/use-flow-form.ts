import type { Node } from "@xyflow/react";
import { useCallback, useState } from "react";

const useFlowForm = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>(
    undefined
  );

  const handleNodeClick = useCallback((_: unknown, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedNodeId(undefined);
  }, []);

  const values = {
    selectedNodeId,
  };

  const actions = {
    handleNodeClick,
    handlePaneClick,
  };

  return { values, actions };
};

export default useFlowForm;
