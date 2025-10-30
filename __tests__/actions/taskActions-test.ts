// typescript
jest.mock('@/actions/authActions', () => ({
    authenticateAndGetUser: jest.fn().mockReturnValue({ id: 'mockUserId' }),
}));

import {getListedTasksByDateAction} from "@/actions/taskActions";

describe('getListedTasksByDateAction', () => {
    it('should fetch listed tasks for a specific date', async () => {
        // const mockTasks: ListedTask[] = [
        //     { start: new Date('2025-10-23T00:00:00Z'), end: new Date('2025-10-23T00:00:00Z') } as ListedTask,
        //     { start: new Date('2025-10-23T08:00:00Z'), end: new Date('2025-10-23T09:30:00Z') } as ListedTask,
        //     { start: new Date('2025-10-22T12:00:00Z'), end: new Date('2025-10-22T13:00:00Z') } as ListedTask,
        //     { start: new Date('2025-10-24T15:00:00Z'), end: new Date('2025-10-24T16:00:00Z') } as ListedTask,
        // ];
        //
        // const date = new Date('2025-10-23T00:00:00Z');
        // const startOfDayDate = startOfDay(date);
        // const endOfDayDate = endOfDay(date);
        //
        // // keep only tasks that meet the condition (start within the target day)
        // const filteredSameDayMockTasks = mockTasks.filter(task =>
        //     task.start.getTime() >= startOfDayDate.getTime() &&
        //     task.start.getTime() <= endOfDayDate.getTime()
        // );
        //
        // const mockSameDayTaskStartTimes = filteredSameDayMockTasks.map(task => task.start.getTime());
        // const mockSameDayTaskEndTimes = filteredSameDayMockTasks.map(task => task.end.getTime());
        //
        // const fetchedTasks: ListedTask[] = await getListedTasksByDateAction(date);
        // const fetchedTaskStartTimes = fetchedTasks.map(task => task.start.getTime());
        // const fetchedTaskEndTimes = fetchedTasks.map(task => task.end.getTime());
        //
        // expect(fetchedTaskStartTimes).toEqual(mockSameDayTaskStartTimes);
        // expect(fetchedTaskEndTimes).toEqual(mockSameDayTaskEndTimes);
    });
});
