import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { Handle, NodeProps, Position } from "reactflow";

import "./styles.css";

export type MessageData = {
  id: string;
  label: string;
  isNodeSelected: boolean;
  setSelectedNode: (value: React.SetStateAction<string>) => void;
};

const TextNode: React.FC<NodeProps<MessageData>> = ({ data }) => {
  const { id, label, isNodeSelected, setSelectedNode } = data;

  const handleNodeClick = () => {
    setSelectedNode(id);
  };

  return (
    <>
      <Handle type="target" position={Position.Left} isConnectable id="a" />
      <Handle type="source" position={Position.Right} isConnectable id="b" />
      <div
        id="text-node"
        style={{
          border: isNodeSelected ? "2px solid #5954e9" : "none",
        }}
        onClick={handleNodeClick}
      >
        <div id="text-node-header">
          <div id="text-node-sub-header">
            <BiMessageRoundedDetail fontSize={15} />
            <div>Send Message</div>
          </div>
          <div id="whatsapp-icon">
            <IoLogoWhatsapp color="green" />
          </div>
        </div>
        <div id="text-message">{label}</div>
      </div>
    </>
  );
};

export default TextNode;
