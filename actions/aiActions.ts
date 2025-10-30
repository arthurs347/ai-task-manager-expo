import axios from "axios";
import {generateAPIUrl} from "@/utils/apiUtils";
import {authenticateAndGetUser} from "@/actions/authActions";
import {ListedTask} from "@/app/api/tasks+api";
import {sortTasksByStartDateTime} from "@/utils/taskUtils";

export async function getRestructuredDailyTasksByIds(taskIds: string[]): Promise<ListedTask[]> {
    const user = authenticateAndGetUser();
    const userId = user.id;
    let sortedTasks: ListedTask[] = [];
    await axios.get(generateAPIUrl(`/api/openai?taskIds=${taskIds}&userId=${userId}`))
        .then(res => {
            console.log("Tasks restructured by AI:", res.data);
            const openAiResponse = res.data as ListedTask[];
            sortedTasks = sortTasksByStartDateTime(openAiResponse);
        })
        .catch(err => console.log(err));

    return sortedTasks;
}