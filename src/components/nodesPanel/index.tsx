import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";
import { useDrag } from "react-dnd";

import "./styles.css";

interface NodesPanelProps {
  messageText: string;
  showSettingsPanel: boolean;
  setTextInputValue: React.Dispatch<React.SetStateAction<string>>;
  setSelectedNode: (value: React.SetStateAction<string>) => void;
}

const NodesPanel: React.FC<NodesPanelProps> = ({
  messageText,
  showSettingsPanel,
  setTextInputValue,
  setSelectedNode,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "message node",
    item: { id: "message node" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleBackClick = () => {
    setSelectedNode("");
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInputValue(e.currentTarget.value);
  };

  return (
    <div
      id="panel-root"
      style={{ padding: !showSettingsPanel ? "20px" : "20px 0" }}
    >
      {!showSettingsPanel ? (
        <div
          id="message-node"
          ref={drag}
          style={{ opacity: isDragging ? 0.5 : 1 }}
        >
          <BiMessageRoundedDetail
            color="#4227a5c4"
            fontSize={30}
            id="message-icon"
          />
          <div>Message</div>
        </div>
      ) : (
        <div>
          <div id="settings-panel-header-container">
            <div id="settings-panel-header">
              <IoArrowBack cursor={"pointer"} onClick={handleBackClick} />
              <div>Message</div>
            </div>
          </div>
          <div id="text-area-header">Text</div>
          <textarea
            id="text-area"
            rows={3}
            cols={37}
            defaultValue={messageText}
            onChange={handleTextInputChange}
          />
        </div>
      )}
    </div>
  );
};

export default NodesPanel;
