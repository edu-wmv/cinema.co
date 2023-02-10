import { LinearGradient } from "expo-linear-gradient";
import { width } from "../Metrics";

export function Gradient(props: {
  colors: React.ComponentProps<typeof LinearGradient>['colors'];
  height: number;
  bottom?: number;
  top?: number;
  opacity?: number;
}) {
  return <LinearGradient style={{ position: 'absolute', height: props.height, width }} {...props} />
}