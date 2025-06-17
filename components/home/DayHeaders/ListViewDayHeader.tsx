import {Pressable, Text, View} from "react-native";

interface ListViewDayHeaderProps {
    dayName: string;
    dayNum: number;
    selected: boolean;
    dayIndex: number;
    setDayIndex: (index: number) => void;

}

export default function ListViewDayHeader({dayName, dayNum, selected, dayIndex, setDayIndex} : ListViewDayHeaderProps) {
    return (
        <Pressable className="w-full flex-1" onPress={() => setDayIndex(dayIndex)}>
            <View className="border items-center">
                <Text className="font-bold">{dayName}</Text>
                <View
                    style={{
                        width:30,
                        height:30,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: selected ? '#007AFF' : '#EEE',
                        borderWidth: 1,
                        borderColor: '#CCC',
                    }}
                >
                    <Text style={{ fontWeight: 'bold', color: selected ? '#FFF' : '#333' }}>
                        {dayNum}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}