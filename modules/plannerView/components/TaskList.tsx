import {Text, View} from "react-native";
import Draggable from "react-native-draggable";

interface Task {
  id: string;
  title: string;
}

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <View className="w-20 bg-blue-100 p-2 space-y-2">
      {tasks.map((task, index) => (
        <Draggable
          key={task.id}
          x={5}
          y={index * 80 + 10}
          minX={0}
          minY={0}
          maxX={300}
          maxY={600}
        >
          <View className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-full px-4 py-3 min-w-[120px] shadow-md">
            <Text className="text-white text-sm font-medium text-center">{task.title}</Text>
          </View>
        </Draggable>
      ))}
    </View>
  );
}
