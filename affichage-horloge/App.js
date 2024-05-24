import HomeScreen from "./src/screens/HomeScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import { useFonts } from "expo-font";
let customFonts = {
    RubikMonoOne: require("./assets/fonts/RubikMonoOne-Regular.ttf"),
};

export default function App() {
    const [isLoaded] = useFonts(customFonts);
    if (!isLoaded) {
        return <LoadingScreen />;
    }
    return <HomeScreen />;
}
