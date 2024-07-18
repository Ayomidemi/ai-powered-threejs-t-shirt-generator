import { useSnapshot } from "valtio";
import { SketchPicker } from "react-color";

import state from "../store";

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => (state.color = color.hex)}
        // presetColors={['#fff', '#000', '#efbd48', '#f44336', '#2196f3', '#4caf50']}
      />
    </div>
  );
};

export default ColorPicker;
