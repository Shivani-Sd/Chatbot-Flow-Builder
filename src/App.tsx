import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Node,
  Edge,
  Connection,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from "reactflow";
import { useDrop } from "react-dnd";

import "reactflow/dist/style.css";

import NodesPanel from "./components/nodesPanel";
import TextNode from "./components/textNode";
import AppBar from "./components/appBar";
import Snackbar from "./components/snackbar";
import "./App.css";

const nodeTypes = {
  textNode: TextNode,
};

function App() {
  const [selectedNode, setSelectedNode] = useState<string>("");

  // Initial set of nodes
  const initialNodes = [
    {
      id: "1",
      position: { x: 250, y: 350 },
      data: {
        id: "1",
        label: "test message 1",
        isNodeSelected: false,
        setSelectedNode: setSelectedNode,
      },
      type: "textNode",
    },
    {
      id: "2",
      position: { x: 550, y: 200 },
      data: {
        id: "2",
        label: "test message 2",
        isNodeSelected: false,
        setSelectedNode: setSelectedNode,
      },
      type: "textNode",
    },
  ];

  // Initial set of edges
  const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [nodeIds, setNodeIds] = useState<string[]>(["1", "2"]);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [selectedNodeMessageText, setSelectedNodeMessageText] =
    useState<string>("");
  const [textInputValue, setTextInputValue] = useState<string>("");

  // useDrop hook to handle drag and drop of new message
  const [, drop] = useDrop({
    accept: "message node",
    drop: (_item, monitor) => {
      const offset = monitor.getClientOffset();

      const newNode = {
        id: `${nodes.length + 1}`,
        position: { x: offset?.x ?? 0, y: offset?.y ?? 0 },
        data: {
          id: `${nodes.length + 1}`,
          label: "textNode",
          isNodeSelected: false,
          setSelectedNode: setSelectedNode,
        },
        type: "textNode",
      };

      setNodes((prev) => [...prev, newNode]);
      setNodeIds((prev) => [...prev, `${nodes.length + 1}`]);
    },
  });

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: Edge | Connection) =>
      setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // Function to save changes to a node
  const handleSave = () => {
    // Calculate unique node IDs with edges
    const nodesFromEdges = edges.reduce((acc, edge) => {
      if (edge.source) acc.add(edge.source);
      if (edge.target) acc.add(edge.target);
      return acc;
    }, new Set());

    // Show a snackbar if the total number of node IDs and node IDs with edges are different
    if (nodeIds.length !== nodesFromEdges.size)
      setShowSnackbar(true);
    else {
      setNodes((prevNodes) =>
        prevNodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            label: node.id === selectedNode ? textInputValue : node.data.label,
          },
        }))
      );
    }
  };

  useEffect(() => {
    setSelectedNodeMessageText(
      nodes.filter((node: Node) => node.id === selectedNode)?.[0]?.data
        ?.label ?? ""
    );
  }, [nodes, selectedNode]);

  useEffect(() => {
    // Update the nodes array based on whether the node's ID matches the selected node.
    setNodes((prevNodes) =>
      prevNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isNodeSelected: node.id === selectedNode,
        },
      }))
    );
  }, [selectedNode]);

  return (
    <>
      <div id="app-container">
        <AppBar handleSave={handleSave} />
        <div id="main-panel">
          <div
            style={{
              width: "80vw",
              height: "calc(100vh - 60px)",
            }}
            ref={drop}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
            />
          </div>
          <div>
            <NodesPanel
              showSettingsPanel={!!selectedNode}
              messageText={selectedNodeMessageText}
              setSelectedNode={setSelectedNode}
              setTextInputValue={setTextInputValue}
            />
          </div>
        </div>
      </div>
      {showSnackbar && <Snackbar setShowSnackbar={setShowSnackbar} />}
    </>
  );
}

export default App;
