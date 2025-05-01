import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ElementsSidebar from "./components/elements";
import ElementsForm from "./components/elements-form";
import useFlowDragAndDrop from "./usecase/use-flow-drag-and-drop";
import useFlowForm from "./usecase/use-flow-form";

const FlowDragAndDrop = () => {
  const { screenToFlowPosition } = useReactFlow();

  const { values, actions } = useFlowDragAndDrop({ screenToFlowPosition });
  const { nodeTypes, reactFlowWrapper, nodes, edges } = values;
  const {
    onNodesChange,
    onEdgesChange,
    handleConnect,
    handleDragOver,
    handleDrop,
    handleRemoveNode,
  } = actions;

  const { values: formValues, actions: formActions } = useFlowForm();
  const { selectedNodeId } = formValues;
  const { handleNodeClick, handlePaneClick } = formActions;

  return (
    <div className="grid grid-cols-[280px_1fr_360px]">
      <ElementsSidebar />
      <main className="h-screen" ref={reactFlowWrapper}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={handleConnect}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </main>
      <ElementsForm
        isOpen={nodes.some((node) => node.id === selectedNodeId)}
        values={nodes.find((node) => node.id === selectedNodeId)}
        onRemove={handleRemoveNode}
      />
    </div>
  );
};

const App = () => {
  return (
    <ReactFlowProvider>
      <FlowDragAndDrop />
    </ReactFlowProvider>
  );
};

export default App;
