import { addEdge, useEdgesState, useNodesState } from "@xyflow/react";
import type { Edge, Node, NodeTypes, Connection } from "@xyflow/react";
import { RoomNode, LampNode, AccessNode } from "../components/elements-canvas";
import { useRef, useCallback } from "react";
import type { DragEvent } from "react";
import type { NodeData } from "../types";

const nodeTypes: NodeTypes = {
  room: RoomNode,
  lamp: LampNode,
  access: AccessNode,
};

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

interface Args {
  screenToFlowPosition: (position: { x: number; y: number }) => {
    x: number;
    y: number;
  };
}

const useFlowDragAndDrop = ({ screenToFlowPosition }: Args) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("text/plain");

    if (!type) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode: Node = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      position,
      data: {
        value: {
          label: `New ${type}`,
          description: `${type} description here`,
        } satisfies NodeData,
      },
    };

    setNodes((nds) => [...nds, newNode]);
  }, []);

  const handleEdgeClick = useCallback((_: unknown, edge: Edge) => {
    setEdges((eds) => eds.filter((ed) => ed.id !== edge.id));
  }, []);

  const handleRemoveNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((nd) => nd.id !== nodeId));
    setEdges((eds) =>
      eds.filter((ed) => ed.source !== nodeId && ed.target !== nodeId)
    );
  }, []);

  const values = {
    nodeTypes,
    reactFlowWrapper,
    nodes,
    edges,
  };

  const actions = {
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    handleConnect,
    handleDragOver,
    handleDrop,
    handleEdgeClick,
    handleRemoveNode,
  };

  return { values, actions };
};

export default useFlowDragAndDrop;
