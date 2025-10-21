import axios from "axios";
import {generateAPIUrl} from "@/utils/apiUtils";
import {authenticateAndGetUser} from "@/actions/authActions";
import {ListedTask} from "@/app/api/tasks+api";

export async function getAISortedTasksByDate(date: Date): Promise<ListedTask[]> {
    const user = authenticateAndGetUser();
    const userId = user.id;
    const dateISO = date.toISOString();

    let sortedTasks: ListedTask[] = []

    await axios.get(generateAPIUrl(`/api/tasks?userId=${userId}&date=${dateISO}`))
        .then(res => {
            sortedTasks = res.data
        })

    return sortedTasks;
}