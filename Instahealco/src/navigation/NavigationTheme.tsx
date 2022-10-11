import { DefaultTheme } from "@react-navigation/native";
import { Colors } from "../styles";

export default  {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.PRIMARY,
        background: Colors.WHITE
    }
}