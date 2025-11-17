import { useState } from "react";
import { Select, Option } from "./components/Select/Select";
import { FruitType } from "./types";
import "./css/app.css";

export default function App() {
  const [fruit, setFruit] = useState<FruitType>(FruitType.apple);

  return (
    <div className="container">
      <div className="appValue">Value: {fruit}</div>
      <Select<FruitType> setValue={setFruit}>
        <Option selected={fruit === FruitType.apple} value={FruitType.apple}>
          Apple
        </Option>
        <Option selected={fruit === FruitType.banana} value={FruitType.banana}>
          Banana
        </Option>
        <Option selected={fruit === FruitType.orange} value={FruitType.orange}>
          Orange
        </Option>
        <Option selected={fruit === FruitType.mango} value={FruitType.mango}>
          Mango
        </Option>
      </Select>
    </div>
  );
}
